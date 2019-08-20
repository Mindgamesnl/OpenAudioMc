let staticAdudioContext = null;

export function initAudioContext() {
    staticAdudioContext = new (window.AudioContext || window.webkitAudioContext)();
}

export class AbstractAudio {

    constructor() {
        this.defaultConfig = {
            codec: {
                sampleRate: 24000,
                channels: 1,
                app: 2048,
                frameDuration: 2.5,
                bufferSize: 512
            }
        };

        this.audioContext = staticAdudioContext;
    }
}
