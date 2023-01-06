import {Position} from "../../../helpers/math/Position";
import {applyPannerSettings, untrackPanner} from "../../settings/SettingsManager";
import {oalog} from "../../../helpers/log";

export class SpeakerRenderNode {

    constructor(speaker, world, player, media, source, channel) {
        // audio pipeline
        // Sound object > Panner Node > Gain Node > Audio Device

        this.pannerNode = player.audioCtx.createPanner();
        this.media = media;
        this.pannerId = null;

        media.load(source, false)
            .then(() => {
                channel.fadeChannel(100, 100);
                media.addNode(player, this.pannerNode);

                this.pannerId = applyPannerSettings(this.pannerNode, speaker.maxDistance);

                const location = speaker.location;
                const position = new Position(location);
                position.applyTo(this.pannerNode);

                this.pannerNode.connect(player.audioCtx.destination);
            })
    }

    preDelete() {
        oalog("Untracking " + this.pannerId)
        untrackPanner(this.pannerId)
    }

}
