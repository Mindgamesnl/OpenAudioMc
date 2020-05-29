import {SPEAKER_2D, SPEAKER_3D} from "../constants/SpeakerType";
import {Channel} from "../../media/objects/Channel";
import {Sound} from "../../media/objects/Sound";

export class Speaker {

    constructor(id, source, location, type, maxDistance, startInstant, openAudioMc) {
        this.id = id;
        this.source = source;
        this.location = location;
        this.type = type;
        this.maxDistance = maxDistance;
        this.startInstant = startInstant;
        this.openAudioMc = openAudioMc;

        this.channel = null;
    }

    initialize() {
        // NOOOO SPEAKERS SHOULDN'T INITIALIZE THEMSELFS HERE, THATS THE CONSTRUCTOR
        // huhuhu, mapping go BRRRRRRRR

        // initialize audio stream if i am boring and 2d
        // assuming ill be on its own, forever
        // big sad
        if (this.type == SPEAKER_2D) {
            const createdChannel = new Channel(this.id);
            this.channel = createdChannel;
            const createdMedia = new Sound(this.source);
            createdMedia.openAudioMc = this.openAudioMc;
            createdMedia.setOa(this.openAudioMc);
            createdChannel.mixer = this.openAudioMc.getMediaManager().mixer;

            createdMedia.startDate(this.startInstant, true);
            createdMedia.finalize().then(ready => {
                createdMedia.startDate(this.startInstant, true);
                this.openAudioMc.getMediaManager().mixer.addChannel(createdChannel);
                createdChannel.addSound(createdMedia);
                createdChannel.setChannelVolume(0);
                createdMedia.setLooping(true);
                createdChannel.setTag(this.id);
                createdChannel.setTag("SPECIAL");
                createdChannel.fadeChannel(5, 100);
                this.openAudioMc.getMediaManager().mixer.updateCurrent();
                createdMedia.finish();
            });
        }
    }

    onPlayerLocationUpdate(world, player) {
        if (this.type == SPEAKER_3D) {
            // Don't do anything, since the player changes the volume
        } else if (this.type == SPEAKER_2D) {
            // calculate distance and update volume
            const distance = player.location.distance(this.location);
            const volume = this._convertDistanceToVolume(this.maxDistance, distance);
            if (volume < 0) {
                // assuming the range got updated so skipping it
                return;
            }
            this.channel.fadeChannel(volume, 100);
        }
    }

    onRemove() {
        // goodbye world
        console.log("Killing myself ")
        if (this.type == SPEAKER_2D) {
            this.openAudioMc.getMediaManager().destroySounds(this.id, false);
        }
    }

    _convertDistanceToVolume(maxDistance, currentDistance) {
        return Math.round(((maxDistance - currentDistance) / maxDistance) * 100);
    }
    
}