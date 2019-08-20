import Resampler from "./libs/xaudio";
import {OpusEncoder} from "./libs/opus";

export class Streamer extends AbstractAudio {

    constructor(config, socket) {
        super();
        navigator.getUserMedia = (navigator.getUserMedia ||
            navigator.webkitGetUserMedia ||
            navigator.mozGetUserMedia ||
            navigator.msGetUserMedia);

        this.config = config;
        this.config.codec = this.config.codec || this.defaultConfig.codec;
        this.sampler = new Resampler(this.audioContext.sampleRate, this.config.codec.sampleRate, 1, this.config.codec.bufferSize);
        this.parentSocket = socket;
        this.encoder = new OpusEncoder(this.config.codec.sampleRate, this.config.codec.channels, this.config.codec.app, this.config.codec.frameDuration);
    }

    _makeStream(onError) {
        navigator.getUserMedia({audio: config.micId}, (stream) => {
            this.stream = stream;
            this.audioInput = this.audioContext.createMediaStreamSource(stream);
            this.gainNode = this.audioContext.createGain();
            this.recorder = this.audioContext.createScriptProcessor(this.config.codec.bufferSize, 1, 1);
            this.recorder.onaudioprocess = function (e) {
                let resampled = _this.sampler.resampler(e.inputBuffer.getChannelData(0));
                let packets = _this.encoder.encode_float(resampled);
                for (let i = 0; i < packets.length; i++) {
                    if (_this.socket.readyState == 1) this.socket.send(packets[i]);
                }
            };
            this.audioInput.connect(this.gainNode);
            this.gainNode.connect(this.recorder);
            this.recorder.connect(this.audioContext.destination);
        }, onError || this.onError);
    }

    start(onError) {
        this.socket = this.parentSocket;
        this.socket.binaryType = 'arraybuffer';

        if (this.socket.readyState == WebSocket.OPEN) {
            this._makeStream(onError);
        } else if (this.socket.readyState == WebSocket.CONNECTING) {
            let _onopen = this.socket.onopen;
            this.socket.onopen = function () {
                if (_onopen) {
                    _onopen();
                }
                this._makeStream(onError);
            }
        } else {
            console.error('Socket is in CLOSED state');
        }

        let _onclose = this.socket.onclose;
        this.socket.onclose = () => {
            if (onclose) {
                onclose();
            }

            if (this.audioInput) {
                this.audioInput.disconnect();
                this.audioInput = null;
            }

            if (this.gainNode) {
                this.gainNode.disconnect();
                this.gainNode = null;
            }

            if (this.recorder) {
                this.recorder.disconnect();
                this.recorder = null;
            }

            if (this.stream != null) {
                this.stream.getTracks().forEach(track => {
                    track.stop();
                });
            }
            console.log('Disconnected from server');
        };
    };

    mute() {
        this.gainNode.gain.value = 0;
        console.log('Mic muted');
    }

    unMute() {
        this.gainNode.gain.value = 1;
        console.log('Mic unmuted');
    }

    onError(e) {
        let error = new Error(e.name);
        error.name = 'NavigatorUserMediaError';
        throw error;
    }

    stop() {
        if (this.audioInput) {
            this.audioInput.disconnect();
            this.audioInput = null;
        }
        if (this.gainNode) {
            this.gainNode.disconnect();
            this.gainNode = null;
        }
        if (this.recorder) {
            this.recorder.disconnect();
            this.recorder = null;
        }

        if (this.stream != null) {
            this.stream.getTracks().forEach(track => {
                track.stop();
            })
        }

        if (!this.parentSocket) {
            this.socket.close();
        }
    }

}
