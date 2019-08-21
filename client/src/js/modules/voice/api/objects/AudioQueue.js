export class AudioQueue {

    constructor() {
        this.buffer = new Float32Array(0);
    }

    write(inst, newAudio) {
        if (this.length() > 5000) {
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

}
