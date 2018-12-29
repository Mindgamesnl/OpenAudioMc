class WebAudio {

    constructor(source, onready) {
        this._source = source;

        //maudio meta data
        this.meta = {};
        this.time = 0;
        this.task = 0;

        this.isLoading = false;
        this.isPlayable = false;
        this.isFading = false;
        this.isFirstRun = true;

        //referance
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
        };

        this.soundElement.onloadstart = function () {
            that.isLoading = true;
        };

        this.soundElement.ontimeupdate = function () {
            that.time = that.soundElement.currentTime;
        };
    }

    setTime(target) {
        this.soundElement.currentTime = target;
    }

    getTime() {
        return this.soundElement.currentTime;
    }

    setVolume(volume, fadetime) {
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

        this.isFading = true;
        this.task = setInterval(function () {
            function cancel() {
                that.isFading = false;
                clearInterval(that.task);
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

    startDate(date) {
        let start = new Date(date * 1000);
        let seconds = Math.abs((start.getTime() - new Date().getTime()) / 1000);
        let length = this.soundElement.duration;
        if (seconds > length) {
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

    setLooping(state) {
        this.soundElement.loop = state;
    }
}