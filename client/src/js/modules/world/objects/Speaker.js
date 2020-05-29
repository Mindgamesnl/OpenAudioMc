import {SPEAKER_2D, SPEAKER_3D} from "../constants/SpeakerType";

export class Speaker {

    constructor(id, source, location, type, maxDistance) {
        this.id = id;
        this.source = source;
        this.location = location;
        this.type = type;
        this.maxDistance = maxDistance;
    }

    initialize() {
        // NOOOO SPEAKERS SHOULDN'T INITIALIZE THEMSELFS HERE, THATS THE CONSTRUCTOR
        // huhuhu, mapping go BRRRRRRRR
    }

    onPlayerLocationUpdate(world, player) {
        if (this.type == SPEAKER_3D) {
            // Don't do anything, since the player changes the volume
        } else if (this.type == SPEAKER_2D) {
            // calculate distance and update volume
            const distance = player.location.distance(this.location);
            const volume = this._convertDistanceToVolume(this.maxDistance, distance);

            console.log("My volume updated to " + volume);
        }
    }

    onRemove() {
        // goodbye world
        console.log("Killing myself " + JSON.stringify(this))
    }

    _convertDistanceToVolume(maxDistance, currentDistance) {
        return Math.round(((maxDistance - currentDistance) / maxDistance) * 100);
    }
    
}