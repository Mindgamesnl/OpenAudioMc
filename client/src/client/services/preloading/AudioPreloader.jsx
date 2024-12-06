import { AudioSourceProcessor } from '../../util/AudioSourceProcessor';
import { PreloadedMedia } from './PreloadedMedia';
import { debugLog, feedDebugValue } from '../debugging/DebugService';
import { DebugStatistic } from '../debugging/DebugStatistic';
import { isProxyRequired, proxifyUrl } from '../media/utils/corsutil';

export const AudioPreloader = new class IAudPreload {
  constructor() {
    this.sourceRewriter = new AudioSourceProcessor();
    this.namespaces = {}; // each namespace has a list of media
  }

  async fetch(source, namespace, replenish = false) {
    source = await this.sourceRewriter.translate(source);

    // assume that we don't need cors for this, its a boring opp
    // if (isProxyRequired(source)) {
    //   source = proxifyUrl(source);
    // }

    debugLog(`Preloading audio: ${source}`);
    const media = new PreloadedMedia(source, namespace, replenish);

    if (this.namespaces[namespace] == null) {
      this.namespaces[namespace] = [];
    }

    this.namespaces[namespace].push(media);
    this.submitStatistic();

    // handle errors
    media.onErr(() => {
      debugLog(`Preloaded media failed: ${source}`);
      this.findAndRemoveMedia(source, true);
    });
  }

  drop(namespace) {
    // does the namespace exist?
    if (this.namespaces[namespace] == null) {
      return;
    }

    // loop through all media in the namespace
    let deleteCount = 0;
    this.namespaces[namespace].forEach((media) => {
      // remove the media from the source
      media.preDelete();
      deleteCount += 1;
    });

    // eslint-disable-next-line no-console
    console.log(`Dropped ${deleteCount} media from namespace ${namespace}`);

    // delete the namespace
    delete this.namespaces[namespace];
    this.submitStatistic();
  }

  findAndRemoveMedia(source, skipReplenish = false) {
    // loop through all namespaces
    // eslint-disable-next-line no-restricted-syntax
    for (const namespace in this.namespaces) {
      // eslint-disable-next-line no-prototype-builtins
      if (this.namespaces.hasOwnProperty(namespace)) {
        // loop through all media in the namespace
        // eslint-disable-next-line no-restricted-syntax
        for (const media of this.namespaces[namespace]) {
          // does the media match the source?
          if (media.source === source) {
            // this is the one we want! now also remove it from the namespace
            const countPre = this.namespaces[namespace].length;
            this.namespaces[namespace].splice(this.namespaces[namespace].indexOf(media), 1);
            const countPost = this.namespaces[namespace].length;
            if (countPre === countPost) {
              // eslint-disable-next-line no-console
              console.warn('Could not remove media from namespace');
            } else {
              this.submitStatistic();
              if (media.keepCopy && !skipReplenish) {
                // this media is set to replenish, so we need to fetch it again
                debugLog(`Replenishing media: ${source}`);
                this.fetch(source, namespace, true);
              }
            }
            return media;
          }
        }
      }
    }
    return null;
  }

  async getResource(source, corsRequired = false) {
    source = await this.sourceRewriter.translate(source);

    // find a preloaded media that matches the source
    let media = this.findAndRemoveMedia(source);

    let cacheCorsSafe = true;
    if (isProxyRequired(source) || corsRequired) {
      cacheCorsSafe = false;
    }

    const bypassBuffer = this.getMediaQueryParam(source, 'oaSkipBuffer', 'false') === 'true';

    if (bypassBuffer) {
      // reset the media
      media = null;
    }

    // ignore cache if we need cors and the source is not cors safe
    if (media == null || !cacheCorsSafe) {
      // possibly adapt source
      if (corsRequired && !cacheCorsSafe) {
        source = proxifyUrl(source);
        // log
        if (media != null) {
          debugLog(`Preloaded media was not cors safe, adapting source to ${source}`);
        }
      }
      media = new PreloadedMedia(source, null, false, corsRequired);
    } else {
      debugLog(`Using preloaded media, found ${media.source} in namespace ${media.namespace}, and it already has ready state ${media.audio.readyState} with stopwatch value ${media.audio.hasAttribute('stopwatchReady')}`);
    }

    return media.audio;
  }

  getMediaQueryParam(url, key, defaultValue = null) {
    if (!URL.canParse(url)) {
      return defaultValue;
    }
    try {
      const parsed = new URL(url);
      return parsed.searchParams.get(key) || defaultValue;
    } catch (e) {
      return defaultValue;
    }
  }

  submitStatistic() {
    let count = 0;
    // eslint-disable-next-line no-restricted-syntax
    for (const namespace in this.namespaces) {
      // eslint-disable-next-line no-prototype-builtins
      if (this.namespaces.hasOwnProperty(namespace)) {
        count += this.namespaces[namespace].length;
      }
    }
    feedDebugValue(DebugStatistic.PRELOADED_SOUNDS, count);
  }
}();
