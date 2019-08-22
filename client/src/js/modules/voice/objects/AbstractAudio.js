let staticAudioContext = null;

export function initAudioContext() {
    staticAudioContext = new (window.AudioContext || window.webkitAudioContext)();
}

export class AbstractAudio {

    constructor() {
        this.defaultConfig = {
            codec: {
                sampleRate: 24000,
                channels: 1,
                app: 2048,
                frameDuration: 20,
                bufferSize: 2048
            }
        };

        this.audioContext = staticAudioContext;
    }
}