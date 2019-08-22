import {LossProcessor} from "../performance/LossProcessor";
import {TPSCounter} from "../performance/TPSCounter";

export class AudioQueue {

    constructor() {
        this.buffer = new Float32Array(0);
        this.processor = new LossProcessor();

        this.tickTimer = new TPSCounter((measurement) => {
            this.processor.handleMeasurement(measurement);
        });
    }

    tick() {
        this.tickTimer.tick();
    }

    write(inst, newAudio) {
        if (this.length() > this.processor.getBufferSize()) {
            console.log("Too much delay. Clearing buffer");
            this.buffer = new Float32Array(0);
        }

        let currentQLength = this.buffer.length;
        newAudio = inst.sampler.resampler(newAudio);
        let newBuffer = new Float32Array(currentQLength + newAudio.length);
        newBuffer.set(this.buffer, 0);
        newBuffer.set(newAudio, currentQLength);
        this.buffer = newBuffer;
    }

    read(nSamples) {
        let samplesToPlay = this.buffer.subarray(0, nSamples);
        this.buffer = this.buffer.subarray(nSamples, this.buffer.length);
        return samplesToPlay;
    }

    length() {
        return this.buffer.length;
    }

    stop() {
        this.tickTimer.stop();
    }

}
