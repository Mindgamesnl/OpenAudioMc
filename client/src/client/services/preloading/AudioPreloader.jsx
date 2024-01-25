import { AudioSourceProcessor } from '../../util/AudioSourceProcessor';
import { PreloadedMedia } from './PreloadedMedia';
import { debugLog, feedDebugValue } from '../debugging/DebugService';
import { DebugStatistic } from '../debugging/DebugStatistic';

export const AudioPreloader = new class IAudPreload {
  constructor() {
    this.sourceRewriter = new AudioSourceProcessor();
    this.namespaces = {}; // each namespace has a list of media
  }

  async fetch(source, namespace) {
    source = await this.sourceRewriter.translate(source);
    const media = new PreloadedMedia(source, namespace);

    if (this.namespaces[namespace] == null) {
      this.namespaces[namespace] = [];
    }

    this.namespaces[namespace].push(media);
    this.submitStatistic();
  }

  drop(namespace) {
    // does the namespace exist?
    if (this.namespaces[namespace] == null) {
      return;
    }

    // loop through all media in the namespace
    this.namespaces[namespace].forEach((media) => {
      // remove the media from the source
      media.preDelete();
    });

    // delete the namespace
    delete this.namespaces[namespace];
    this.submitStatistic();
  }

  findAndRemoveMedia(source) {
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
            }
            return media;
          }
        }
      }
    }

    return null;
  }

  async getResource(source) {
    source = await this.sourceRewriter.translate(source);

    // find a preloaded media that matches the source
    let media = this.findAndRemoveMedia(source);

    if (media == null) {
      // create new
      media = new PreloadedMedia(source, null);
    } else {
      debugLog(`Using preloaded media, found ${media.source} in namespace ${media.namespace}, and it already has ready state ${media.audio.readyState}`);
    }

    return media.audio;
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
