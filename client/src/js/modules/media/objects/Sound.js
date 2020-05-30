import * as PluginChannel from "../../../helpers/protocol/PluginChannel";

export class Sound {

    constructor(source) {
        this.soundElement = new Audio();

        this.hadError = false;
        this.source = source;
        this.error = null;

        // error handling
        this.soundElement.onerror = (error) => {
            this.hadError = true;
            this.error = error;
            this._handleError();
        };

        //set source
        this.soundElement.src = source;

        //set attributes
        this.soundElement.setAttribute("preload", "auto");
        this.soundElement.setAttribute("controls", "none");
        this.soundElement.setAttribute("display", "none");
        this.soundElement.preload = "auto";
        this.soundElement.abort = console.log;

        this.openAudioMc = null;

        this.onFinish = null;
        this.loop = false;
        this.mixer = null;
        this.channel = null;
        this.finsishedInitializing = false;
        this.gotShutDown = false;
    }

    setOa(oa) {
        this.openAudioMc = oa;
        this._handleError();
    }

    _handleError() {
        if (this.hadError && this.openAudioMc != null) {
            if (this.error.type == "error") {
                let errorCode = this.soundElement.error.code;
                let type = null;
                if (errorCode === 1) {
                    type = "MEDIA_ERR_ABORTED";
                } else if (errorCode === 2) {
                    type = "MEDIA_ERR_NETWORK";
                } else if (errorCode === 3) {
                    type = "MEDIA_ERR_DECODE";
                } else if (errorCode === 4) {
                    type = "MEDIA_ERR_SRC_NOT_SUPPORTED";
                }

                if (type != null) {
                    // report back as failure
                    console.log("[OpenAudioMc] Reporting media failure " + type);
                    this.openAudioMc.socketModule.send(PluginChannel.MEDIA_FAILURE, {
                        "mediaError": type,
                        "source": this.soundElement.src
                    });
                }
            }
        }
    }

    addNode(player, node) {
        if (this.controller == null) {
            this.soundElement.crossOrigin = "anonymous";
            if (this.soundElement.src.indexOf("http") > -1) {
                this.soundElement.src = "https://dark-mouse-53ea.craftmend.workers.dev/corsproxy/?apiurl=" + this.soundElement.src;
            }
            this.controller = player.audioCtx.createMediaElementSource(this.soundElement);
        }
        this.controller.connect(node);
    }

    registerMixer(mixer, channel) {
        this.mixer = mixer;
        this.channel = channel;
    }

    finalize() {
        return new Promise((resolve => {
            this.soundElement.onended = () => {
                if (this.gotShutDown) return;
                if (!this.finsishedInitializing) return;
                if (this.onFinish != null) this.onFinish();
                if (this.loop) {
                    this.setTime(0);
                    this.soundElement.play();
                } else {
                    this.mixer.removeChannel(this.channel);
                    if (!this.soundElement.paused) this.soundElement.pause();
                }
            };

            let fired = false;

            const attemptToPlay = () => {
                if (this.gotShutDown) return;
                if (!fired) {
                    let prom = this.soundElement.play();
                    if (prom instanceof Promise) {
                        prom.then(resolve).catch(resolve);
                    } else {
                        resolve();
                    }
                }
                fired = true;
            };

            this.soundElement.onprogress = attemptToPlay;
            this.soundElement.oncanplay = attemptToPlay;
            this.soundElement.oncanplaythrough = attemptToPlay;
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

    startDate(date) {
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
        this.soundElement.currentTime = target;
    }

    destroy() {
        this.gotShutDown = true;
        this.setLooping(false);
        this.soundElement.pause();
        this.soundElement.remove();
    }

}