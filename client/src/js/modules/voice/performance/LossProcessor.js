import {AbstractAudio} from "../objects/AbstractAudio";

export class LossProcessor extends AbstractAudio {

    constructor() {
        super();

        this.queueSize = 5120;
        this.unstableSeconds = 0;
        this.stableSeconds = 0;

        this.minimalQueueSize = this.queueSize;

        const margin = 5;
        const rate = this.defaultConfig.codec.sampleRate;
        const buffer = this.defaultConfig.codec.bufferSize;

        // the perfect rate of packets per second
        // this.perfectRate = ((~~(rate / buffer)) + 4) * 2;
        this.perfectRate = 50;

        this.lowestAcceptable = this.perfectRate - margin;
        this.highestAcceptable = this.perfectRate + margin;
    }

    isAcceptable(rate) {
        return rate >= this.lowestAcceptable && rate <= this.highestAcceptable;
    }

    handleMeasurement(measurement) {
        if (this.isAcceptable(measurement)) {
            this.unstableSeconds = 0;
            // if it has been stable for 5 seconds or longer, try to decrease the buffer size slowly
            if (this.stableSeconds >= 5) {
                this.decreaseBufferSize();
                // reset to 3 to retry in 4 seconds
                this.stableSeconds = 3;
            }
            this.stableSeconds++;
        } else {
            this.stableSeconds = 0;
            // if it has been unstable for 5 seconds or longer, do something about it
            if (this.unstableSeconds >= 5) {
                this.increaseBufferSize();
            }
            this.unstableSeconds++;
        }
    }

    increaseBufferSize() {
        if (this.queueSize < 10240) {
            this.queueSize += 512;
            console.log('Buffer size increased and is now ' + this.queueSize);
        }
    }

    decreaseBufferSize() {
        if (this.queueSize > this.minimalQueueSize) {
            this.queueSize -= 512;
            console.log('Buffer size decreased and is now ' + this.queueSize);
        }
    }

    getBufferSize() {
        return this.queueSize;
    }

}
