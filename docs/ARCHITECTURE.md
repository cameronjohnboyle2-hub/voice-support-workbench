# Support architecture and boundaries

The public replay is four static files. The reducer takes an event and a previous state, validates turn/call identities, and returns a new state. The view renders only the resulting authored transcript. A page content policy blocks outbound connections; no provider credential path exists.

The Python policy function is the code-owned boundary: accepted topics yield a source-tagged fictional policy; unknown topics yield human review. The optional SDK agent registers that function as a read-only tool. It starts no AgentSession, model, transport, microphone or persistence service.

For a later live implementation, a room's audio would enter LiveKit's session orchestration, reach speech recognition/model generation or a realtime speech model, invoke this policy tool, and return a spoken answer. These provider components are an integration design, not components exercised by the replay. LiveKit's [session reference](https://docs.livekit.io/agents/logic/sessions/) describes that orchestration.

The SDK exposes transcript, tool-execution and error events. An owner-run implementation must treat recoverable and terminal provider failures separately and decide whether to retry or end the session. See the [official events reference](https://docs.livekit.io/reference/agents/events/). The replay instead supplies its own simulated service-error event; it does not prove SDK error recovery.

Interruption in the replay advances the active turn and clears its pending call. A late result is discarded before display. Actual acoustic interruption and provider cancellation require their own tests; the reducer is not a replacement for LiveKit's speech pipeline.

No external action is available. Handoff means a visible instruction to seek review, not a message or a dispatched ticket. No raw transcript, audio or identity is stored outside browser memory.

The adapter follows the SDK's [function-tool registration contract](https://docs.livekit.io/agents/logic/tools/definition/). Its agent construction/tool checks use the pinned SDK without provider sessions. Research controller settings, study protocol, original history and production endpoints are absent.
