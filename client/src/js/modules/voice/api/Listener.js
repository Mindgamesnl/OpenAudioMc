import Resampler from "./libs/xaudio";
import {OpusDecoder} from "./libs/opus";
import {AudioQueue} from "./objects/AudioQueue";
import {AbstractAudio} from "./objects/AbstractAudio";

export class Listener extends AbstractAudio {

    constructor(config, socket) {
        super();
        this.config = this.defaultConfig;
        this.config.codec = this.config.codec || this.defaultConfig.codec;
        this.config.server = this.config.server || this.defaultConfig.server;
        this.sampler = new Resampler(this.config.codec.sampleRate, this.audioContext.sampleRate, 1, this.config.codec.bufferSize);
        this.parentSocket = socket;
        this.decoder = new OpusDecoder(this.config.codec.sampleRate, this.config.codec.channels);
        this.silence = new Float32Array(this.config.codec.bufferSize);
    }

    start() {
        this.audioQueue = new AudioQueue();

        this.scriptNode = this.audioContext.createScriptProcessor(this.config.codec.bufferSize, 1, 1);
        this.scriptNode.onaudioprocess = (e) => {
            if (this.audioQueue.length()) {
                e.outputBuffer.getChannelData(0).set(this.audioQueue.read(this.config.codec.bufferSize));
            } else {
                e.outputBuffer.getChannelData(0).set(this.silence);
            }
        };

        this.gainNode = this.audioContext.createGain();
        this.scriptNode.connect(this.gainNode);
        this.gainNode.connect(this.audioContext.destination);

        this.socket = this.parentSocket;

        this.socket.onmessage = (message) => {
            if (message.data instanceof Blob) {
                let reader = new FileReader();
                reader.onload = () => {
                    this.audioQueue.write(this, this.decoder.decode_float(reader.result));
                };
                reader.readAsArrayBuffer(message.data);
            }
        };

        this.socketKeepAliveTimer = setInterval(() => {
            try {
                if (this.socket.readyState === WebSocket.CLOSED) {
                    clearInterval(this.socketKeepAliveTimer);
                    return;
                }
                this.socket.send('1');
            } catch (e) {
                clearInterval(this.socketKeepAliveTimer);
            }
        }, 1000);
    }

    getVolume() {
        return this.gainNode ? this.gainNode.gain.value : 'Stream not started yet';
    }

    setVolume(value) {
        if (this.gainNode) this.gainNode.gain.value = value;
    }

    stop() {
        this.audioQueue = null;
        this.scriptNode.disconnect();
        this.scriptNode = null;
        this.gainNode.disconnect();
        this.gainNode = null;

        clearInterval(this.socketKeepAliveTimer);

        if (!this.parentSocket) {
            this.socket.close();
        } else {
            this.socket.onmessage = this.parentOnmessage;
        }
    }

}
