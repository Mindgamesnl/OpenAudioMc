import { debugLog, feedDebugValue } from '../../debugging/DebugService';
import { DebugStatistic } from '../../debugging/DebugStatistic';

export function WatchMediaPerformance(soundElement) {
  // print stack
  return new MediaPerformanceWatcher(soundElement);
}

export class MediaPerformanceWatcher {
  constructor(soundElement) {
    this.soundElement = soundElement;
    this.running = false;
    this.finished = false;

    // Stop when we have enough data to start playing (optimized for speed)
    this.soundElement.addEventListener('canplay', () => {
      this.stop();
    });

    // Also stop on canplaythrough for complete loading
    this.soundElement.addEventListener('canplaythrough', () => {
      this.stop();
    });

    // is it loading?
    this.soundElement.addEventListener('loadstart', this.start.bind(this));

    // register waiting
    this.soundElement.addEventListener('waiting', this.handleDehydration.bind(this));

    // is ready state already adequate?
    if (this.soundElement.readyState >= 3) { // HAVE_FUTURE_DATA or better
      this.start();
      this.stop(true);
    }
  }

  start() {
    if (this.running) {
      return;
    }
    this.running = true;
    this.start = performance.now();
  }

  handleDehydration() {

  }

  stop(earlyStop = false) {
    if (!this.running) {
      return 0;
    }
    this.running = false;
    this.finished = true;
    const end = performance.now();
    const time = end - this.start;
    // convert to integer
    let integ = Math.round(time);
    feedDebugValue(DebugStatistic.MEDIA_LOAD_TIME, integ);
    // convert to seconds
    integ /= 1000;

    // set ready
    this.soundElement.setAttribute('stopwatchReady', 'true');
    this.soundElement.setAttribute('stopwatchTime', integ);

    if (earlyStop) {
      debugLog(`Early stop of media load ${this.soundElement.src} after ${integ}s`);
      return 0;
    }

    return time;
  }
}
