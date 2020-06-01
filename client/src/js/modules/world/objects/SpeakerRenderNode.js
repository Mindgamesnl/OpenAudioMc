import {Position} from "../../../helpers/math/Position";

export class SpeakerRenderNode {

    constructor(speaker, world, player, media) {
        // audio pipeline
        // Sound object > Panner Node > Gain Node > Audio Device

        this.pannerNode = player.audioCtx.createPanner();
        this.media = media;

        media.addNode(player, this.pannerNode);

        this.pannerNode.panningModel = 'HRTF';
        this.pannerNode.maxDistance = speaker.maxDistance;
        this.pannerNode.rolloffFactor = 0.9;
        this.pannerNode.distanceModel = "linear";

        const location = speaker.location;
        const position = new Position(location);
        position.applyTo(this.pannerNode);

        this.gainNode = player.audioCtx.createGain();

        // since panner tends to lose volume
        this.gainNode.gain.value = 1.5;

        this.pannerNode.connect(this.gainNode);
        this.gainNode.connect(player.audioCtx.destination);
    }

}