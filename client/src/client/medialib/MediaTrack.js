import { TimeService } from '../services/time/TimeService';

export class MediaTrack {
  constructor({
    id,
    source,
    loop = false,
    startAtMillis = 0,
    startInstant = null,
    speedPct = 100,
    muted = false,
    audio: providedAudio = null,
  }) {
    this.id = id;
    this.source = source;
    this.loop = loop;
    this.startAtMillis = startAtMillis || 0;
    this.startInstant = startInstant || null;
    this.speedPct = speedPct || 100;
    this.muted = !!muted;

    this.audio = providedAudio || new Audio();
    // Prefer eager metadata loading so we can compute duration/start offsets early
    if (!providedAudio) this.audio.preload = 'metadata';
    this.audio.autoplay = false;
    this.audio.controls = false;
    if (!this.audio.crossOrigin) this.audio.crossOrigin = 'anonymous';
    this.audio.muted = this.muted;
    // Only set src for fresh elements; provided audio already bound to the correct source
    if (!providedAudio && source && (!this.audio.src || this.audio.src !== source)) {
      // eslint-disable-next-line no-console
      console.warn('Replacing audio src', this.audio.src, 'with', source);
      this.audio.src = source;
    }
    this.audio.loop = !!loop;

    this.epoch = 0;
    this.state = 'idle';
    this.volume = 1.0;
    this.timers = new Set();
    this.onFinish = new Set();
    this._handlers = { ended: null, error: null };
  }

  setTimerInterval(fn, ms) {
    const id = setInterval(fn, ms);
    this.timers.add(id);
    return id;
  }

  setTimerTimeout(fn, ms) {
    const id = setTimeout(() => {
      this.timers.delete(id);
      fn();
    }, ms);
    this.timers.add(id);
    return id;
  }

  clearAllTimers() {
    this.timers.forEach((id) => {
      clearInterval(id);
      clearTimeout(id);
    });
    this.timers.clear();
  }

  setLoop(state) {
    this.loop = !!state;
    if (this.audio) this.audio.loop = !!state;
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

  onEnded(cb) {
    // eslint-disable-next-line no-console
    console.log(`[MediaTrack ${this.id}] Adding onEnded callback, total: ${this.onFinish.size + 1}`);
    this.onFinish.add(cb);
    return () => this.onFinish.delete(cb);
  }

  async load() {
    if (this.state !== 'idle') return;
    this.state = 'loading';
    const endGuard = (fn) => (...args) => {
      if (this.state === 'destroyed' || this.state === 'stopped') return;
      fn(...args);
    };
    const onErr = endGuard(() => {
    });
    const onEnd = endGuard(() => {
      // eslint-disable-next-line no-console
      console.log(`[MediaTrack ${this.id}] Audio ended event fired, calling ${this.onFinish.size} callbacks`);
      this.onFinish.forEach((cb) => {
        try {
          cb();
        } catch (e) {
          // eslint-disable-next-line no-console
          console.error(`[MediaTrack ${this.id}] Error in onFinish callback:`, e);
        }
      });
    });
    this._handlers.error = onErr;
    this._handlers.ended = onEnd;
    this.audio.addEventListener('error', onErr);
    this.audio.addEventListener('ended', onEnd);
    const hasMeta = () => this.audio && ((Number.isFinite(this.audio.duration) && this.audio.duration > 0) || this.audio.readyState >= 1);
    if (hasMeta()) {
      this.state = 'ready';
      return;
    }
    await new Promise((resolve) => {
      const onMeta = endGuard(() => {
        cleanup();
        this.state = 'ready';
        resolve();
      });
      const cleanup = () => {
        try {
          this.audio.removeEventListener('loadedmetadata', onMeta);
          this.audio.removeEventListener('durationchange', onMeta);
          this.audio.removeEventListener('canplay', onMeta);
        } catch (e) { /* ignore */
        }
      };
      this.audio.addEventListener('loadedmetadata', onMeta);
      this.audio.addEventListener('durationchange', onMeta);
      // Fallback in case some browsers only fire canplay
      this.audio.addEventListener('canplay', onMeta);
    });
  }

  seek(seconds) {
    try {
      const d = this.audio.duration;

      // is duration infinite?
      if (d === Infinity) {
        console.warn(`[MediaTrack ${this.id}] Cannot seek, duration is infinite`);
        return;
      }

      if (Number.isFinite(d) && d > 0) seconds = Math.max(0, Math.min(seconds, d));
      this.audio.currentTime = seconds;
    } catch (e) { /* ignore */
    }
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
        this.stop();
        return;
      }
      this.seek(remaining);
    }
  }

  async play() {
    if (this.state === 'destroyed' || this.state === 'stopped') return;
    if (this.state === 'idle') await this.load();
    const myEpoch = ++this.epoch;
    this.state = 'playing';
    this.applyStartDateIfAny();
    const prom = this.audio.play();
    if (prom && typeof prom.then === 'function') {
      try {
        await prom;
      } catch (e) { /* ignore */
      }
    }
    if (this.epoch !== myEpoch) {
      try {
        this.audio.pause();
      } catch (e) { /* ignore */
      }
    }
  }

  pause() {
    if (this.state !== 'playing') return;
    this.state = 'paused';
    try {
      this.audio.pause();
    } catch (e) { /* ignore */
    }
  }

  stop() {
    if (this.state === 'stopped' || this.state === 'destroyed') return;
    this.epoch++;
    this.state = 'stopped';
    this.clearAllTimers();
    try {
      this.audio.pause();
    } catch (e) { /* ignore */
    }
    // Do not clear src on stop to avoid MEDIA_ELEMENT_ERROR: Empty src attribute
    // Fire finish callbacks so channels can clean up non-looping tracks deterministically
    // eslint-disable-next-line no-console
    console.log(`[MediaTrack ${this.id}] stop() called, firing ${this.onFinish.size} callbacks`);
    try {
      this.onFinish.forEach((cb) => {
        try {
          cb();
        } catch (e) { /* ignore */
        }
      });
    } catch (e) { /* ignore */
    }
  }

  destroy() {
    if (this.state === 'destroyed') return;
    this.stop();
    this.state = 'destroyed';
    try {
      this.audio.pause();
    } catch (e) { /* ignore */
    }
    // Detach listeners to avoid leaks
    try {
      if (this._handlers.error) this.audio.removeEventListener('error', this._handlers.error);
      if (this._handlers.ended) this.audio.removeEventListener('ended', this._handlers.ended);
      this._handlers.error = null;
      this._handlers.ended = null;
    } catch (e) { /* ignore */
    }
    // Remove the element; avoid clearing src to prevent “Empty src attribute” errors
    try {
      this.audio.remove();
    } catch (e) { /* ignore */
    }
  }
}
