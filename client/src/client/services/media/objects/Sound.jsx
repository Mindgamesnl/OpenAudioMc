import { AudioSourceProcessor } from '../../../util/AudioSourceProcessor';
import { TimeService } from '../../time/TimeService';
import { SocketManager } from '../../socket/SocketModule';
import * as PluginChannel from '../../../util/PluginChannel';
import { ReportError } from '../../../util/ErrorReporter';
import { getGlobalState } from '../../../../state/store';
import { debugLog } from '../../debugging/DebugService';
import { AudioPreloader } from '../../preloading/AudioPreloader';
import { isProxyRequired, proxifyUrl } from '../utils/corsutil';

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
    this.usesDateSync = false;
    this.startAtMillis = 0;
    this.needsCors = false;
  }

  withCors() {
    this.needsCors = true;
  }

  whenInitialized(f) {
    if (this.loaded) {
      f.bind(this)();
    } else {
      this.initCallbacks.push(f);
    }
  }

  async load(source) {
    if (this.startedLoading) {
      return;
    }
    this.startedLoading = true;
    this.rawSource = source;
    this.soundElement = await AudioPreloader.getResource(source, this.needsCors);
    this.source = this.soundElement.src;

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

  getMediaQueryParam(key, defaultValue = null) {
    const url = new URL(this.source);
    return url.searchParams.get(key) || defaultValue;
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
          // possibly fetch next playlist entry
          const nextSource = await this.translate(this.rawSource);
          // Did it change? then re-handle
          if (nextSource !== this.source) {
            if (this.needsCors && isProxyRequired(nextSource)) {
              this.soundElement.src = proxifyUrl(nextSource);
            } else {
              // no cors needed, just yeet
              this.soundElement.src = nextSource;
            }
            this.source = nextSource;
          }
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

      const bypassBuffer = this.getMediaQueryParam('oaSkipBuffer') === 'true';

      const loadedFinished = this.soundElement.hasAttribute('stopwatchReady')
        || bypassBuffer; // alternatively allow a bypass

      let requiredReadyState = 4;
      if (bypassBuffer) {
        requiredReadyState = 3;
      }

      if (this.soundElement.readyState >= requiredReadyState && loadedFinished) {
        const loadDuration = parseFloat(this.soundElement.getAttribute('stopwatchTime') || 0);
        debugLog(`Ready state is ${this.soundElement.readyState}, metadata is available. Loading took ${loadDuration}s.`);
        this.loaded = true;

        for (let i = 0; i < this.initCallbacks.length; i++) {
          const shouldStop = this.initCallbacks[i].bind(this)();
          if (shouldStop) {
            debugLog('Stopping init callbacks');
            this.initCallbacks = [];
            return;
          }
        }

        // are we not syncing? in that case, we may need to set our own start time
        if (!this.usesDateSync) {
          if (this.startAtMillis > 0) {
            this.setTime(this.startAtMillis / 1000);
          }
        }

        // did this sound get shut down?
        if (this.gotShutDown) {
          this.soundElement.pause();
          this.mixer.removeChannel(this.channel);
          // eslint-disable-next-line no-console
          console.warn('Sound got shut down while loading');
        }
      } else {
        // debugLog('Media not ready yet', this.soundElement.readyState, this.soundElement.hasAttribute('stopwatchReady'));
      }
    }
  }

  setStartAt(startAt) {
    this.startAtMillis = startAt;
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
      this.controller = player.audioCtx.createMediaElementSource(this.soundElement);
    }
    this.controller.connect(node);
  }

  setMediaMuted(muted) {
    this.whenInitialized(() => {
      // override mute state
      this.soundElement.muted = muted;
    });
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
    this.usesDateSync = true;
    this.whenInitialized(() => {
      // debugLog('Starting synced media');
      const start = new Date(date);
      const predictedNow = TimeService.getPredictedTime();
      const msDiff = Math.max(predictedNow.getTime() - start.getTime(), 1);
      let seconds = msDiff / 1000;

      // add at startAt timestamp to the seconds to still apply the offset
      if (this.startAtMillis) {
        seconds += this.startAtMillis / 1000;
      }

      const length = this.soundElement.duration;
      const loops = Math.floor(seconds / length);
      debugLog('Loops', loops, 'Seconds', seconds, 'Length', length, this.destroyed, this.soundElement.readyState);
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
