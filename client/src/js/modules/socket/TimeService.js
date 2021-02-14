import {oalog} from "../../helpers/log";

export class TimeService {

    constructor() {
        this.isServerAhead = false;
        this.msOffset = 0;
        this.hasSynced = false;
        this.lastRecordedPing = 0;
    }

    sync(serverTime, serverLocale) {
        // sever date and time
        this.serverLocale = serverLocale;
        let serverDate = new Date(serverTime);

        // local date and time
        let localDate = new Date();

        // diff in milli seconds
        this.isServerAhead = (serverDate.getTime() > localDate.getTime());

        // relative timing for later calculation
        this.msOffset = (this.isServerAhead ? (serverDate.getTime() - localDate.getTime()) : (localDate.getTime() - serverDate.getTime()));
        this.hasSynced = true;
    }

    localizeTime(time) {
        if (!this.hasSynced) new Date().getTime();
        let delay = (this.getPredictedTime().getTime() - time) / 1000;
        this.lastRecordedPing = delay * 1000;
        this.onPing()
        return delay;
    }

    onPing() {
        oalog("Current round trip time is " + this.lastRecordedPing + "MS")
    }

    getPredictedTime() {
        if (!this.hasSynced) new Date().getTime();
        // calculate the time based on the offset and which is ahead
        let time = new Date().getTime();
        return new Date(this.isServerAhead ? time + this.msOffset : time - this.msOffset);
    }

}
