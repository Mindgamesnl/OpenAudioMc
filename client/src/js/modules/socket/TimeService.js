import {oalog} from "../../helpers/log";

export class TimeService {

    constructor() {
        this.isServerAhead = false;
        this.msOffset = 0;
        this.hasSynced = false;
    }

    sync(serverTime, serverLocale) {
        // sever date and time
        let serverDate = new Date(serverTime);

        // local date and time
        let localDate = new Date();

        // diff in milli seconds
        this.isServerAhead = (serverDate.getTime() > localDate.getTime());

        // relative timing for later calculation
        if (this.isServerAhead) {
            this.msOffset = serverDate.getTime() - localDate.getTime();
        } else {
            this.msOffset = localDate.getTime() - serverDate.getTime();
        }

        this.hasSynced = true;
    }

    getPredictedTime() {
        if (!this.hasSynced) new Date().getTime();
        // calculate the time based on the offset and which is ahead
        let time = new Date().getTime();
        return new Date(this.isServerAhead ? time + this.msOffset : time - this.msOffset);
    }

}

Date.prototype.addHours = function(h) {
    this.setTime(this.getTime() + (h*60*60*1000));
    return this;
}