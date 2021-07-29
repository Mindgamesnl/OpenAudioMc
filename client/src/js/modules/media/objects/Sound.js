import * as PluginChannel from "../../../helpers/protocol/PluginChannel";
import {AUDIO_ENDPOINTS, AudioSourceProcessor} from "../../../helpers/protocol/AudioSourceProcessor";
import { GetAudio } from '../../../helpers/utils/AudioFactory'
import {oalog} from "../../../helpers/log";

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

    constructor() {
        super()
        this.hadError = false;
        this.error = null;
        this.trackable = false;


        this.onFinish = [];
        this.loop = false;
        this.mixer = null;
        this.channel = null;
        this.finsishedInitializing = false;
        this.gotShutDown = false;
    }

    async load(source) {
        this.rawSource = source;

        source = await this.translate(source);

        this.soundElement = await GetAudio(source, true);
        this.soundElement.crossOrigin = "anonymous";

        // error handling
        this.soundElement.onerror = (error) => {
            this.hadError = true;
            this.error = error;
            this._handleError();
        };

        //set source
        this.soundElement.src = source;
        this.source = source;

        //set attributes
        this.soundElement.setAttribute("preload", "auto");
        this.soundElement.setAttribute("controls", "none");
        this.soundElement.setAttribute("display", "none");
        this.soundElement.preload = "auto";
        this.soundElement.abort = console.log;
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
                    oalog("Reporting media failure " + type);

                    var stringifyError = function(err, filter, space) {
                        var plainObject = {};
                        Object.getOwnPropertyNames(err).forEach(function(key) {
                            plainObject[key] = err[key];
                        });
                        return JSON.stringify(plainObject, filter, space);
                    };

                    if (this.source != null && this.source != "null") {
                        this.openAudioMc.sendError(
                            "A sound failed to load.\n" +
                            "url=" + this.source + "\n" +
                            "error-code=" + this.soundElement.error.code + "\n" +
                            "error-message=" + this.soundElement.error.message + "\n" +
                            "detected-error=" + type + "\n" +
                            "dump=" + stringifyError(this.error, null, '\t') + stringifyError(this.soundElement.error, null, '\t') + "\n" +
                            "hostname=" + window.location.host + "\n" +
                            "useragent=" + window.navigator.userAgent
                        );
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
            if (!this.soundElement.src.includes("openaudiomc.net")) {
                this.soundElement.src = AUDIO_ENDPOINTS.PROXY + this.soundElement.src;
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
            this.soundElement.onended = async () => {
                if (this.gotShutDown) return;
                if (!this.finsishedInitializing) return;
                this.onFinish.forEach((runnable, key) => {
                    runnable();
                });
                if (this.loop) {
                    this.soundElement.src = await this.translate(this.rawSource);
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
                    oalog("Canceled a sound that started to play, for some reason.");
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
        this.onFinish.push(runnable);
    }

    setVolume(volume) {
        if (volume > 100) volume = 100;
        this.soundElement.volume = volume / 100;
    }

    startDate(date) {
        let start = new Date(date);
        let predictedNow = this.openAudioMc.timeService.getPredictedTime();
        let seconds = (predictedNow - start) / 1000
        oalog("Started " + seconds + " ago")
        let length = this.soundElement.duration;
        if (seconds > length) {
            let times = Math.floor(seconds / length);
            seconds = seconds - (times * length);
        }
        oalog("Starting " + seconds + " in")
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
