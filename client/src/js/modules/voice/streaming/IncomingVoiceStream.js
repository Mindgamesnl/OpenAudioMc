import {oalog} from "../../../helpers/log";
import {Vector3} from "../../../helpers/math/Vector3";
import {Position} from "../../../helpers/math/Position";

export class IncomingVoiceStream {

    constructor(openAudioMc, server, streamKey, peerStreamKey, volume) {
        this.openAudioMc = openAudioMc;
        this.server = server;
        this.streamKey = streamKey;
        this.peerStreamKey = peerStreamKey;
        this.volume = volume;
        this.volBooster = 1.2;
    }

    start(whenFinished) {
        // request stream
        let prom = this.openAudioMc.voiceModule.peerManager.requestStream(this.peerStreamKey);

        prom.onFinish((stream) => {
            oalog("Finished the promise! got " + stream)

            const ctx = this.openAudioMc.world.player.audioCtx;
            this.setVolume(this.volume)
            this.gainNode = ctx.createGain();
            this.audio = new Audio();
            this.audio.srcObject = stream;
            this.track = this.audio;
            this.gainNode.gain.value = (this.volume / 100) * this.volBooster;

            this.audio.onloadedmetadata = () => {
                oalog("Playing voice from " + this.peerStreamKey)
                const source = ctx.createMediaStreamSource(this.audio.srcObject);
                this.audio.play().then(console.log).catch(console.error);
                this.audio.muted = true;

                if (this.openAudioMc.voiceModule.surroundSwitch.isOn()) {
                    const gainNode = this.gainNode;
                    this.pannerNode = ctx.createPanner();
                    this.pannerNode.panningModel = 'HRTF';
                    this.pannerNode.maxDistance = this.openAudioMc.voiceModule.blocksRadius;
                    this.pannerNode.rolloffFactor = 1;
                    this.pannerNode.distanceModel = "linear";
                    this.setLocation(this.x, this.y, this.z, true);
                    source.connect(gainNode);
                    gainNode.connect(this.pannerNode);
                    this.pannerNode.connect(ctx.destination);
                } else {
                    const gainNode = this.gainNode;
                    source.connect(gainNode);
                    gainNode.connect(ctx.destination);
                }
            }

            whenFinished();
        });

        prom.onReject((error) => {
            oalog("Stream for " + this.peerStreamKey + " got denied: " + error)
        })
    }

    setLocation(x, y, z, update) {
        if (!this.openAudioMc.voiceModule.useSurround) return;
        if (update && this.pannerNode != null) {
            const position = new Position(new Vector3(
                this.x,
                this.y,
                this.z
            ));
            position.applyTo(this.pannerNode);
        }
        this.x = x;
        this.y = y;
        this.z = z;
    }

    setVolume(volume) {
        this.volume = volume;
        if (this.gainNode != null) {
            this.gainNode.gain.value = (this.volume / 100) * this.volBooster;
        }
    }

    stop() {
        oalog("Closing voice link with " + this.peerStreamKey);
        this.audio.srcObject = null
        if (this.track != null) {
            this.track.pause()
        }
    }

}
