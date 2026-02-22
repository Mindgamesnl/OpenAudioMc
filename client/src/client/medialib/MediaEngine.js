import { MediaChannel } from './MediaChannel';

export class MediaEngine {
  constructor() {
    this.channels = new Map();
    this._destructionHandlers = new Map(); // id -> Set<fn>
    // tag -> { count: number, fadeMs: number }
    this._inhibitors = Object.create(null);
    this._areSoundsPlaying = false;
    // Tracks whether the ambiance channel has received its initial volume state.
    // Without this, if nothing else is playing on startup the ambiance channel
    // never gets unmuted because _applyAmbianceState only fires on transitions.
    this._ambianceInitialized = false;
    this._tickIntervalId = setInterval(() => { try { this._tick(); } catch (e) { /* ignore */ } }, 250);
  }

  ensureChannel(id, originalVolumePct = 100) {
    let ch = this.channels.get(id);
    if (!ch) {
      ch = new MediaChannel({ id, originalVolumePct });
      // back-reference so channels can self-remove when empty
      ch._engine = this;
      this.channels.set(id, ch);
    }
    return ch;
  }

  removeChannel(id) {
    const ch = this.channels.get(id);
    if (!ch) return;
    // If the ambiance channel is being removed, reset the init flag so a
    // replacement channel gets its volume configured correctly on the next tick.
    if (ch.tagSet && ((ch.tagSet.has && ch.tagSet.has('AMBIANCE')) || id === 'ambiance-from-account')) {
      this._ambianceInitialized = false;
    }
    try {
      // Stop tracks first to avoid late events firing after channel is gone
      Array.from(ch.tracks.values()).forEach((t) => { try { t.stop(); } catch (e) { /* ignore */ } });
      ch.destroy();
    } finally {
      this.channels.delete(id);
      // Fire destruction handlers, if any
      const set = this._destructionHandlers.get(id);
      if (set) {
        set.forEach((fn) => { try { fn(); } catch (e) { /* ignore */ } });
        this._destructionHandlers.delete(id);
      }
    }
  }

  destroySounds({
    soundId, all = false, instantly = false, fadeTimeMs = 500, filterFn = null,
  }) {
    let matched = false;
    const time = instantly ? 0 : (fadeTimeMs ?? 500);
    Array.from(this.channels.values()).forEach((ch) => {
      if (all || (soundId ? ch.hasTag(soundId) : (!ch.hasTag('SPECIAL') && !ch.hasTag('REGION') && !ch.hasTag('SPEAKER')))) {
        if (filterFn && !filterFn(ch)) return;
        matched = true;
        // Initiate a destructive fade; MediaChannel will preserve pending finalizer
        // so later fades (e.g., distance) don't cancel the removal.
        ch.fadeTo(0, time, () => this.removeChannel(ch.id));
      }
    });
    return matched;
  }

  whenFinished(id, handler) {
    if (!id || typeof handler !== 'function') return () => {};
    if (!this.channels.has(id)) { try { handler(); } catch (e) { /* ignore */ } return () => {}; }
    let set = this._destructionHandlers.get(id);
    if (!set) { set = new Set(); this._destructionHandlers.set(id, set); }
    set.add(handler);
    return () => { set.delete(handler); if (set.size === 0) this._destructionHandlers.delete(id); };
  }

  // Master volume bump: ask channels to recompute effective volume from global state
  bumpVolumeChange(optionalNewVolume = null) { Array.from(this.channels.values()).forEach((ch) => ch.updateVolumeFromMaster(optionalNewVolume)); }

  // Inhibitors API to mute channels with matching tags (replaces legacy Mixer inhibitors)
  incrementInhibitor(tag, fadeMs = 150) {
    if (!tag) return;
    const entry = this._inhibitors[tag] || { count: 0, fadeMs };
    entry.count += 1;
    entry.fadeMs = Number.isFinite(fadeMs) ? fadeMs : (entry.fadeMs || 150);
    this._inhibitors[tag] = entry;
    this._applyInhibitions();
  }

  decrementInhibitor(tag, fadeMs = 150) {
    if (!tag) return;
    const entry = this._inhibitors[tag] || { count: 0, fadeMs };
    entry.count = Math.max(0, entry.count - 1);
    entry.fadeMs = Number.isFinite(fadeMs) ? fadeMs : (entry.fadeMs || 150);
    this._inhibitors[tag] = entry;
    this._applyInhibitions();
  }

  _applyInhibitionsFor(ch, immediate = false) {
    if (!ch) return;
    let total = 0;
    let maxFade = 150;
    if (ch.tagSet) {
      ch.tagSet.forEach((tag) => {
        const entry = this._inhibitors[tag];
        if (entry && entry.count > 0) {
          total += entry.count;
          if (entry.fadeMs && entry.fadeMs > maxFade) maxFade = entry.fadeMs;
        }
      });
    }

    const wantsMute = total >= 1;
    if (wantsMute && !ch._inhibitorActive) {
      ch._inhibitorActive = true;
      ch._lastInhibitFadeMs = maxFade;
      ch.fadeCurrentTo(0, immediate ? 0 : maxFade);
    } else if (!wantsMute && ch._inhibitorActive) {
      ch._inhibitorActive = false;
      const restoreMs = ch._lastInhibitFadeMs || 150;
      const target = ch.baseVolumePct ?? 100;
      ch.fadeCurrentTo(target, restoreMs);
    }
  }

  _applyInhibitions() {
    Array.from(this.channels.values()).forEach((ch) => this._applyInhibitionsFor(ch));
  }

  _tick() {
    let foundPlaying = false;
    Array.from(this.channels.values()).some((ch) => {
      if (ch.tagSet && ch.tagSet.has && ch.tagSet.has('AMBIANCE')) return false;
      Array.from(ch.tracks.values()).some((t) => {
        if (t && t.state === 'playing') { foundPlaying = true; return true; }
        return false;
      });
      return foundPlaying;
    });
    if (foundPlaying !== this._areSoundsPlaying) {
      this._areSoundsPlaying = foundPlaying;
      this._ambianceInitialized = true;
      this._applyAmbianceState(foundPlaying);
    } else if (!this._ambianceInitialized) {
      // On startup the playing state may never transition (stays false while the
      // ambiance channel sits muted at 0). Apply the current state once as soon
      // as we detect an ambiance channel so it unmutes immediately.
      const hasAmbiance = Array.from(this.channels.values()).some(
        (ch) => (ch.tagSet && ch.tagSet.has && ch.tagSet.has('AMBIANCE')) || ch.id === 'ambiance-from-account',
      );
      if (hasAmbiance) {
        this._ambianceInitialized = true;
        this._applyAmbianceState(this._areSoundsPlaying);
      }
    }
  }

  _applyAmbianceState(isPlaying) {
    // Find ambiance channel (tagged as AMBIANCE, or fallback to well-known id)
    let ambiance = null;
    Array.from(this.channels.values()).forEach((ch) => {
      if ((ch.tagSet && ch.tagSet.has && ch.tagSet.has('AMBIANCE')) || ch.id === 'ambiance-from-account') { ambiance = ch; }
    });
    if (!ambiance) return;
    const fadeMs = 800;
    if (isPlaying) {
      ambiance.fadeCurrentTo(0, fadeMs);
    } else {
      // Use 100% so effective volume equals master
      ambiance.fadeCurrentTo(100, fadeMs);
    }
  }
}
