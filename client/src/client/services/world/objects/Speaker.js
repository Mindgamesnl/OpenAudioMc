export class Speaker {
  constructor(id, source, location, type, maxDistance, startInstant, doLoop = true, doPickup = true) {
    this.id = id;
    this.source = source;
    this.location = location;
    this.type = type;
    this.maxDistance = maxDistance;
    this.startInstant = startInstant;
    this.doLoop = doLoop;
    this.doPickup = doPickup;

    this.channel = null;
  }

  getDistance(world, player) {
    return player.location.distance(this.location);
  }
}
