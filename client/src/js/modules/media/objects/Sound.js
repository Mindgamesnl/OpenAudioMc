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

        this.onFinish = null;
        this.loop = false;
        this.mixer = null;
        this.channel = null;
    }

    registerMixer(mixer, channel) {
        this.mixer = mixer;
        this.channel = channel;
    }

    finalize() {
        return new Promise((resolve => {
            this.soundElement.onended = () => {
                if (this.onFinish != null) this.onFinish();
                if (this.loop) {
                    this.setTime(0);
                    this.soundElement.play();
                } else {
                    this.mixer.removeChannel(this.channel);
                }
            };

            setTimeout(() => {
                this.soundElement.play().then(resolve).catch(resolve);
            }, 1);
        }));
    }

    setLooping(state) {
        this.loop = state;
    }

    setOnFinish(runnable) {
        this.onFinish = runnable;
    }

    setVolume(volume) {
        if (volume > 100) volume = 100;
        this.soundElement.volume = volume / 100;
    }

    startDate(date, flip) {
        let start = new Date(date);
        let seconds = Math.abs((start.getTime() - this.openAudioMc.timeService.getPredictedTime()) / 1000);
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