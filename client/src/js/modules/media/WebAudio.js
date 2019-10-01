export class WebAudio {

    constructor(source, main, onready) {
        this._source = source;

        //audio meta data
        this.meta = {};
        this.openAudioMc = main;
        this.task = 0;
        this.onFinishHandlers = [];
        this.isPlayable = false;
        this.isFading = false;
        this.isFirstRun = true;
        this.volume = this.openAudioMc.getMediaManager().getMasterVolume();
        this.flag = "DEFAULT";
        this._onFadeFinish = null;
        this._distance = -1;
        this._maxDistance = -1;

        //reference
        const that = this;

        //create audio element
        this.soundElement = document.createElement("audio");

        //set source
        this.soundElement.src = this._source;

        //set attributes
        this.soundElement.setAttribute("preload", "auto");
        this.soundElement.setAttribute("controls", "none");
        this.soundElement.setAttribute("display", "none");

        //register events
        this.soundElement.oncanplay = () => {
            that.isPlayable = true;
            that.isLoading = true;
            if (that.isFirstRun) {
                that.isFirstRun = false;
                if (onready != null) onready();
            }
        };

        this.soundElement.oncanplaythrough = () => {
            that.isLoading = false;
        };

        this.soundElement.onended = () => {
            that.isPlayable = true;
            that.onFinishHandlers.forEach(callback => callback());
        };

        this.soundElement.onloadstart = () => {
            that.isLoading = true;
        };

        this.soundElement.ontimeupdate = () => {
            if (that.soundElement != null) that.time = that.soundElement.currentTime;
        };
    }

    setTime(target) {
        this.soundElement.currentTime = target;
    }

    getTime() {
        return this.soundElement.currentTime;
    }

    setMasterVolume(masterVolume) {
        if (this.isFading) {
            clearInterval(this.task);
            this._executeOnFinish();
        }
        this.setVolume(masterVolume);
    }

    onFinish(callback) {
        this.onFinishHandlers.push(callback);
    }

    _executeOnFinish() {
        if (this._onFadeFinish != null) this._onFadeFinish();
        this._onFadeFinish = null;
    }

    cancelCallback() {
        this._onFadeFinish = null;
    }

    setVolume(volume, fadetime, onfinish) {
        //calculate volume if it is a speaker
        if (this._maxDistance !== -1) {
            volume = Math.round(((this._maxDistance - this._distance) / this._maxDistance) * this.openAudioMc.getMediaManager().masterVolume);
        }
        if (fadetime == null) {
            this.soundElement.volume = volume / 100;
            return;
        }
        if (this.isFading) {
            clearInterval(this.task);
            this._executeOnFinish();
        }
        this._onFadeFinish = onfinish;
        const diff = volume - (this.soundElement.volume * 100);
        let steps = 0;

        if (diff < 0) {
            steps = Math.abs(diff);
        } else {
            steps = diff;
        }

        if (fadetime == null) fadetime = 0;

        const interval = fadetime / steps;
        const that = this;
        const callback = onfinish;
        let stepsMade = 0;

        this.isFading = true;
        this.task = setInterval(() => {
            stepsMade++;

            let cancel = () => {
                that.isFading = false;
                if (callback != null) callback();
                clearInterval(that.task);
                this._onFadeFinish = null;
            }

            if (that.soundElement == null) {
                cancel();
                return;
            }

            if (steps < stepsMade) {
                cancel();
                return;
            }

            if (volume !== Math.floor((that.soundElement.volume * 100))) {
                //check if it needs to be higher
                if (diff > 0) {
                    const tVol = (Math.ceil((that.soundElement.volume * 100) + 1) / 100);
                    if (tVol > 1 || tVol < 0) {
                        cancel();
                        return;
                    }
                    that.soundElement.volume = tVol;
                } else if (diff < 0) {
                    const tVol = (Math.floor((that.soundElement.volume * 100) - 1) / 100);
                    if (tVol > 1 || tVol < 0) {
                        cancel();
                        return;
                    }
                    that.soundElement.volume = tVol;
                } else {
                    cancel();
                }
            } else {
                cancel();
            }
        }, interval);
    }

    startDate(date, flip) {
        let start = new Date(date);
        let seconds = Math.abs((start.getTime() - this.openAudioMc.getTimeService().getPredictedTime().getTime()) / 1000);
        let length = this.soundElement.duration;
        if (seconds > length) {
            if (!flip) return;
            //how many times it would have played
            let times = Math.floor(seconds / length);
            //remove other repetitions from time
            seconds = seconds - (times * length);
        }
        this.setTime(seconds);
    }

    pause() {
        this.soundElement.pause();
    }

    destroy() {
        this.pause();
        this.soundElement.remove();
        this.soundElement = null;
    }

    play() {
        if (!this.isPlayable) {
            console.error("Media could not start.");
            return;
        }
        this.soundElement.play();
    }

    setSpeakerData(maxDistance, distance) {
        this._maxDistance = maxDistance;
        this._distance = distance;
    }

    updateDistance(distance) {
        this._distance = distance;
    }

    setFlag(flag) {
        this.flag = flag;
    }

    getFlag() {
        return this.flag;
    }

    setLooping(state) {
        this.soundElement.loop = state;
    }
}
