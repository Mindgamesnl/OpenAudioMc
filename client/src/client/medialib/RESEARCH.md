# Media engine reliability analysis and redesign

This document captures findings about the persistent "stop/destroy doesn't actually stop" issue and the rationale behind the new media engine in `medialib/`.

## Observed behavior

- A stop/destroy command occasionally fails to stop media; the audio keeps playing or briefly resumes after being stopped.
- Making playback wait for “fully loaded” increased latency but did not eliminate the issue.

## Root cause analysis

The legacy flow centered around `Sound.finalize()` wiring event-driven start logic (`oncanplay`, `oncanplaythrough`, `onprogress`) that immediately attempted `audio.play()`, while stop flowed through `MediaManager.destroySounds()` and `Channel.fadeChannel()` before `Mixer.removeChannel()` cleaned up. This produced several race windows:

- Event reordering: `canplay`/`canplaythrough` handlers could fire right after a stop request but before `gotShutDown` was visible to those closures, triggering `audio.play()`.
- Late listeners: While `destroy()` nulls property handlers (`oncanplay*`), preloader-installed listeners (via `addEventListener`) remained. They don't call `play()` but continued mutating state, confusing readiness.
- Fade-before-destroy: On stop with a fade, the actual `removeChannel()` was delayed, leaving time for event handlers to start playback. In some ordering, `onplay`-based immediate pause either didn’t fire or fired too late leading to audible blips and inconsistent state.
- Multi-epoch confusion: The same `HTMLAudioElement` instance could receive events from a prior lifecycle after a new one started (e.g., replace channel), because the prior handlers weren't fully guarded against stale events.

Requiring full buffering increased the time the element spends in the volatile pre-start state, increasing exposure to the races without addressing their cause.

## Design goals for the new engine

- Make stop/destroy idempotent and immediate. No event can start playback after stop was requested.
- Eliminate reliance on implicit event orderings. All event handlers are gated by an epoch token.
- Abort fades, loads, and play promises deterministically on stop.
- Keep client sync features (start date/instant, startAt offset, looping, playback speed).
- Preserve volume semantics (master volume × channel volume) and inhibitors.

## Key architecture decisions

- Per-track epoch token: Every async listener and timer captures the `epoch` value. On `stop()` the epoch increments; any event from a prior epoch is ignored.
- AbortController-like cancellation for timers and fades. All timers are tracked and canceled on stop/destroy.
- Minimal readiness: only wait for the minimum readyState needed for the scenario (metadata for synced pickup; future data for immediate start). No full-buffer requirement.
- Explicit state machine on Track: `idle → loading → ready → playing/paused → stopped → destroyed`.
- No autoplay in watchers: preloader listeners never trigger playback, and play can only be initiated by the track once the current epoch is valid.

## Edge cases handled

- Stop while loading: listeners are attached with epoch guards and removed on stop; we also pause and clear `src` to cancel network.
- Stop during fade: cancels fade timers and sets final volume atomically.
- Synced media that overflows length without looping: stops immediately.
- Playback speed: uses `playbackRate = pct/100` and maintains date-sync math accordingly.

## Migration approach

- Introduce `medialib/` with `MediaEngine`, `MediaChannel`, `MediaTrack`.
- Wrap existing `MediaManager` to use the new engine and expose compatibility where feasible.
- Update socket handlers and speaker player to instantiate media through the new engine (removing direct `Sound`/`Channel` usage).

## Verification strategy

- Manual testing checklist:
  - Rapid create-stop-create for the same id with short delays; verify zero audible continue.
  - Stop with fade during `canplay`; verify no resume.
  - Start date pickup across clients: compare perceived sync and drift.
  - Looping media stop: verify loop won’t restart after stop.
  - Distance-based volume updates and inhibitors interactions.

Future work: Expand debug panel to surface track epochs and states; add integration tests simulating event sequences.
