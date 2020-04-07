import openAudioMc from "../../../helpers/StaticFunctions";

export class Sound {

    constructor(source) {
        this.soundElement = document.createElement("audio");

        //set source
        this.soundElement.src = source;

        //set attributes
        this.soundElement.setAttribute("preload", "auto");
        this.soundElement.setAttribute("controls", "none");
        this.soundElement.setAttribute("display", "none");

        this.soundElement.autoplay = false;

        this.onFinish = null;
        this.loop = false;

        this.soundElement.onended = () => {
            if (this.onFinish != null) this.onFinish();
            if (this.loop) {
                this.setTime(0);
                this.soundElement.play();
            }
        };

        this.soundElement.oncanplay = () => {
            this.soundElement.play().then(r => console.log);
        };
    }

    setLooping(state) {
        this.loop = state;
    }

    setOnFinish(runnable) {
        this.onFinish = runnable;
    }

    setVolume(volume) {
        this.soundElement.volume = volume;
    }

    startDate(date, flip) {
        let start = new Date(date);
        let seconds = Math.abs((start.getTime() - openAudioMc.timeService.getPredictedTime()) / 1000);
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

    setTime(target) {
        this.soundElement.currentTime = target;
    }

    destroy() {
        this.setLooping(false);
        this.soundElement.pause();
        this.soundElement.remove();
    }

}