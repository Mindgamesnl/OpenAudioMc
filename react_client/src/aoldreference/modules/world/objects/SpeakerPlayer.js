import {Channel} from "../../media/objects/Channel";
import {Sound} from "../../media/objects/Sound";
import {SPEAKER_2D} from "../constants/SpeakerType";
import {SpeakerRenderNode} from "./SpeakerRenderNode";
import {oadebuglog} from "../../../helpers/log";

export class SpeakerPlayer {

    constructor(openAudioMc, source, startInstant) {
        this.id = "SPEAKER__" + source;
        this.openAudioMc = openAudioMc;

        this.speakerNodes = new Map();
        this.source = source;
        this.startInstant = startInstant;
        this.initialized = false;
        this.whenInitialized = [];
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

        createdChannel.addSound(createdMedia);
        openAudioMc.getMediaManager().mixer.addChannel(createdChannel);

        createdMedia.whenInitialized(async () => {
            createdChannel.setChannelVolume(0);
            createdMedia.startDate(this.startInstant, true);
            await createdMedia.finalize()
            createdMedia.setLooping(true);
            createdChannel.setTag(this.id);
            createdChannel.setTag("SPECIAL");
            this.openAudioMc.getMediaManager().mixer.updateCurrent();
            createdMedia.startDate(this.startInstant, true);
            createdMedia.finish();
        })

        this.initialized = true;
    }

    removeSpeakerLocation(id) {
        const node = this.speakerNodes.get(id);
        if (node != null) {
            node.preDelete();
            this.speakerNodes.delete(id);
        }
    }

    updateLocation(closest, world, player) {
        if (closest.type == SPEAKER_2D) {
            this.media.load(this.source, true)
            const distance = closest.getDistance(world, player);
            const volume = this._convertDistanceToVolume(closest.maxDistance, distance);
            if (volume <= 0) {
                // assuming the range got updated so skipping it
                return;
            }
            this.channel.fadeChannel(volume, 100);
        } else {
            if (!this.speakerNodes.has(closest.id)) {
                this.speakerNodes.set(closest.id, new SpeakerRenderNode(
                    closest, world, player, this.media, this.source, this.channel
                ));
            }
        }
    }

    _convertDistanceToVolume(maxDistance, currentDistance) {
        return Math.round(((maxDistance - currentDistance) / maxDistance) * 100);
    }

    remove() {
        if (!this.media.loaded) {
            oadebuglog("WARNING! wanted to stop " + this.id + " but it isn't loaded yet")
        }
        this.openAudioMc.getMediaManager().destroySounds(this.id, false, false, 500, () => {
            // check if it actually cleared, and if not, we should do it ourself
            if (!this.media.destroyed) {
                oadebuglog("Failed to destroy a world sound, so I had to do it again.")
                this.media.destroy();
            } else {
                oadebuglog("It got destroyed successfully")
            }
        });
    }

}