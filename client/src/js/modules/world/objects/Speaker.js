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
    }

    onPlayerLocationUpdate(world, player) {
        // not anything, really
    }

    getDistance(world, player) {
        return player.location.distance(this.location);;
    }

    onRemove() {
        // still nothing, but nice to have
    }
    
}