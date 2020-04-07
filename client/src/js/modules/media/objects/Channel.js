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
    }

    setTag(name) {
        this.tags.set(name, true);
    }

    hasTag(name) {
        return this.tags.has(name);
    }

    addSound(sound) {
        this.sounds.push(sound);
        this._updateVolume();
    }

    setChannelVolume(newVolume) {
        this.channelVolume = newVolume;
        this._updateVolume();
    }

    registerMixer(mixer) {
        this.mixer = mixer;
    }

    fadeChannel(targetVolume, time) {
        this.interruptFade();
        this.targetAfterFade = targetVolume;
        this.isFading = true;
        const fadeTo = (sound, dur, toVol, callback) => {
            dur      = dur || 1000;
            toVol    = toVol || 0;
            callback = typeof callback == 'function' ? callback : function(){};
            let s    = sound,
                k    = this.channelVolume,
                t    = dur/Math.abs(k - toVol),
                i    = setInterval(() => {
                    k = k > toVol ? k - 1 : k + 1;
                    s.setVolume(k);
                    if(k == toVol){
                        callback.call(this);
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

        for (let sound of this.sounds) {
            fadeTo(sound, time, targetVolume);
        }
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

    destroy() {
        this.interruptFade();
        for (let sound of this.sounds) {
            sound.destroy();
        }
    }

}