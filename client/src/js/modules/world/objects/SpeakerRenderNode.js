import {Position} from "../../../helpers/math/Position";

export class SpeakerRenderNode {

    constructor(speaker, world, player, media) {
        this.pannerNode = player.audioCtx.createPanner();

        this.media = media;
        media.addNode(player, this.pannerNode);
        this.pannerNode.connect(player.audioCtx.destination);

        this.pannerNode.panningModel = 'HRTF';
        this.pannerNode.maxDistance = speaker.maxDistance;
        this.pannerNode.rolloffFactor = 1;
        this.pannerNode.distanceModel = "exponential";

        const location = speaker.location;
        const position = new Position(location);
        position.applyTo(this.pannerNode);
    }

    unRegister() {
        // this.pannerNode.disconnect();
    }


}