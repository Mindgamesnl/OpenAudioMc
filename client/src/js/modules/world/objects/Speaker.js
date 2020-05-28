import {Vector3} from "../../../helpers/ThreeJS/Vector3";
import {SPEAKER_2D, SPEAKER_3D} from "../constants/SpeakerType";

export class Speaker {

    constructor(id, source, location, type) {
        if (!(id instanceof String)) throw new Error("Argument 1 must be an id");
        if (!(source instanceof String)) throw new Error("Argument 2 must be a source");
        if (!(location instanceof Vector3)) throw new Error("Argument 3 must be a Vector");
        if (!(type == SPEAKER_2D || type == SPEAKER_3D)) throw new Error("A speaker must be 2d or 3d");

        this.id = id;
        this.source = source;
        this.location = location;
        this.type = type;
    }

    onPlayerLocationUpdate(world, player) {
        if (this.type == SPEAKER_3D) {
            // Don't do anything, since the player changes the volume
        } else if (this.type == SPEAKER_2D) {
            // calculate distance and update volume
        }
    }

    onRemove() {
        // goodbye world
    }
    
}