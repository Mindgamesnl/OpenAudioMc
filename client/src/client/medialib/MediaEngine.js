import { MediaChannel } from './MediaChannel';

export class MediaEngine {
  constructor() {
    this.channels = new Map();
    this._destructionHandlers = new Map(); // id -> Set<fn>
  // tag -> { count: number, fadeMs: number }
  this._inhibitors = Object.create(null);
  this._areSoundsPlaying = false;
  this._tickIntervalId = setInterval(() => { try { this._tick(); } catch {} }, 250);
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
    try {
      // Stop tracks first to avoid late events firing after channel is gone
      for (const t of ch.tracks.values()) { try { t.stop(); } catch {} }
      ch.destroy();
    } finally {
      this.channels.delete(id);
      // Fire destruction handlers, if any
      const set = this._destructionHandlers.get(id);
      if (set) {
        for (const fn of set) { try { fn(); } catch {} }
        this._destructionHandlers.delete(id);
      }
    }
  }

  destroySounds({
    soundId, all = false, instantly = false, fadeTimeMs = 500, filterFn = null,
  }) {
    let matched = false; const time = instantly ? 0 : (fadeTimeMs ?? 500);
    for (const ch of this.channels.values()) {
      if (all || (soundId ? ch.hasTag(soundId) : (!ch.hasTag('SPECIAL') && !ch.hasTag('REGION') && !ch.hasTag('SPEAKER')))) {
      if (filterFn && !filterFn(ch)) continue; matched = true;
      // Initiate a destructive fade; MediaChannel will preserve pending finalizer
      // so later fades (e.g., distance) don't cancel the removal.
      ch.fadeTo(0, time, () => this.removeChannel(ch.id));
      }
    }
    return matched;
  }

  whenFinished(id, handler) {
    if (!id || typeof handler !== 'function') return () => {};
    if (!this.channels.has(id)) { try { handler(); } catch {} return () => {}; }
    let set = this._destructionHandlers.get(id);
    if (!set) { set = new Set(); this._destructionHandlers.set(id, set); }
    set.add(handler);
    return () => { set.delete(handler); if (set.size === 0) this._destructionHandlers.delete(id); };
  }

  // Master volume bump: ask channels to recompute effective volume from global state
  bumpVolumeChange() { for (const ch of this.channels.values()) ch.updateVolumeFromMaster(); }

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

  // Apply inhibitors to a single channel (used when tags change or new channels are created)
  _applyInhibitionsFor(ch) {
    if (!ch) return;
    let total = 0;
    let maxFade = 150;
    if (ch.tagSet) {
      for (const tag of ch.tagSet.values()) {
        const entry = this._inhibitors[tag];
        if (entry && entry.count > 0) {
          total += entry.count;
          if (entry.fadeMs && entry.fadeMs > maxFade) maxFade = entry.fadeMs;
        }
      }
    }

    const wantsMute = total >= 1;
    if (wantsMute && !ch._inhibitorActive) {
      ch._inhibitorActive = true;
      ch._lastInhibitFadeMs = maxFade;
      ch.fadeCurrentTo(0, maxFade);
    } else if (!wantsMute && ch._inhibitorActive) {
      ch._inhibitorActive = false;
      const restoreMs = ch._lastInhibitFadeMs || 150;
      const target = ch.baseVolumePct ?? 100;
      ch.fadeCurrentTo(target, restoreMs);
    }
  }

  _applyInhibitions() {
    for (const ch of this.channels.values()) this._applyInhibitionsFor(ch);
  }

  _tick() {
    // Determine if any non-ambiance channel has an actively playing track
    let foundPlaying = false;
    for (const ch of this.channels.values()) {
      if (ch.tagSet && ch.tagSet.has && ch.tagSet.has('AMBIANCE')) continue;
      for (const t of ch.tracks.values()) {
        if (t && t.state === 'playing') { foundPlaying = true; break; }
      }
      if (foundPlaying) break;
    }
    if (foundPlaying !== this._areSoundsPlaying) {
      this._areSoundsPlaying = foundPlaying;
      this._applyAmbianceState(foundPlaying);
    }
  }

  _applyAmbianceState(isPlaying) {
    // Find ambiance channel (tagged as AMBIANCE, or fallback to well-known id)
    let ambiance = null;
    for (const ch of this.channels.values()) {
      if ((ch.tagSet && ch.tagSet.has && ch.tagSet.has('AMBIANCE')) || ch.id === 'ambiance-from-account') { ambiance = ch; break; }
    }
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
