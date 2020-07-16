import * as PluginChannel from "../../../helpers/protocol/PluginChannel";
import {AudioSourceProcessor} from "../../../helpers/protocol/AudioSourceProcessor";

if (!('toJSON' in Error.prototype))
    Object.defineProperty(Error.prototype, 'toJSON', {
        value: function () {
            var alt = {};

            Object.getOwnPropertyNames(this).forEach(function (key) {
                alt[key] = this[key];
            }, this);

            return alt;
        },
        configurable: true,
        writable: true
    });

export class Sound extends AudioSourceProcessor {

    constructor(source) {
        super()
        source = this.translate(source);

        this.soundElement = new Audio();

        this.hadError = false;
        this.source = source;
        this.error = null;
        this.trackable = false;

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

                // depends really, if it is youtube, we can assume its a yt fuckup, if not, handle it like any other media
                if (this.isYoutube) {
                    if (this.openAudioMc.socketModule.supportsYoutube) {
                        type = "YOUTUBE_ERR";
                    } else {
                        type = "MEDIA_ERR_SRC_NOT_SUPPORTED";
                    }
                } else {
                    if (errorCode === 1) {
                        type = "MEDIA_ERR_ABORTED";
                    } else if (errorCode === 2) {
                        type = "MEDIA_ERR_NETWORK";
                    } else if (errorCode === 3) {
                        type = "MEDIA_ERR_DECODE";
                    } else if (errorCode === 4) {
                        type = "MEDIA_ERR_SRC_NOT_SUPPORTED";
                    }
                }

                if (type != null) {
                    // report back as failure
                    console.log("[OpenAudioMc] Reporting media failure " + type);

                    // don't send youtube, youtube errors will appear somewhere else
                    if (!(type == "MEDIA_ERR_SRC_NOT_SUPPORTED" && this.isYoutube)) {
                        var stringifyError = function(err, filter, space) {
                            var plainObject = {};
                            Object.getOwnPropertyNames(err).forEach(function(key) {
                                plainObject[key] = err[key];
                            });
                            return JSON.stringify(plainObject, filter, space);
                        };
                        this.openAudioMc.sendError("A sound failed to load.\nurl=" + this.source + "\nerror-code=" + this.soundElement.error.code + "\nerror-message=" + this.soundElement.error.message + "\ndetected-error=" + type + "\ndump=" + stringifyError(this.error, null, '\t') + stringifyError(this.soundElement.error, null, '\t') + "\nhostname=" + window.location.host);
                    }

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
            if (this.soundElement.src.includes("http") && !this.soundElement.src.includes("openaudiomc.net")) {
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

            const whenStarted = () => {
                if (this.gotShutDown) {
                    console.log("[OpenAudioMc] Canceled a sound that started to play, for some reason.");
                    this.soundElement.pause();
                }
            };

            this.soundElement.onplay = whenStarted;
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