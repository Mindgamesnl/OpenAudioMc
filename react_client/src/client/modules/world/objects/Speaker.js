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

    getDistance(world, player) {
        return player.location.distance(this.location);;
    }
    
}