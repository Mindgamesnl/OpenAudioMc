import {oalog} from "../../../helpers/log";
import {Vector3} from "../../../helpers/math/Vector3";
import {Position} from "../../../helpers/math/Position";
import {Hark} from "../../../helpers/libs/hark.bundle";

export class IncomingVoiceStream {

    constructor(openAudioMc, server, streamKey, peerStreamKey, volume, uiInst) {
        this.openAudioMc = openAudioMc;
        this.server = server;
        this.streamKey = streamKey;
        this.peerStreamKey = peerStreamKey;
        this.volume = volume;
        this.volBooster = 1.2;
        this.uiInst = uiInst;
        this.harkEvents = null;
    }

    start(whenFinished) {
        // request stream
        let prom = this.openAudioMc.voiceModule.peerManager.requestStream(this.peerStreamKey);

        prom.onFinish((stream) => {
            const ctx = this.openAudioMc.world.player.audioCtx;
            this.setVolume(this.volume)
            this.gainNode = ctx.createGain();
            this.audio = new Audio();
            this.audio.autoplay = true
            this.audio.srcObject = stream;
            this.gainNode.gain.value = (this.volume / 100) * this.volBooster;
            window.debugAudio = this.audio
            this.audio.muted = true
            const source = ctx.createMediaStreamSource(this.audio.srcObject);

            this.harkEvents = Hark(stream, {})
            this.harkEvents.setThreshold(-75);

            this.harkEvents.on('speaking', () => {
                this.uiInst.setVisuallyTalking(true)
            });

            this.harkEvents.on('stopped_speaking', () => {
                this.uiInst.setVisuallyTalking(false)
            });

            this.audio.muted = true;
            if (this.openAudioMc.voiceModule.surroundSwitch.isOn()) {
                const gainNode = this.gainNode;
                this.pannerNode = ctx.createPanner();
                this.pannerNode.maxDistance = this.openAudioMc.voiceModule.blocksRadius;
                this.pannerNode.panningModel = 'HRTF';
                this.pannerNode.rolloffFactor = 0.9;
                this.pannerNode.distanceModel = "linear";
                this.pannerNode.coneOuterGain = 0.7;
                this.pannerNode.coneInnerAngle = 120;
                this.setLocation(this.x, this.y, this.z, true);
                source.connect(gainNode);
                gainNode.connect(this.pannerNode);
                this.pannerNode.connect(ctx.destination);
            } else {
                const gainNode = this.gainNode;
                source.connect(gainNode);
                gainNode.connect(ctx.destination);
            }

            this.audio.play()
                .then(result => {
                    // console.log("Started from the promise", result)
                })
                .catch(error => {
                    console.log("Denied from promise", error)
                });

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
        } else if (update) {
            oalog("Warning, attempted to update a peer location while the panner node is nil")
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
        if (this.audio != null) {
            this.audio.pause()
            this.audio.src = null;
            this.audio.srcObject = null;
            this.gainNode.gain.value = 0;
        }
        if (this.harkEvents != null) {
            this.harkEvents.stop()
        }
    }

}
