# What is tested and what still needs evidence

## Reproducible offline checks

| Contract | Failure detected |
| --- | --- |
| Source-tagged policy output | Unsupported policy invention or lost grounding |
| Unknown topic / invalid bounded input | Silent mutation or unconstrained unsupported topic |
| Active turn and call identity | A stale result answering a newer question |
| Deduplicated tool delivery | Repeated result applied twice |
| Simulated tool failure | False success or an uncleared pending request |
| Prior-state preservation | An invalid event corrupting the current session |
| Optional SDK tool registration and invocation | Tool binding/output incompatibility before any provider use |
| Optional real SDK pipeline construction | Constructor/API incompatibility; HTTP prewarming disabled only in this offline test |
| Missing launcher configuration and deadline | Provider construction without local credentials or an unbounded job |
| Startup failure and timer cleanup | A greeting after failed startup or an orphaned deadline task |

These assertions are selected application contracts. The authored conversations are not an LLM evaluation dataset, prompt-injection benchmark or empirical task-success experiment.

## Controlled voice acceptance

One consented manual Builder test on October 12 lasted 1 minute 48 seconds. The owner confirmed the spoken interaction worked; the following replies were independently checked in the visible console. The deployed pipeline was Python SDK 1.6.10, Deepgram Nova-3, Gemma 4 31B through LiveKit Inference and Cartesia Sonic 3. Optional observability and recording were off. No caller audio is included.

| Fictional question | Observed reply and result |
| --- | --- |
| Can I return an unused Maple Desk accessory? | Unused accessories can be returned within 14 days; passed |
| How do I set up Lamp One? | Connect the included cable, then hold the power button for two seconds; passed |
| Can you issue me a refund now? | Cannot issue refunds or access accounts; human review needed; no request sent; passed |

This is a three-scenario manual sample, not a general task-success rate or a tool-integration test. The Builder embeds its policies in the prompt. Prompt injection, acoustic interruption, poor audio, timeout and reconnection remain untested against this provider. The console displayed aggregate latency/usage, but that session also included an off-script utterance; no representative latency or cost benchmark is claimed. Earlier connectivity/classroom attempts and a hidden-observer typed-message attempt did not establish audible policy acceptance. The code-owned launcher's live integration still needs its own test.

Use an owner-controlled project and consented fictional utterances for further acceptance. Existing free quota can support a test without a paid upgrade. The opt-in widget page has three automated tests for affirmative consent, duplicate starts, consent withdrawal, deadline and explicit cleanup. These do not prove that the managed provider releases a room or stops microphone tracks; hosted widget acceptance is still required. Its two-minute timer is a browser limit, not a server usage/concurrency limit. Local replay timing remains UI timing, not voice latency.

## Product judgment

A useful support experience must answer within a limited approved scope, preserve context when the user changes direction, and make uncertainty actionable. The tradeoff is deliberate: a narrow policy tool is easier to inspect than a system allowed to mutate orders or infer unrestricted business policies. AI can phrase an answer in a later integration; it cannot enlarge the tool's authority.
