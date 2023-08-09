import { GetAudio } from '../../../util/AudioFactory';
import { AUDIO_ENDPOINTS, AudioSourceProcessor } from '../../../util/AudioSourceProcessor';
import { TimeService } from '../../time/TimeService';
import { SocketManager } from '../../socket/SocketModule';
import * as PluginChannel from '../../../util/PluginChannel';
import { ReportError } from '../../../util/ErrorReporter';
import { getGlobalState } from '../../../../state/store';
import { debugLog } from '../../debugging/DebugService';

export class Sound extends AudioSourceProcessor {
  constructor(opts = {}) {
    super();
    this.hadError = false;
    this.error = null;
    this.trackable = false;

    this.options = {};

    // eslint-disable-next-line no-prototype-builtins
    this.options.startMuted = (opts.hasOwnProperty('startMuted') ? opts.startMuted : true);

    this.onFinish = [];
    this.loop = false;
    this.mixer = null;
    this.channel = null;
    this.finsishedInitializing = false;
    this.gotShutDown = false;
    this.loaded = false;
    this.initCallbacks = [];
    this.startedLoading = false;
    this.destroyed = false;
  }

  whenInitialized(f) {
    if (this.loaded) {
      f();
    } else {
      this.initCallbacks.push(f);
    }
  }

  async load(source, allowCaching = true) {
    if (this.startedLoading) return;
    this.startedLoading = true;
    this.rawSource = source;

    source = await this.translate(source);

    this.soundElement = await GetAudio(source, true, allowCaching);
    // mute default
    if (this.options.startMuted) {
      this.soundElement.volume = 0;
    }

    // error handling
    this.soundElement.onerror = (error) => {
      this.hadError = true;
      this.error = error;
      this.handleError();
    };

    // set source
    this.soundElement.src = source;
    this.source = source;

    // set attributes
    this.soundElement.setAttribute('preload', 'auto');
    this.soundElement.setAttribute('controls', 'none');
    this.soundElement.setAttribute('display', 'none');
    this.soundElement.preload = 'auto';
  }

  destroy() {
    this.whenInitialized(() => {
      // cancel current fades
      this.channel.interruptFade();

      this.destroyed = true;
      this.gotShutDown = true;
      this.setLooping(false);
      this.soundElement.pause();
      this.soundElement.remove();
      return true;
    });
  }

  finalize() {
    return new Promise(((resolve) => {
      this.soundElement.onended = async () => {
        if (this.gotShutDown) return;
        if (!this.finsishedInitializing) return;
        this.onFinish.forEach((runnable) => {
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
          const prom = this.soundElement.play();
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
          this.soundElement.pause();
        }
      };

      this.soundElement.onplay = whenStarted;
      this.soundElement.onprogress = attemptToPlay;
      this.soundElement.oncanplay = attemptToPlay;
      this.soundElement.oncanplaythrough = attemptToPlay;
      attemptToPlay();
    }));
  }

  tick() {
    if (!this.loaded && this.soundElement != null) {
      // do we have metadata?
      if (this.soundElement.readyState >= 2) {
        debugLog(`Ready state is ${this.soundElement.readyState}, metadata is available`);
        this.loaded = true;
        for (let i = 0; i < this.initCallbacks.length; i++) {
          const shouldStop = this.initCallbacks[i]();
          if (shouldStop) {
            debugLog('Stopping init callbacks');
            this.initCallbacks = [];
            return;
          }
        }
      }
    }
  }

  handleError() {
    if (this.hadError) {
      if (this.error.type === 'error') {
        const errorCode = this.soundElement.error.code;
        let type = null;

        // depends really, if it is youtube, we can assume its a yt fuckup, if not, handle it like any other media
        if (this.isYoutube) {
          type = 'YOUTUBE_ERR';
        } else if (errorCode === 1) {
          type = 'MEDIA_ERR_ABORTED';
        } else if (errorCode === 2) {
          type = 'MEDIA_ERR_NETWORK';
        } else if (errorCode === 3) {
          type = 'MEDIA_ERR_DECODE';
        } else if (errorCode === 4) {
          type = 'MEDIA_ERR_SRC_NOT_SUPPORTED';
        }

        if (type != null) {
          const stringifyError = function errorSerializer(err, filter, space) {
            const plainObject = {};
            Object.getOwnPropertyNames(err).forEach((key) => {
              plainObject[key] = err[key];
            });
            return JSON.stringify(plainObject, filter, space);
          };

          if (this.source != null && this.source !== 'null') {
            ReportError(
              'A sound failed to load.\n'
                            + `url=${this.source}\n`
                            + `error-code=${this.soundElement.error.code}\n`
                            + `error-message=${this.soundElement.error.message}\n`
                            + `detected-error=${type}\n`
                            + `dump=${stringifyError(this.error, null, '\t')}${stringifyError(this.soundElement.error, null, '\t')}\n`
                            + `hostname=${window.location.host}\n`
                            + `useragent=${window.navigator.userAgent}`,
              (getGlobalState().currentUser != null ? getGlobalState().currentUser.userName : 'unknown'),
            );
          }

          SocketManager.send(PluginChannel.MEDIA_FAILURE, {
            mediaError: type,
            source: this.soundElement.src,
          });
        }
      }
    }
  }

  addNode(player, node) {
    if (this.controller == null) {
      this.soundElement.crossOrigin = 'anonymous';
      if (!this.soundElement.src.includes('openaudiomc.net')) {
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
    this.whenInitialized(() => {
      if (volume > 100) volume = 100;
      let v = volume / 100;
      // is v non-finite?
      // eslint-disable-next-line no-self-compare
      if (v !== v || v === Infinity || v === -Infinity) {
        // Yes.
        // Setting volume to NaN is the same as setting it to 1, according to the
        // specification. See https://html.spec.whatwg.org/multipage/embedded-content.html#dom-media-volume
        v = 0;
      }
      this.soundElement.volume = v;
    });
  }

  startDate(date) {
    this.whenInitialized(() => {
      debugLog('Starting synced media');
      const start = new Date(date);
      const predictedNow = TimeService.getPredictedTime();
      const seconds = (predictedNow - start) / 1000;
      debugLog(`Started ${seconds} ago`);
      const length = this.soundElement.duration;
      debugLog(`Length ${length} seconds`);
      const loops = Math.floor(seconds / length);
      const remainingSeconds = seconds % length;

      // are we allowed to loop?
      if (!this.loop) {
        // no, so we have to stop the sound
        if (loops > 0) {
          debugLog('Stopping sound because we are not allowed to loop');
          this.destroy();
          return;
        }
      }

      debugLog(`Played ${loops} loops`);
      debugLog(`Remaining ${remainingSeconds} seconds`);
      this.setTime(remainingSeconds);
    });
  }

  setTime(target) {
    this.soundElement.currentTime = target;
  }
}

/* eslint-disable */

// here be dragons
if (

    !(
        'toJSON'
        in
        Error
            .prototype
    )) {
    Object
        .defineProperty(Error

                .prototype
            ,
            'toJSON'
            , {
                value:

                    function () {
                        var alt = {};

                        Object.getOwnPropertyNames(this).forEach(function (key) {
                            alt[key] = this[key];
                        }, this);

                        return alt;
                    }

                ,
                configurable: true
                ,
                writable: true
            }
        )
    ;
}
/* eslint-enable */
