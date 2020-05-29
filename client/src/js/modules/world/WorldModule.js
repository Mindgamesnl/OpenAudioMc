import {Player} from "./objects/Player";
import {Vector3} from "../../helpers/ThreeJS/Vector3";

export class WorldModule {

    constructor(openAudioMc) {
        this.openAudioMc = openAudioMc;
        this.player = new Player(this, new Vector3(0, 0, 0), 0, 0);

        this.speakers = new Map();
    }

    getSpeakerById(id) {
        return this.speakers.get(id);
    }

    addSpeaker(id, speakerData) {
        this.speakers.set(id, speakerData);
        speakerData.initialize();
    }

    removeSpeaker(id) {
        let speaker = this.getSpeakerById(id);
        if (speaker != null) speaker.onRemove();
        this.speakers.delete(id);
    }

    onLocationUpdate() {
        this.speakers.forEach((speaker, id) => {
            speaker.onPlayerLocationUpdate(this, this.player);
        });
    }

}