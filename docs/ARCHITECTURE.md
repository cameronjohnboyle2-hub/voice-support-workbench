# Support architecture and boundaries

The transcript replay is four static files. The reducer takes an event and a previous state, validates turn/call identities, and returns a new state. The view renders only the resulting authored transcript. Its page content policy blocks outbound connections; no provider credential path exists.

The separate opt-in voice page loads a same-origin embedded panel only after
affirmative consent. That panel uses LiveKit's managed widget, a public agent
identifier and an integrity-pinned vendor script. The dashboard must allow only
the exact portfolio origin. The widget routes to the prompt-grounded Builder
agent, with no business actions or external policy database. Camera and screen
sharing remain unavailable. Removing the panel on withdrawal, End demo, page
exit or a two-minute timer closes the browser integration; provider room cleanup
must be verified separately. This timer is not a server admission, concurrency
or usage limit. The origin allowlist is not authentication against non-browser
clients. No general-purpose sandbox token server or signing key is published.

The Python policy function is the code-owned boundary: accepted topics yield a source-tagged fictional policy; unknown topics yield human review. The optional SDK agent registers that function as a read-only tool. It starts no AgentSession, model, transport, microphone or persistence service.

The optional `support/live.py` launcher connects a room to Deepgram Nova-3 recognition, Gemma 4 31B generation and Cartesia Sonic 3 synthesis through LiveKit Inference. It uses `MapleDeskAgent` and the code-owned policy tool, ends a job after two minutes and ends on a provider error. Pinned-SDK construction and application lifecycle checks pass offline; its live tool/pipeline behavior is not yet verified. LiveKit's [session reference](https://docs.livekit.io/agents/logic/sessions/) describes that orchestration.

Separately, an isolated LiveKit Builder prototype embeds the same fictional policies in its prompt. Its deployment and consented console connection exercised recognition, model output and synthesis, but not the policy tool. No policy-task success, audible quality, acoustic interruption or recovery result is inferred from that connection. The [setup note](VOICE_SETUP.md) distinguishes both implementations and their versions.

The SDK exposes transcript, tool-execution and error events. An owner-run implementation must treat recoverable and terminal provider failures separately and decide whether to retry or end the session. See the [official events reference](https://docs.livekit.io/reference/agents/events/). The replay instead supplies its own simulated service-error event; it does not prove SDK error recovery.

Interruption in the replay advances the active turn and clears its pending call. A late result is discarded before display. Actual acoustic interruption and provider cancellation require their own tests; the reducer is not a replacement for LiveKit's speech pipeline.

No external business action is available. Handoff means an instruction to seek review, not a message or a dispatched ticket. The static replay stores no raw transcript, audio or identity outside browser memory. A voice session sends audio/text to its providers; disabled optional LiveKit observability and recording do not establish every provider's retention policy. No caller audio is published here.

The adapter follows the SDK's [function-tool registration contract](https://docs.livekit.io/agents/logic/tools/definition/). Its agent construction/tool checks use the pinned SDK without provider sessions. Research controller settings, study protocol, original history and production endpoints are absent.
