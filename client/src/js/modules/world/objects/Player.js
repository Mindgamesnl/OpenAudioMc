import {Euler} from "../../../helpers/ThreeJS/Euler";
import {Quaternion} from "../../../helpers/ThreeJS/Quaternion";
import {Position} from "../../../helpers/Position";

export class Player {

    constructor(world, location, pitch, yaw) {
        this.world = world;
        this.audioContext = window.AudioContext || window.webkitAudioContext;
        this.audioCtx = new AudioContext();
        this.listener = this.audioCtx.listener;

        this.updateLocation(location, pitch, yaw);
    }

    updateLocation(location, pitch, yaw) {
        this.location = location;
        this.pitch = this.degrees_to_radians(pitch);
        this.yaw = this.degrees_to_radians(this.normalizeYaw(yaw - 180));

        // location already is a Vector3
        const euler = new Euler(this.pitch, this.yaw, 0, "XYZ");
        const quaternion = new Quaternion();
        quaternion.setFromEuler(euler);

        const position = new Position(location, quaternion);
        position.applyTo(this.listener);

        this.world.onLocationUpdate();
    }

    degrees_to_radians(degrees) {
        var pi = Math.PI;
        return degrees * (pi / 180);
    }

    normalizeYaw(yaw) {
        yaw = yaw % 360;
        if (yaw < 0) yaw += 360.0;
        return yaw;
    }

}