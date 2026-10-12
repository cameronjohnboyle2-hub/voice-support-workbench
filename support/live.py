"""Optional controlled voice launcher; importing this module starts no session.

This code-owned policy agent is separate from the prompt-only Builder prototype.
Run only in an owner-controlled project, with consent from the microphone user.
"""
import asyncio
import contextlib
import os

from livekit.agents import AgentServer, AgentSession, JobContext, TurnHandlingOptions, cli, inference

from .agent import MapleDeskAgent

AGENT_NAME = "maple-desk-policy-demo"
SESSION_SECONDS = 120
WELCOME = (
    "Introduce yourself as Maple Desk's AI support demo. Explain that all policies "
    "and products are fictional. Offer returns or Lamp One setup help. Ask the "
    "caller to avoid personal information. Do not give a policy answer before "
    "using the approved_policy tool."
)


def build_session() -> AgentSession:
    """Construct the pipeline; the SDK may prewarm connections, but starts no room."""
    if not all(os.environ.get(key) for key in ("LIVEKIT_URL", "LIVEKIT_API_KEY", "LIVEKIT_API_SECRET")):
        raise RuntimeError("Set the three LiveKit environment variables locally; never commit their values.")
    return AgentSession(
        stt=inference.STT(model="deepgram/nova-3", language="en"),
        stt_context_options={"keyterms": ["Maple Desk", "Lamp One"]},
        llm=inference.LLM(model="google/gemma-4-31b-it"),
        tts=inference.TTS(
            model="cartesia/sonic-3",
            voice="9626c31c-bec5-4cca-baa8-f8ba9e84c8bc",
            language="en",
        ),
        turn_handling=TurnHandlingOptions(turn_detection=inference.TurnDetector()),
        vad=inference.VAD(),
    )


async def stop_after_deadline(ctx: JobContext, seconds: float = SESSION_SECONDS) -> None:
    await asyncio.sleep(seconds)
    ctx.shutdown(reason="fictional demo time limit")


async def run_session(ctx: JobContext) -> None:
    session = build_session()
    deadline = asyncio.create_task(stop_after_deadline(ctx))

    async def cancel_deadline() -> None:
        deadline.cancel()
        with contextlib.suppress(asyncio.CancelledError):
            await deadline

    ctx.add_shutdown_callback(cancel_deadline)

    @session.on("error")
    def stop_on_provider_error(_event) -> None:
        # End this small demo rather than inventing an answer or exposing error payloads.
        ctx.shutdown(reason="fictional demo provider error")

    try:
        await session.start(agent=MapleDeskAgent(), room=ctx.room)
        await session.generate_reply(instructions=WELCOME, allow_interruptions=True)
    except BaseException:
        await cancel_deadline()
        raise


def main() -> None:
    server = AgentServer()
    server.rtc_session(agent_name=AGENT_NAME)(run_session)
    cli.run_app(server)


if __name__ == "__main__":
    main()
