export class Speaker {

    constructor(id, source, location, type, maxDistance, startInstant) {
        this.id = id;
        this.source = source;
        this.location = location;
        this.type = type;
        this.maxDistance = maxDistance;
        this.startInstant = startInstant;

        this.channel = null;
    }

    getDistance(world, player) {
        return player.location.distance(this.location);;
    }
    
}