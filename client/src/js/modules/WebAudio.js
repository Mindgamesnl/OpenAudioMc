export class WebAudio {

    constructor(source, onready) {
        this._source = source;

        //audio meta data
        this.meta = {};
        this.time = 0;
        this.task = 0;ß
        this.onFinishHandlers = [];
        this.isLoading = false;
        this.isPlayable = false;
        this.isFading = false;
        this.isFirstRun = true;
        this.volume = openAudioMc.getMediaManager().getMasterVolume();
        this.hasCustomVolume = false;
        this.flag = "DEFAULT";

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
        this.soundElement.oncanplay = function () {
            that.isPlayable = true;
            that.isLoading = true;
            if (that.isFirstRun) {
                that.isFirstRun = false;
                if (onready != null) onready();
            }
        };

        this.soundElement.oncanplaythrough = function () {
            that.isLoading = false;
        };

        this.soundElement.onended = function () {
            that.isPlayable = true;
            that.onFinishHandlers.forEach(h => h());
        };

        this.soundElement.onloadstart = function () {
            that.isLoading = true;
        };

        this.soundElement.ontimeupdate = function () {
            if (that.soundElement != null) that.time = that.soundElement.currentTime;
        };

        document.getElementById("volume-slider").oninput = () => this.setMasterVolume(document.getElementById("volume-slider").value);
    }

    setTime(target) {
        this.soundElement.currentTime = target;
    }

    getTime() {
        return this.soundElement.currentTime;
    }

    setMasterVolume(masterVolume) {
        if (!this.hasCustomVolume) {
            if (this.isFading) {
                clearInterval(this.task);
            }
            this.setVolume(masterVolume);
        }
    }

    onFinish(callback) {
        this.onFinishHandlers.push(callback);
    }

    setVolume(volume, fadetime, onfinish) {
        if (fadetime == null) {
            this.soundElement.volume = volume / 100;
            return;
        }
        if (this.isFading) {
            clearInterval(this.task);
        }
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

        this.isFading = true;
        this.task = setInterval(function () {
            function cancel() {
                that.isFading = false;
                if (callback != null) callback();
                clearInterval(that.task);
            }

            if (that.soundElement == null) {
                cancel();
                return;
            }

            if (volume !== Math.floor((that.soundElement.volume * 100))) {
                //check if it needs to be higher
                if (diff > 0) {
                    that.soundElement.volume =(Math.ceil((that.soundElement.volume * 100) + 1) / 100);
                } else if (diff < 0) {
                    that.soundElement.volume = (Math.floor((that.soundElement.volume * 100) - 1) / 100);
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
        let seconds = Math.abs((start.getTime() - openAudioMc.getTimeService().getPredictedTime().getTime()) / 1000);
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

    hasOwnVolume() {
        return this.hasCustomVolume;
    }

    setFlag(flag) {
        this.flag = flag;
    }

    getFlag() {
        return this.flag;
    }

    setHasOwnVolume(state) {
        this.hasCustomVolume = state;
    }

    setLooping(state) {
        this.soundElement.loop = state;
    }
}
