export class Channel {

    constructor(channelName) {
        this.channelName = channelName;
        this.channelVolume = 100;
        this.sounds = new Array();
        this.mixer = null;
        this.targetAfterFade = 0;
        this.isFading = false;
        this.fadeTimer = new Array();
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

    setChannelVolume(newVolume) {
        this.channelVolume = newVolume;
        this._updateVolume();
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

        this.targetAfterFade = targetVolume;
        this.isFading = true;
        const fadeTo = (sound, dur, toVol, callback) => {
            dur      = dur || 1000;
            toVol    = toVol || 0;
            callback = callback;
            let s    = sound,
                k    = this.channelVolume,
                t    = dur/Math.abs(k - toVol),
                i    = setInterval(() => {
                    k = k > toVol ? k - 1 : k + 1;

                    let effectiveVolume = this.mixer.masterVolume;

                    // handle channel volume
                    let result = (k / 100) * effectiveVolume;

                    for (let sound of this.sounds) {
                        sound.setVolume(result);
                    }

                    this.channelVolume = k;

                    if(k == toVol){
                        extraCallback();
                        clearInterval(i);
                        const index = this.fadeTimer.indexOf(i);
                        if (index > -1) {
                            this.fadeTimer.splice(index, 1);
                        }
                        this.isFading = false;
                        i = null;
                    }
                }, t);
            this.fadeTimer.push(i);
        };

        fadeTo(this, time, targetVolume, extraCallback);
    }


    interruptFade() {
        if (!this.isFading) return;
        this.isFading = false;
        this.setChannelVolume(this.targetAfterFade);
        for (let fadeTimerElement of this.fadeTimer) {
            clearInterval(fadeTimerElement);
        }
    }

    _updateVolume() {
        this.interruptFade();
        let effectiveVolume = this.mixer.masterVolume;

        // handle channel volume
        let result = (this.channelVolume / 100) * effectiveVolume;

        for (let sound of this.sounds) {
            sound.setVolume(result);
        }
    }

    updateFromMasterVolume() {
        let effectiveVolume = this.mixer.masterVolume;

        // handle channel volume
        let result = (this.channelVolume / 100) * effectiveVolume;
        for (let sound of this.sounds) {
            sound.setVolume(result);
        }
    }

    destroy() {
        this.interruptFade();
        for (let sound of this.sounds) {
            sound.destroy();
        }
    }

}