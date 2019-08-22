import {AbstractAudio} from "../api/objects/AbstractAudio";

export class LossProcessor extends AbstractAudio {

    constructor() {
        super();

        this.queueSize = 5120;

        this.minimalQueueSize = this.queueSize;

        const margin = 5;
        const rate = this.defaultConfig.codec.sampleRate;
        const buffer = this.defaultConfig.codec.bufferSize;

        // the perfect rate of packets per second
        this.perfectRate = (~~(rate / buffer)) + 1;

        this.lowestAcceptable = this.perfectRate - margin;
        this.highestAcceptable = this.perfectRate + margin;
    }

    isAcceptable(rate) {
        return rate >= this.lowestAcceptable && rate <= this.highestAcceptable;
    }

    handleMeasurement(measurement) {
        if (this.isAcceptable(measurement)) {
            this.decreaseBufferSize();
        } else {
            this.increaseBufferSize();
        }
    }

    increaseBufferSize() {
        if (this.queueSize < 10240) this.queueSize += 512;
    }

    decreaseBufferSize() {
        if (this.queueSize > this.minimalQueueSize) this.queueSize -= 512;
    }

    getBufferSize() {
        return this.queueSize;
    }

}
