import { getGlobalState } from '../../state/store';

export class MediaChannel {
  constructor({ id, originalVolumePct = 100 }) {
    this.id = id;
    // baseVolumePct: the intended loudness from distance/explicit settings
    // currentVolumePct: the actual audible loudness before master, affected by fades/inhibitors
    this.baseVolumePct = originalVolumePct;
    this.currentVolumePct = originalVolumePct;
    this.tagSet = new Set();
    this.tracks = new Map();
    this.mutedByScore = false;
    // Separate timer sets so base-volume fades and current-volume fades never cancel each other.
    // fadeTimers        -> used by fadeTo()        (base/distance/volume fades)
    // currentFadeTimers -> used by fadeCurrentTo() (inhibitor/ambiance fades)
    this.fadeTimers = new Set();
    this.currentFadeTimers = new Set();
    // When a destroy fade is initiated, we keep the finalizer here so
    // subsequent fades (like distance updates) don't cancel the removal.
    this._pendingRemoveFinalizer = null;
    this._isDestroying = false;
    this._engine = null; // set by MediaEngine.ensureChannel
    this.playlistData = null; // { sources: [...], loop: bool, lastIndex: number }
  }

  setPlaylistData(data) {
    this.playlistData = data;
  }

  setTag(tag) {
    if (!tag) return;
    this.tagSet.add(tag);
    // If engine is present, re-apply inhibitors for this channel when tags change.
    // Pass immediate=true so a brand-new channel that should already be inhibited
    // snaps to silent instantly rather than leaking one 25 ms tick of audio.
    if (this._engine && typeof this._engine._applyInhibitionsFor === 'function') {
      try { this._engine._applyInhibitionsFor(this, true); } catch (e) { /* ignore */ }
    }
  }

  hasTag(tag) { return this.tagSet.has(tag); }

  addTrack(track) {
    this.tracks.set(track.id, track);
    // If a non-looping track ends, auto-remove the channel if this was the last track
    // UNLESS this is a playlist, which manages its own track transitions
    if (!this.playlistData) {
      try {
        track.onEnded(() => {
          this.tracks.delete(track.id);
          if (this.tracks.size === 0 && this._engine) {
            this._engine.removeChannel(this.id);
          }
        });
      } catch (e) { /* ignore */ }
    }
    this.updateVolumeFromMaster();
  }

  updateMediaSpeed(speed) {
    this.tracks.forEach((t) => t.setPlaybackSpeed(speed));
  }

  removeTrack(id) {
    const t = this.tracks.get(id);
    if (t) { t.destroy(); this.tracks.delete(id); }
    if (this.tracks.size === 0 && this._engine) {
      this._engine.removeChannel(this.id);
    }
  }

  setChannelVolumePct(pct) {
    // Update the base volume (e.g., distance or target volume). If not under inhibitor fade, also reflect it immediately.
    this.baseVolumePct = pct;
    // Only snap current volume to base when not actively inhibited (best-effort; engine sets _inhibitorActive)
    if (!this._inhibitorActive && !this._isDestroying) {
      this.currentVolumePct = pct;
    }
    this.updateVolumeFromMaster();
  }

  updateVolumeFromMaster(optionalNewMaster = getGlobalState().settings.normalVolume) {
    const master = optionalNewMaster;
    const pct = (this.currentVolumePct / 100) * (master / 100);
    const result = Math.max(0, Math.min(1, pct));
    Array.from(this.tracks.values()).forEach((t) => t.setVolume(result));
    // If fully silent and no tracks are playing, allow cleanup to proceed
    if (result === 0 && this.tracks.size === 0 && this._engine) {
      this._engine.removeChannel(this.id);
    }
  }

