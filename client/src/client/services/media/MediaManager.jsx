// Legacy Mixer removed; medialib is the single source of truth
import { getGlobalState, store } from '../../../state/store';
import { SocketManager } from '../socket/SocketModule';
import * as PluginChannel from '../../util/PluginChannel';
import { debugLog } from '../debugging/DebugService';
import { MediaEngine } from '../../medialib/MediaEngine';
import { MediaTrack } from '../../medialib/MediaTrack';

export const MediaManager = new class IMediaManager {
  constructor() {
    this.sounds = {};
    this.startSound = null;
    this.engine = new MediaEngine();

    let lastVolume = 0;
    store.subscribe(() => {
      if (store.getState().settings.normalVolume === null) return;
      if (lastVolume !== store.getState().settings.normalVolume) {
        lastVolume = store.getState().settings.normalVolume;
        this.setMasterVolume(lastVolume);
      }
    });

    this.postBoot = this.postBoot.bind(this);
    this.startVolumeMonitor();
  }

  startVolumeMonitor() {
    let oldVolume = -1;
    setInterval(() => {
      const currentVolume = getGlobalState().settings.normalVolume;
      if (oldVolume !== currentVolume) {
        oldVolume = currentVolume;
        SocketManager.send(PluginChannel.VOLUME_CHANGED, {
          volume: currentVolume,
        });
      }
    }, 1000);
  }

  async setupAmbianceSound(source) {
    // dont do anything if its empty or whatever
    if (source === '' || source == null) return;
    // Register an engine channel for ambiance for deterministic control
    try {
      const chId = 'ambiance-from-account';
      const engineChannel = this.engine.ensureChannel(chId, 0);
      engineChannel.setTag('AMBIANCE');
      const preloaded = await (await import('../preloading/AudioPreloader')).AudioPreloader.getResource(source, false);
      const track = new MediaTrack({
        id: `${chId}::0`, source, audio: preloaded, loop: true,
      });
      engineChannel.addTrack(track);
      engineChannel.setChannelVolumePct(0); // start muted, engine tick will fade based on activity
      // play and loop
      track.play();
    } catch (e) {
      // eslint-disable-next-line no-console
      console.warn('Failed to setup medialib ambiance track', e);
    }
  }

  async postBoot() {
    if (this.startSound != null) {
      try {
        const engineChannel = this.engine.ensureChannel('startsound', 100);
        const preloaded = await (await import('../preloading/AudioPreloader')).AudioPreloader.getResource(this.startSound, false);
        const track = new MediaTrack({
          id: 'startsound::0', source: this.startSound, audio: preloaded, loop: false,
        });
        engineChannel.addTrack(track);
        track.play();
      } catch (e) { /* ignore */
      }
    }

    if (this.ambianceSound !== '') {
      await this.setupAmbianceSound(this.ambianceSound);
    }
  }

  destroySounds(soundId, all, instantly, transition, atTheEnd = () => {
  }) {
    debugLog('Destroying sounds', soundId, all, instantly, transition);
    const matched = this.engine.destroySounds({
      soundId, all, instantly, fadeTimeMs: transition,
    });
    if (soundId && typeof atTheEnd === 'function') {
      if (instantly) {
        atTheEnd();
      } else {
        this.engine.whenFinished(soundId, atTheEnd);
      }
    }
    return matched;
  }

  setMasterVolume(optionalNewVolume = null) {
    // Update all engine channels to reflect the new master volume
    if (this.engine && this.engine.bumpVolumeChange) this.engine.bumpVolumeChange(optionalNewVolume);
  }
}();
