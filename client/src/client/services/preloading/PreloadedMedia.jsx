import { WatchMediaPerformance } from '../media/utils/MediaLoadStopwatch';

export class PreloadedMedia {
  constructor(source, namespace, keepCopy = false, corsRequired = false) {
    this.source = source;
    this.keepCopy = keepCopy;
    this.namespace = namespace;
    this.failed = false;
    this.failHandlers = [];
    const soundElement = new Audio();

    // catch errors
    soundElement.addEventListener('error', () => {
      this.failed = true;
      this.failHandlers.forEach((handler) => {
        handler();
      });
    });

    WatchMediaPerformance(soundElement);
    soundElement.autoplay = false;

    if (corsRequired) {
      soundElement.crossOrigin = 'anonymous';
    }

    soundElement.src = source;
    soundElement.load();

    this.audio = soundElement;
  }

  onErr(f) {
    if (this.failed) {
      f();
    } else {
      this.failHandlers.push(f);
    }
  }

  preDelete() {
    // optionally do something before the media is deleted
  }
}
