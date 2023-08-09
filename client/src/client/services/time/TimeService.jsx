import { feedDebugValue } from '../debugging/DebugService';
import { DebugStatistic } from '../debugging/DebugStatistic';

export const TimeService = new class ITimeService {
  constructor() {
    this.isServerAhead = false;
    this.msOffset = 0;
    this.hasSynced = false;
  }

  sync(serverTime) {
    // sever date and time
    const serverDate = new Date(serverTime);

    // local date and time
    const localDate = new Date();

    // diff in milli seconds
    this.isServerAhead = (serverDate.getTime() > localDate.getTime());

    // relative timing for later calculation
    if (this.isServerAhead) {
      this.msOffset = serverDate.getTime() - localDate.getTime();
    } else {
      this.msOffset = localDate.getTime() - serverDate.getTime();
    }

    feedDebugValue(DebugStatistic.TIME_OFFSET_SECONDS, this.msOffset / 1000);

    this.hasSynced = true;
  }

  getPredictedTime() {
    if (!this.hasSynced) new Date().getTime();
    // calculate the time based on the offset and which is ahead
    const time = new Date().getTime();
    return new Date(this.isServerAhead ? time + this.msOffset : time - this.msOffset);
  }
}();
