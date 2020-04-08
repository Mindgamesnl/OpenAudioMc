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

        this.openAudioMc = null;

        this.onFinish = null;
        this.loop = false;
        this.mixer = null;
        this.channel = null;
        this.finsishedInitializing = false;
    }

    setOa(oa) {
        this.openAudioMc = oa;
    }

    registerMixer(mixer, channel) {
        this.mixer = mixer;
        this.channel = channel;
    }

    finalize() {
        return new Promise((resolve => {
            this.soundElement.onended = () => {
                if (!this.finsishedInitializing) return;
                console.log("Resource stream ended")
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

    finish() {
        this.finsishedInitializing = true;
    }

    setOnFinish(runnable) {
        this.onFinish = runnable;
    }

    setVolume(volume) {
        if (volume > 100) volume = 100;
        this.soundElement.volume = volume / 100;
    }

    startDate(date, flip) {
        console.log("Calculating offset for " + date)
        let start = new Date(date);
        let seconds = Math.abs((start.getTime() - this.openAudioMc.timeService.getPredictedTime()) / 1000);
        let length = this.soundElement.duration;
        if (seconds > length) {
            // how many times it would have played
            let times = Math.floor(seconds / length);
            //remove other repetitions from time
            seconds = seconds - (times * length);
        }
        this.setTime(seconds);
    }

    setTime(target) {
        console.log("Skipping to " + target)
        this.soundElement.currentTime = target;
    }

    destroy() {
        this.setLooping(false);
        this.soundElement.pause();
        this.soundElement.remove();
    }

}