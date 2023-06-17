import {Euler} from "../../../util/math/Euler";
import {Quaternion} from "../../../util/math/Quaternion";
import {Position} from "../../../util/math/Position";

export class Player {

    constructor(world, location, pitch, yaw) {
        this.world = world;
        let audioContextType;
        if (typeof window !== 'undefined') {
            audioContextType = window.AudioContext || window.webkitAudioContext;
        }
        this.audioCtx = new audioContextType();
        this.listener = this.audioCtx.listener;

        this.updateLocation(location, pitch, yaw);
    }

    updateLocation(location, pitch, yaw) {
        this.location = location;
        this.pitch = this.toRadians(pitch);
        this.yaw = this.toRadians(this.normalizeYaw(360 - yaw));

        // location already is a Vector3
        const euler = new Euler(this.pitch, this.yaw, 0);
        const quaternion = new Quaternion();
        quaternion.setFromEuler(euler);

        const position = new Position(location, quaternion);
        position.applyTo(this.listener);

        this.world.onLocationUpdate();
    }

    toRadians(degrees) {
        return degrees * (Math.PI / 180);
    }

    normalizeYaw(yaw) {
        // yaw = yaw % 360;
        if (yaw < 0) yaw += 360.0;
        return yaw;
    }

}
