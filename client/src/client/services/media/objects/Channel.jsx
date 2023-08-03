import {getGlobalState} from "../../../../state/store";
import {debugLog} from "../../debugging/DebugService";

export class Channel {

    constructor(channelName) {
        this.channelName = channelName;
        this.channelVolume = 100;
        this.sounds = [];
        this.mixer = null;
        this.targetAfterFade = 0;
        this.isFading = false;
        this.fadeTimer = [];
        this.tags = new Map();
        this.trackable = false;
    }

    setTag(name) {
        this.tags.set(name, true);
    }

    hasTag(name) {
        return this.tags.has(name);
    }

    hasSoundPlaying() {
        for (let value of this.sounds.values()) {
            return true;
        }
        return false;
    }

    addSound(sound) {
        this.sounds.push(sound);
        for (let value of this.sounds.values()) {
            value.registerMixer(this.mixer, this);
        }
        this._updateVolume();
    }

    setChannelVolume(newVolume, cancelFade = true) {
        this.channelVolume = newVolume;
        this._updateVolume(cancelFade);
    }

    registerMixer(mixer) {
        this.mixer = mixer;
        for (let value of this.sounds.values()) {
            value.registerMixer(this.mixer, this);
        }
    }

    fadeChannel(targetVolume, time, extraCallback) {
        this.interruptFade();
        if (extraCallback == null) {
            extraCallback = () => {};
        }

        // is the fade time set to 0? then just set the volume, do callback and return
        if (time === 0) {
            debugLog("Fading channel", this.channelName, "to", targetVolume, "instantly")
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

        const volumeFn = (x) => {
            // Use an exponential function to interpolate between startVol and targetVolume
            return startVol + deltaVol * Math.pow(x, 2);
        };

        let intervalId = setInterval(() => {
            step++;

            let effectiveVolume = getGlobalState().settings.normalVolume;
            const x = step / numSteps;
            const volume = volumeFn(x);

            // handle channel volume
            let result = (volume / 100) * effectiveVolume;

            for (let sound of this.sounds) {
                sound.setVolume(result);
            }

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
        for (let fadeTimerElement of this.fadeTimer) {
            clearInterval(fadeTimerElement);
        }
    }

    _updateVolume(cancelFade = true) {
        if (cancelFade) this.interruptFade();
        let effectiveVolume = getGlobalState().settings.normalVolume;

        // handle channel volume
        let result = (this.channelVolume / 100) * effectiveVolume;

        for (let sound of this.sounds) {
            if (sound.loaded) {
                sound.setVolume(result);
            }
        }
    }

    tick() {
        // tick all sounds
        for (let sound of this.sounds) {
            sound.tick();
        }
    }

    updateFromMasterVolume() {
        let effectiveVolume = getGlobalState().settings.normalVolume;

        // handle channel volume
        let result = (this.channelVolume / 100) * effectiveVolume;
        for (let sound of this.sounds) {
            sound.setVolume(result);
        }
    }

    destroy() {
        this.interruptFade();
        for (let sound of this.sounds) {
            debugLog("Destroying sound", sound)
            sound.destroy();
        }
    }

}