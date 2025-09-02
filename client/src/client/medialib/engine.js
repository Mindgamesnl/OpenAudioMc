// A minimal, robust media engine with epoch-guarded lifecycle and deterministic stop.

import { TimeService } from '../services/time/TimeService';
import { getGlobalState } from '../../state/store';

// Utility: track and cancel timers
class TimerBag {
  constructor() {
    this.timers = new Set();
  }

  setInterval(fn, ms) {
    const id = setInterval(fn, ms);
    this.timers.add(id);
    return id;
  }

  setTimeout(fn, ms) {
    const id = setTimeout(() => {
      this.timers.delete(id);
      fn();
    }, ms);
    this.timers.add(id);
    return id;
  }

  clearAll() {
    for (const id of this.timers) clearInterval(id), clearTimeout(id);
    this.timers.clear();
  }
}

export class MediaTrack {
  constructor({
    id, source, loop = false, startAtMillis = 0, startInstant = null, speedPct = 100, muted = false, audio: providedAudio = null,
  }) {
    this.id = id;
    this.source = source;
    this.loop = loop;
    this.startAtMillis = startAtMillis || 0;
    this.startInstant = startInstant || null; // ISO date or millis
    this.speedPct = speedPct || 100;
    this.muted = !!muted;

    this.audio = providedAudio || new Audio();
    this.audio.preload = 'auto';
    this.audio.autoplay = false;
    this.audio.controls = false;
    // only set crossOrigin when not already set; some browsers throw on change
    if (!this.audio.crossOrigin) this.audio.crossOrigin = 'anonymous';
    this.audio.muted = this.muted;
    if (source && (!this.audio.src || this.audio.src !== source)) {
      this.audio.src = source;
    }

    this.epoch = 0; // increment to cancel stale events
    this.state = 'idle'; // idle|loading|ready|playing|paused|stopped|destroyed
    this.volume = 1.0; // 0..1 effective volume
    this.timerBag = new TimerBag();
    this.onFinish = new Set();
  }

  setVolume(vol01) {
    this.volume = Math.max(0, Math.min(1, Number.isFinite(vol01) ? vol01 : 0));
    this.audio.volume = this.volume;
  }

  setMuted(m) {
    this.muted = !!m;
    this.audio.muted = this.muted;
  }

  setPlaybackSpeed(pct) {
    const v = Math.max(0.1, (pct || 100) / 100);
    this.speedPct = pct;
    this.audio.playbackRate = v;
  }

  onEnded(cb) { this.onFinish.add(cb); return () => this.onFinish.delete(cb); }

  async load() {
    if (this.state !== 'idle') return;
    this.state = 'loading';
    const myEpoch = this.epoch;

    const endGuard = (fn) => (...args) => { if (this.epoch !== myEpoch) return; fn(...args); };

    this.audio.addEventListener('error', endGuard(() => {
      // stay in loading/ready but won't auto play; consumer may stop it
    }));

    // Notify end; higher layers (e.g., Sound) decide on looping behavior
    this.audio.addEventListener('ended', endGuard(() => {
      for (const cb of this.onFinish) { try { cb(); } catch {} }
    }));

    // Minimal readiness: metadata is adequate for start-date pickup
    const canProceed = () => this.audio && this.audio.readyState >= 2; // HAVE_METADATA
    if (canProceed()) {
      this.state = 'ready';
      return;
    }
    await new Promise((resolve) => {
      const onCanPlay = endGuard(() => { cleanup(); this.state = 'ready'; resolve(); });
      const cleanup = () => {
        this.audio.removeEventListener('canplay', onCanPlay);
        this.audio.removeEventListener('loadedmetadata', onCanPlay);
      };
      this.audio.addEventListener('canplay', onCanPlay);
      this.audio.addEventListener('loadedmetadata', onCanPlay);
    });
  }

  seek(seconds) {
    try {
      const d = this.audio.duration;
      if (Number.isFinite(d) && d > 0) seconds = Math.max(0, Math.min(seconds, d));
      this.audio.currentTime = seconds;
    } catch {}
  }

  applyStartDateIfAny() {
    if (!this.startInstant) return;
    const start = new Date(this.startInstant);
    const predictedNow = TimeService.getPredictedTime();
    const msDiff = Math.max(predictedNow.getTime() - start.getTime(), 1);
    let seconds = msDiff / 1000;
    if (this.startAtMillis) seconds += this.startAtMillis / 1000;
    const len = this.audio.duration;
    if (Number.isFinite(len) && len > 0) {
      const loops = Math.floor(seconds / len);
      const remaining = seconds % len;
      if (!this.loop && loops > 0) {
        // would be past the end; stop immediately
        this.stop();
        return;
      }
      this.seek(remaining);
    }
  }