  fadeTo(targetPct, ms, cb) {
    // This fade is for base/explicit level changes. If inhibited, we only update baseVolumePct over time
    // and keep currentVolumePct clamped by the inhibitor.
    // If this fade is a destructive one, remember its finalizer.
    if (typeof cb === 'function') {
      this._pendingRemoveFinalizer = cb;
      this._isDestroying = true;
    }

    // If we're already destroying, don't allow new fades to postpone cleanup.
    if (this._isDestroying && this._pendingRemoveFinalizer) {
      // Snap to requested volume, then finalize removal immediately.
      this.setChannelVolumePct(targetPct);
    }

    // Cancel any ongoing BASE-volume fade timers only.
    // currentFadeTimers (inhibitor/ambiance fades) are intentionally left running.
    this.fadeTimers.forEach((id) => clearInterval(id));
    this.fadeTimers.clear();

    const finish = () => {
      const fin = this._pendingRemoveFinalizer || cb;
      // Make sure we only run once
      this._pendingRemoveFinalizer = null;
      this._isDestroying = false;
      if (typeof fin === 'function') fin();
      // If this wasn’t a destroying fade, nothing else to do.
    };

    if (!ms || ms <= 0) {
      this.baseVolumePct = targetPct;
      // Only snap audible volume when not under inhibitor
      if (!this._inhibitorActive || this._isDestroying) {
        this.currentVolumePct = targetPct;
      }
      this.updateVolumeFromMaster();
      finish();
      return;
    }

    const interval = 25;
    const steps = Math.ceil(ms / interval) || 1;
    const inhibited = !!(this._inhibitorActive && !this._isDestroying);
    const start = inhibited ? this.baseVolumePct : this.currentVolumePct;
    const delta = targetPct - start;
    let n = 0;
    const id = setInterval(() => {
      n++;
      const x = Math.min(1, n / steps);
      const vol = start + delta * x * x; // ease-in quadratic
      if (inhibited) {
        // Only update the underlying base; keep audible volume clamped until inhibitor is gone
        this.baseVolumePct = vol;
      } else {
        this.currentVolumePct = vol;
      }
      this.updateVolumeFromMaster();
      if (n >= steps) {
        clearInterval(id);
        this.fadeTimers.delete(id);
        // Commit the base to target at the end of a base fade
        this.baseVolumePct = targetPct;
        finish();
      }
    }, interval);
    this.fadeTimers.add(id);
  }

  // Fade only the CURRENT audible volume (e.g., inhibitors/ambiance), keeping baseVolumePct intact
  fadeCurrentTo(targetPct, ms, cb) {
    // If this fade is destructive (cb provided), mark as destroying
    if (typeof cb === 'function') {
      this._pendingRemoveFinalizer = cb;
      this._isDestroying = true;
    }

    // Cancel any ongoing CURRENT-volume fade timers only.
    // fadeTimers (base/distance fades) are intentionally left running.
    this.currentFadeTimers.forEach((id) => clearInterval(id));
    this.currentFadeTimers.clear();

    const finish = () => {
      const fin = this._pendingRemoveFinalizer || cb;
      this._pendingRemoveFinalizer = null;
      this._isDestroying = false;
      if (typeof fin === 'function') fin();
    };

    if (!ms || ms <= 0) {
      this.currentVolumePct = targetPct;
      this.updateVolumeFromMaster();
      finish();
      return;
    }

    const interval = 25;
    const steps = Math.ceil(ms / interval) || 1;
    const start = this.currentVolumePct;
    const delta = targetPct - start;
    let n = 0;
    const id = setInterval(() => {
      n++;
      const x = Math.min(1, n / steps);
      const vol = start + delta * x * x;
      this.currentVolumePct = vol;
      this.updateVolumeFromMaster();
      if (n >= steps) {
        clearInterval(id);
        this.currentFadeTimers.delete(id);
        finish();
      }
    }, interval);
    this.currentFadeTimers.add(id);
  }

  destroy() {
    this.fadeTimers.forEach((id) => clearInterval(id));
    this.fadeTimers.clear();
    this.currentFadeTimers.forEach((id) => clearInterval(id));
    this.currentFadeTimers.clear();
    Array.from(this.tracks.values()).forEach((t) => t.destroy());
    this.tracks.clear();
  }
}
