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

## Later controlled voice acceptance

Actual speech acceptance would need consented fictional utterances covering policy answers, unsupported requests, interruption, poor audio, timeout and reconnection. Record model/pipeline versions, answer grounding, correction/escalation behavior, end-of-utterance to first-audio latency, session length and observed provider usage. Separate retries and failed sessions from successful responses. No such measurements are claimed here.

A separate consented Builder console test connected on October 12 with recognition, model output and synthesis. Optional observability and recording were off. The idle session was ended after roughly three minutes. These results establish connectivity; they do not establish policy-task success or representative latency. The [controlled script](VOICE_SETUP.md) remains pending, and the code-owned launcher's live integration needs its own test.

Use an owner-controlled project and consented fictional utterances for acceptance. Free quota can support that test without a paid upgrade. A public widget/token service would require its own admission, duration, concurrency and privacy review; this package supplies none. Local replay timing remains UI timing, not voice latency.

## Product judgment

A useful support experience must answer within a limited approved scope, preserve context when the user changes direction, and make uncertainty actionable. The tradeoff is deliberate: a narrow policy tool is easier to inspect than a system allowed to mutate orders or infer unrestricted business policies. AI can phrase an answer in a later integration; it cannot enlarge the tool's authority.
