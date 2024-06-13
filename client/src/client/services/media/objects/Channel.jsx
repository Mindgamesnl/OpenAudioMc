import { getGlobalState } from '../../../../state/store';

export class Channel {
  constructor(channelName, originalVolume = 100) {
    this.channelName = channelName;
    this.channelVolume = originalVolume;
    this.originalVolume = originalVolume;
    this.sounds = [];
    this.mixer = null;
    this.targetAfterFade = 0;
    this.isFading = false;
    this.fadeTimer = [];
    this.tags = new Map();
    this.trackable = false;
    this.prefferedFadeTime = 2;
  }

  getOriginalVolume() {
    return this.originalVolume;
  }

  setPrefferedFadeTime(fadeTime) {
    this.prefferedFadeTime = fadeTime;
  }

  getPrefferedFadeTime() {
    return this.prefferedFadeTime || 2;
  }

  setTag(name) {
    this.tags.set(name, true);
  }

  hasTag(name) {
    return this.tags.has(name);
  }

  hasSoundPlaying() {
    let foundPlayingSound = false;
    this.sounds.forEach(() => {
      foundPlayingSound = true;
    });
    return foundPlayingSound;
  }

  addSound(sound) {
    this.sounds.push(sound);
    this.sounds.forEach((rs) => {
      rs.registerMixer(this.mixer, this);
    });
    this.updateVolume();
  }

  setMediaMuted(muted) {
    this.sounds.forEach((sound) => {
      sound.setMediaMuted(muted);
    });
  }

  setChannelVolume(newVolume, cancelFade = true) {
    this.channelVolume = newVolume;
    this.updateVolume(cancelFade);
  }

  registerMixer(mixer) {
    this.mixer = mixer;
    this.sounds.forEach((sound) => {
      sound.registerMixer(this.mixer, this);
    });
  }

  fadeChannel(targetVolume, time, extraCallback) {
    this.interruptFade();
    if (extraCallback == null) {
      extraCallback = () => {
      };
    }

    // is the fade time set to 0? then just set the volume, do callback and return
    if (time === 0) {
      this.setChannelVolume(targetVolume);
      extraCallback();
      return;
    }

    if (!getGlobalState().settings.fadeAudio) {
      time = 2;
    }

    this.targetAfterFade = targetVolume;
    this.isFading = true;

    const intervalTime = 25; // Set a fixed time interval
    const numSteps = Math.ceil(time / intervalTime);
    const startVol = this.channelVolume;
    const deltaVol = targetVolume - startVol;
    let step = 0;

    // Use an exponential function to interpolate between startVol and targetVolume
    const volumeFn = (x) => startVol + deltaVol * x ** 2;
    let intervalId = setInterval(() => {
      step++;

      const effectiveVolume = getGlobalState().settings.normalVolume;
      const x = step / numSteps;
      const volume = volumeFn(x);

      // handle channel volume
      const result = (volume / 100) * effectiveVolume;

      this.sounds.forEach((sound) => {
        sound.setVolume(result);
      });

      this.channelVolume = volume;

      if (step >= numSteps) {
        extraCallback();
        clearInterval(intervalId);
        const index = this.fadeTimer.indexOf(intervalId);
        if (index > -1) {
          this.fadeTimer.splice(index, 1);
        }
        this.isFading = false;
        intervalId = null;
      }
    }, intervalTime);

    this.fadeTimer.push(intervalId);
  }

  interruptFade(cancelRecursive = false) {
    if (!this.isFading) return;
    this.isFading = false;
    this.setChannelVolume(this.targetAfterFade, cancelRecursive);
    this.fadeTimer.forEach((fadeTimerElement) => {
      clearInterval(fadeTimerElement);
    });
  }

  updateVolume(cancelFade = true) {
    if (cancelFade) this.interruptFade();
    const effectiveVolume = getGlobalState().settings.normalVolume;

    // handle channel volume
    const result = (this.channelVolume / 100) * effectiveVolume;

    this.sounds.forEach((sound) => {
      if (sound.loaded) {
        sound.setVolume(result);
      }
    });
  }

  tick() {
    // tick all sounds
    this.sounds.forEach((sound) => {
      sound.tick.bind(sound)();
    });
  }

  updateFromMasterVolume() {
    const effectiveVolume = getGlobalState().settings.normalVolume;

    // handle channel volume
    const result = (this.channelVolume / 100) * effectiveVolume;
    this.sounds.forEach((sound) => {
      sound.setVolume(result);
    });
  }

  destroy() {
    this.interruptFade();
    this.sounds.forEach((sound) => {
      sound.destroy();
    });
  }
}
