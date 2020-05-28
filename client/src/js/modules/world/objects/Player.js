export class Player {

    constructor(world, location, pitch, yaw) {
        this.world = world;
        this.updateLocation(location, pitch, yaw);
    }

    updateLocation(location, pitch, yaw) {
        this.location = location;
        this.pitch = pitch;
        this.yaw = yaw;

        this.world.onLocationUpdate();
    }


}