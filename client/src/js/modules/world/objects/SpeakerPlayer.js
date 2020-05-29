import {Channel} from "../../media/objects/Channel";
import {Sound} from "../../media/objects/Sound";
import {SPEAKER_2D, SPEAKER_3D} from "../constants/SpeakerType";
import {Quaternion} from "../../../helpers/ThreeJS/Quaternion";
import {Position} from "../../../helpers/Position";

export class SpeakerPlayer {

    constructor(openAudioMc, source, startInstant) {
        this.id = "SPEAKER__" + source;
        this.openAudioMc = openAudioMc;
        this.lastUsedMode = SPEAKER_2D;

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
            createdChannel.setChannelVolume(100);
            createdMedia.setLooping(true);
            createdChannel.setTag(this.id);
            createdChannel.setTag("SPECIAL");
            this.openAudioMc.getMediaManager().mixer.updateCurrent();
            createdMedia.finish();
        });
    }

    updateLocation(closest, world, player) {
        if (closest.type != this.lastUsedMode) {
            // adapt mode change
            if (closest.type == SPEAKER_2D) {
                // remove spatial audio stuff
            }

            if (closest.type == SPEAKER_3D) {
                // inject spatial audio stuff
                // create panner node
                const player = this.openAudioMc.world.player;
                this.pannerNode = player.audioCtx.createPanner();

                this.media.addNode(player, this.pannerNode);
                this.pannerNode.connect(player.audioCtx.destination);


                this.pannerNode.panningModel = 'HRTF';
                this.pannerNode.maxDistance = closest.maxDistance;
                this.pannerNode.rolloffFactor = 1;
                this.pannerNode.distanceModel = "exponential";
            }
            this.lastUsedMode = closest.type;
        }

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
            this.channel.setChannelVolume(100);
            this.channel.fadeChannel(volume, 100);
            const location = closest.location;
            const position = new Position(location);
            position.applyTo(this.pannerNode);
        }
    }

    _convertDistanceToVolume(maxDistance, currentDistance) {
        return Math.round(((maxDistance - currentDistance) / maxDistance) * 100);
    }

    remove() {
        this.openAudioMc.getMediaManager().destroySounds(this.id, false);
    }

}