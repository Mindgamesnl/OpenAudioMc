# medialib

An internal media engine that offers:

- Deterministic stop/destroy via epoch-guarded events.
- Minimal readiness for faster starts; respects date-sync pickup.
- Channel volume × master volume handling and fades.

Main classes:

- MediaEngine: manages channels and bulk destruction.
- MediaChannel: manages tracks within a channel and volume/fades.
- MediaTrack: wraps an HTMLAudioElement with robust lifecycle.

The legacy `Sound` class now delegates playback to `MediaTrack` while preserving public APIs, so existing code continues to work.
