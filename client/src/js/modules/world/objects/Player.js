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
        this.pitch = pitch;
        this.yaw = yaw;

        // location already is a Vector3
        const euler = new Euler(this.yaw, this.pitch, 0, "XYZ");
        const quaternion = new Quaternion();
        quaternion.setFromEuler(euler);

        const position = new Position(location, quaternion);
        position.applyTo(this.listener);

        this.world.onLocationUpdate();
    }

}