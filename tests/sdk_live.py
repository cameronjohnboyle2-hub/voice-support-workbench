"""Offline checks of the actual SDK launcher; no model requests or microphone."""
import asyncio
import os
import unittest
from unittest.mock import patch

from livekit.agents import AgentSession

from support.live import build_session, run_session, stop_after_deadline


class LauncherChecks(unittest.IsolatedAsyncioTestCase):
    async def test_pinned_sdk_can_construct_and_close_the_real_pipeline_offline(self):
        # Disposable configuration. Prevent the SDK's automatic HTTP prewarming;
        # all provider/session constructors and close methods remain real.
        with patch.dict(os.environ, {
            "LIVEKIT_URL": "wss://disposable.invalid",
            "LIVEKIT_API_KEY": "disposable-fixture",
            "LIVEKIT_API_SECRET": "disposable-fixture-" + "x" * 32,
        }), patch("support.live.inference.LLM.prewarm"):
            session = build_session()
        self.assertIsInstance(session, AgentSession)
        await asyncio.gather(session.stt.aclose(), session.llm.aclose(), session.tts.aclose())

    async def test_missing_configuration_stops_before_provider_construction(self):
        with patch.dict(os.environ, {}, clear=True), patch("support.live.AgentSession") as constructor:
            with self.assertRaises(RuntimeError):
                build_session()
            constructor.assert_not_called()

    async def test_deadline_shuts_down_the_job(self):
        class Context:
            reason = None

            def shutdown(self, reason):
                self.reason = reason

        ctx = Context()
        await stop_after_deadline(ctx, seconds=0)
        self.assertEqual(ctx.reason, "fictional demo time limit")

    async def test_failed_start_cancels_the_deadline_without_a_greeting(self):
        class FailedSession:
            greeting_started = False

            def on(self, _name):
                return lambda callback: callback

            async def start(self, **_kwargs):
                raise RuntimeError("disposable startup failure")

            async def generate_reply(self, **_kwargs):
                self.greeting_started = True

        class Context:
            room = object()

            def add_shutdown_callback(self, callback):
                self.callback = callback

        ctx = Context()
        session = FailedSession()
        with patch("support.live.build_session", return_value=session):
            with self.assertRaisesRegex(RuntimeError, "disposable startup failure"):
                await run_session(ctx)
        await ctx.callback()  # safe to call again when the job shuts down
        self.assertFalse(session.greeting_started)