  async play() {
    if (this.state === 'destroyed' || this.state === 'stopped') return;
    if (this.state === 'idle') await this.load();
    const myEpoch = ++this.epoch; // new play intent cancels prior listeners
    this.state = 'playing';

    this.applyStartDateIfAny();
    const prom = this.audio.play();
    if (prom && typeof prom.then === 'function') {
      try { await prom; } catch { /* autoplay rejection or paused: ignore */ }
    }
    // If epoch changed mid-await, pause to ensure no stale play continues
    if (this.epoch !== myEpoch) {
      try { this.audio.pause(); } catch {}
    }
  }

  pause() {
    if (this.state !== 'playing') return;
    this.state = 'paused';
    try { this.audio.pause(); } catch {}
  }

  stop() {
    if (this.state === 'stopped' || this.state === 'destroyed') return;
    this.epoch++;
    this.state = 'stopped';
    this.timerBag.clearAll();
    try { this.audio.pause(); } catch {}
    // aggressively cancel network to prevent canplay race
    try { this.audio.removeAttribute('src'); this.audio.load(); } catch {}
  }

  destroy() {
    if (this.state === 'destroyed') return;
    this.stop();
    this.state = 'destroyed';
    // Remove listeners by replacing element
    try { this.audio.src = ''; } catch {}
    try { this.audio.remove(); } catch {}
  }
}

export class MediaChannel {
  constructor({ id, originalVolumePct = 100 }) {
    this.id = id;
    this.originalVolumePct = originalVolumePct;
    this.tagSet = new Set();
    this.tracks = new Map();
    this.mutedByScore = false;
    this.fadeTimers = new Set();
  }

  setTag(tag) { if (tag) this.tagSet.add(tag); }

  hasTag(tag) { return this.tagSet.has(tag); }

  addTrack(track) {
    this.tracks.set(track.id, track);
    this.updateVolumeFromMaster();
  }

  removeTrack(id) {
    const t = this.tracks.get(id);
    if (t) { t.destroy(); this.tracks.delete(id); }
  }

  setChannelVolumePct(pct) {
    this.originalVolumePct = pct;
    this.updateVolumeFromMaster();
  }

  updateVolumeFromMaster() {
    const master = getGlobalState().settings.normalVolume || 100;
    const result = Math.max(0, Math.min(1, (this.originalVolumePct / 100) * (master / 100)));
    for (const t of this.tracks.values()) t.setVolume(result);
  }

  fadeTo(targetPct, ms, cb) {
    for (const id of this.fadeTimers) clearInterval(id);
    this.fadeTimers.clear();
    if (!ms) { this.setChannelVolumePct(targetPct); cb && cb(); return; }
    const interval = 25;
    const steps = Math.ceil(ms / interval);
    const start = this.originalVolumePct;
    const delta = targetPct - start;
    let n = 0;
    const id = setInterval(() => {
      n++;
      const x = n / steps;
      const vol = start + delta * x * x;
      this.setChannelVolumePct(vol);
      if (n >= steps) { clearInterval(id); this.fadeTimers.delete(id); cb && cb(); }
    }, interval);
    this.fadeTimers.add(id);
  }

  destroy() {
    for (const id of this.fadeTimers) clearInterval(id);
    this.fadeTimers.clear();
    for (const t of this.tracks.values()) t.destroy();
    this.tracks.clear();
  }
}

export class MediaEngine {
  constructor() {
    this.channels = new Map();
  }

  ensureChannel(id, originalVolumePct = 100) {
    let ch = this.channels.get(id);
    if (!ch) { ch = new MediaChannel({ id, originalVolumePct }); this.channels.set(id, ch); }
    return ch;
  }

  removeChannel(id) {
    const ch = this.channels.get(id);
    if (ch) { ch.destroy(); this.channels.delete(id); }
  }

  destroySounds({
    soundId, all = false, instantly = false, fadeTimeMs = 500, filterFn = null,
  }) {
    let matched = false;
    const time = instantly ? 0 : (fadeTimeMs ?? 500);
    for (const ch of this.channels.values()) {
      if (all || (soundId ? ch.hasTag(soundId) : (!ch.hasTag('SPECIAL') && !ch.hasTag('REGION') && !ch.hasTag('SPEAKER')))) {
        if (filterFn && !filterFn(ch)) continue;
        matched = true;
        ch.fadeTo(0, time, () => this.removeChannel(ch.id));
      }
    }
    return matched;
  }
}
