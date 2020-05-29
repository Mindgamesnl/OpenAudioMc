import {Channel} from "../../media/objects/Channel";
import {Sound} from "../../media/objects/Sound";
import {SPEAKER_2D} from "../constants/SpeakerType";

export class SpeakerPlayer {

    constructor(openAudioMc, source, startInstant) {
        this.id = "SPEAKER__" + source;
        this.openAudioMc = openAudioMc;

        const createdChannel = new Channel(this.id);
        this.channel = createdChannel;
        const createdMedia = new Sound(source);
        this.media = createdMedia;
        createdMedia.openAudioMc = openAudioMc;
        createdMedia.setOa(openAudioMc);
        createdChannel.mixer = this.openAudioMc.getMediaManager().mixer;

        createdMedia.startDate(startInstant, true);
        createdMedia.finalize().then(ready => {
            createdMedia.startDate(startInstant, true);
            openAudioMc.getMediaManager().mixer.addChannel(createdChannel);
            createdChannel.addSound(createdMedia);
            createdChannel.setChannelVolume(0);
            createdMedia.setLooping(true);
            createdChannel.setTag(this.id);
            createdChannel.setTag("SPECIAL");
            this.openAudioMc.getMediaManager().mixer.updateCurrent();
            createdMedia.finish();

            // createdChannel.fadeChannel(5, 100);
        });
    }

    updateLocation(closest, world, player) {
        if (closest.type == SPEAKER_2D) {
            const distance = closest.getDistance(world, player);
            const volume = this._convertDistanceToVolume(closest.maxDistance, distance);
            if (volume < 0) {
                // assuming the range got updated so skipping it
                return;
            }
            this.channel.fadeChannel(volume, 100);
        } else {
            // fancy 3d shit goes here
        }
    }

    _convertDistanceToVolume(maxDistance, currentDistance) {
        return Math.round(((maxDistance - currentDistance) / maxDistance) * 100);
    }

    remove() {
        this.openAudioMc.getMediaManager().destroySounds(this.id, false);
    }

}