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

    // force bind the functions
    this.start = this.start.bind(this);
    this.handleDehydration = this.handleDehydration.bind(this);
    this.stop = this.stop.bind(this);
    this.handleProgress = this.handleProgress.bind(this);

    this.start();

    this.soundElement.addEventListener('canplaythrough', () => {
      this.stop();
    });
    this.soundElement.addEventListener('waiting', this.handleDehydration);
    this.soundElement.addEventListener('progress', this.handleProgress);

    // is ready state already 4?
    if (this.soundElement.readyState === 2) {
      this.start();
      this.stop(true);
    }
  }

  handleProgress() {
    // is ready state already 4?
    if (this.soundElement.readyState === 4) {
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
    debugLog(`Media load waiting state for ${this.soundElement.src}`);
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
    debugLog(`Media load time for ${this.soundElement.src}: ${integ}s`);

    return time;
  }
}
