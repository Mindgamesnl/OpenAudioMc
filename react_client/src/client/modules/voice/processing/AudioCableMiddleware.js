import {AbstractMicMiddleware} from "./AbstractMicMiddleware";
import {PitchShifter} from "./PitchShifter";

export class AudioCableMiddleware extends AbstractMicMiddleware {

    constructor() {
        super()
    }

    unlink() {
        this.target.disconnect();
    }

    link(context, from, to) {
        this.target = from;
        from.connect(to)
    }
}