# Verification checkpoint

## October 12 update

Six offline SDK/tool/launcher checks pass, including real SDK pipeline construction
with HTTP prewarming suppressed, missing-configuration rejection, deadline shutdown
and failed-start timer cleanup. Combined with the unchanged five policy and nine
replay checks, the package now contains twenty checks. The earlier clean CI below
covered sixteen. The twenty checks passed in [clean CI for this update](https://github.com/cameronjohnboyle2-hub/voice-support-workbench/actions/runs/38301072152)
at implementation commit `8e7f4de99e1ffe17097c0f18e7cd2d757b5ce907`.

An isolated US LiveKit Builder prototype reports Running. After an inconclusive
classroom attempt, a quiet consented test lasted 1 minute 48 seconds and produced
the three expected return-window, Lamp One setup and refund-refusal replies. The
owner confirmed the spoken interaction worked. Optional observability and
recording were off. The console is idle and the microphone is muted; no caller
audio is included. The observed pipeline was Deepgram Nova-3, Gemma 4 31B,
Cartesia Sonic 3 and Python SDK 1.6.10. This is a three-scenario manual sample;
acoustic interruption, injection resistance, recovery and representative latency
remain unvalidated. The pinned SDK 1.8.6 code-owned launcher has not been used in
a live room. See [voice setup](VOICE_SETUP.md) and [evaluation](EVALUATION.md).

The opt-in widget page adds three consent and cleanup checks to the twenty
existing automated checks. Its two-minute timer unloads the browser panel; it is
not a server usage or concurrency limit. The managed widget remains disabled
until the owner approves public access and its allowed origin. No public voice
operation is claimed at this preparation checkpoint.

## Historical October 10/11 checkpoint

October 10 Denver / October 11 UTC, 2026. Five Python policy tests and nine JavaScript turn/identity/recovery tests pass. Browser replay checks cover all three scenarios, restart and a 390-by-844 phone viewport with no horizontal overflow. A connection-blocking content policy is present. Screenshot content is wholly fictional.

The optional SDK environment contains LiveKit Agents 1.8.6 and 68 other installed package versions pinned in requirements-sdk-lock.txt. An OSV exact-version query returned no listed advisories across those 69 packages at this checkpoint. This is a bounded database lookup, not an exhaustive package-security audit. No third-party packages are bundled into the static runtime.

Two agent construction and registered-tool checks pass without starting a provider session. Live model, transcription, speech output, room tokens, acoustic interruptions, end-to-end latency, costs and retention are unvalidated. A transcript fixture is not a recorded voice conversation.

The reviewed implementation at ade13999d3c89cd6d90b547be1d7674e46e3b9ce passed [clean remote CI](https://github.com/cameronjohnboyle2-hub/voice-support-workbench/actions/runs/38116572970), including all sixteen policy/turn/SDK checks. [Pages publication](https://github.com/cameronjohnboyle2-hub/voice-support-workbench/actions/runs/38116818061) passed and uploaded only the four-file runtime. All four hosted files matched reviewed bytes over anonymous HTTPS. The actual hosted replay rendered and completed its grounded-answer scenario without captured warnings/errors. Full local scenario and phone checks are described above; they are separate from the hosted check.

Fresh publication history at that implementation checkpoint contains two commits and 22 reachable blobs: 20 text versions scanned against eight checked credential/private-endpoint categories with no matches, plus two separately reviewed fictional screenshots. All 21 source files matched the reviewed manifest. These are bounded checks, not a general security clearance. This later documentation update changes no runtime or SDK code.
