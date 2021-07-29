import {Position} from "../../../helpers/math/Position";

export class SpeakerRenderNode {

    constructor(speaker, world, player, media, source, channel) {
        // audio pipeline
        // Sound object > Panner Node > Gain Node > Audio Device

        this.pannerNode = player.audioCtx.createPanner();
        this.media = media;


        media.load(source, false)
            .then(() => {
                channel.fadeChannel(100, 100);
                media.addNode(player, this.pannerNode);

                this.pannerNode.panningModel = 'HRTF';
                this.pannerNode.rolloffFactor = 0.9;
                this.pannerNode.distanceModel = "linear";
                this.pannerNode.coneOuterGain = 0.7;
                this.pannerNode.coneInnerAngle = 120;
                this.pannerNode.maxDistance = speaker.maxDistance;

                const location = speaker.location;
                const position = new Position(location);
                position.applyTo(this.pannerNode);

                this.pannerNode.connect(player.audioCtx.destination);
            })
    }

}
