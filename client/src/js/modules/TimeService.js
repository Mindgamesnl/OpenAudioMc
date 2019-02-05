class TimeService {

    constructor() {
        this.isServerAhead = false;
        this.msOffset = 0;
    }

    sync(serverTime, serverLocale) {
        //sever date and time
        let serverDate = new Date(serverTime);

        //local date and time
        let localUnixDate = new Date().getTime();

        //server locale is the time zone offset in hours, we want to take that in account
        //we do this by also setting the offset to the local time/date
        //the offset is always positive, this is handled by the server
        localUnixDate += (serverLocale * 60 * 60 * 1000);

        let localDate = new Date(localUnixDate);

        //diff in milli seconds
        this.isServerAhead = (serverDate.getTime() > localDate.getTime());

        //relative timing for later calculation
        this.msOffset = (this.isServerAhead ? (serverDate.getTime() - localDate.getTime()) : (localDate.getTime() - serverDate.getTime()));
    }

    getPredictedTime() {
        //calculate the time based on the offset and which is ahead
        return this.isServerAhead
            ?
            new Date(new Date().getTime() + this.msOffset)
            :
            new Date(new Date().getTime() - this.msOffset);
    }

}
