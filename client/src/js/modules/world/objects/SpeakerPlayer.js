import {Channel} from "../../media/objects/Channel";
import {Sound} from "../../media/objects/Sound";
import {SPEAKER_2D} from "../constants/SpeakerType";
import {SpeakerRenderNode} from "./SpeakerRenderNode";

export class SpeakerPlayer {

    constructor(openAudioMc, source, startInstant) {
        this.id = "SPEAKER__" + source;
        this.openAudioMc = openAudioMc;

        this.speakerNodes = new Map();
        this.source = source;
        this.startInstant = startInstant;
    }

    async initialize() {
        const createdChannel = new Channel(this.id);
        createdChannel.trackable = true;
        this.channel = createdChannel;
        const createdMedia = new Sound(this.source);
        this.media = createdMedia;
        createdMedia.openAudioMc = openAudioMc;
        createdMedia.setOa(openAudioMc);
        createdChannel.mixer = this.openAudioMc.getMediaManager().mixer;

        await createdMedia.load(this.source)

        createdChannel.addSound(createdMedia);
        createdChannel.setChannelVolume(0);
        createdMedia.startDate(this.startInstant, true);
        await createdMedia.finalize()
        openAudioMc.getMediaManager().mixer.addChannel(createdChannel);
        createdMedia.setLooping(true);
        createdChannel.setTag(this.id);
        createdChannel.setTag("SPECIAL");
        this.openAudioMc.getMediaManager().mixer.updateCurrent();
        createdMedia.startDate(this.startInstant, true);
        createdMedia.finish();
    }

    removeSpeakerLocation(id) {
        const node = this.speakerNodes.get(id);
        if (node != null) {
            this.speakerNodes.delete(id);
        }
    }

    updateLocation(closest, world, player) {
        if (closest.type == SPEAKER_2D) {
            const distance = closest.getDistance(world, player);
            const volume = this._convertDistanceToVolume(closest.maxDistance, distance);
            if (volume <= 0) {
                // assuming the range got updated so skipping it
                return;
            }
            this.channel.fadeChannel(volume, 100);
        } else {
            if (!this.speakerNodes.has(closest.id)) {
                this.channel.fadeChannel(100, 100);
                this.speakerNodes.set(closest.id, new SpeakerRenderNode(
                    closest, world, player, this.media
                ));
            }
        }
    }

    _convertDistanceToVolume(maxDistance, currentDistance) {
        return Math.round(((maxDistance - currentDistance) / maxDistance) * 100);
    }

    remove() {
        this.openAudioMc.getMediaManager().destroySounds(this.id, false);
    }

}