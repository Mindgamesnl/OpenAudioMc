export class Speaker {
  constructor(id, source, location, type, maxDistance, startInstant, doLoop = true, doPickup = true, cancelRegions = false) {
    this.id = id;
    this.source = source;
    this.location = location;
    this.type = type;
    this.maxDistance = maxDistance;
    this.startInstant = startInstant;
    this.doLoop = doLoop;
    this.doPickup = doPickup;
    this.channel = null;
    this.cancelRegions = cancelRegions;
  }

  getDistance(world, player) {
    return player.location.distance(this.location);
  }
}
