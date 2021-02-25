import {oalog} from "../../../helpers/log";

export class PromisedChannel {

    constructor() {
        this.whenFinished = () => {oalog("A promised channel got finished before it got used")}
        this.whenRejected = () => {oalog("A promised channel got finished before it got used")}

        this.error = null;
        this.payload = null;
    }

    onFinish(f) {
        if (this.payload != null) {
            f(this.payload)
            return
        }
        this.whenFinished = f;
    }

    onReject(f) {
        if (this.error != null) {
            f(this.error)
            return
        }
        this.whenRejected = f
    }

    handleData(e) {
        this.payload = e;
        this.whenFinished(e)
    }

    handleError(e) {
        this.error = e;
        this.whenRejected(e)
    }

}
