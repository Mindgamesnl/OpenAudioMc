import {Vector3} from "./ThreeJS/Vector3";
import {Quaternion} from "./ThreeJS/Quaternion";

/**
 * After days of struggling, https://github.com/56738 (56738#9296) gave this code to handle
 * complicated math which I don't understand, full credits for this class go to them!
 * Thank you so much.
 */

export class Position {

    constructor(position = new Vector3(), rotation = new Quaternion()) {
        this.position = position;
        this.rotation = rotation;
    }

    static read(data) {
        return new Position(new Vector3(data.posX, data.posY, data.posZ), new Quaternion(data.rotX, data.rotY, data.rotZ, data.rotW));
    }

    lerp(a, b, t) {
        this.position.lerpVectors(a.position, b.position, t);
        this.rotation = Quaternion.slerp(a.rotation, b.rotation, this.rotation, t);
    }

    set(other) {
        this.position.copy(other.position);
        this.rotation.copy(other.rotation);
    }

    // apply to a PannerNode or AudioListener
    applyTo(target) {
        const pos = this.position;
        const forward = new Vector3(0, 0, 1).applyQuaternion(this.rotation);
        const up = new Vector3(0, 1, 0).applyQuaternion(this.rotation);
        if (target.positionX) {
            target.positionX.value = pos.x;
            target.positionY.value = pos.y;
            target.positionZ.value = pos.z;
        }
        else {
            // noinspection JSDeprecatedSymbols
            target.setPosition(pos.x, pos.y, pos.z);
        }
        if (target instanceof PannerNode) {
            if (target.orientationX) {
                target.orientationX.value = forward.x;
                target.orientationY.value = forward.y;
                target.orientationZ.value = forward.z;
            }
            else {
                // noinspection JSDeprecatedSymbols
                target.setOrientation(forward.x, forward.y, forward.z);
            }
        }
        else {
            if (target.forwardX) {
                target.forwardX.value = forward.x;
                target.forwardY.value = forward.y;
                target.forwardZ.value = forward.z;
                target.upX.value = up.x;
                target.upY.value = up.y;
                target.upZ.value = up.z;
            }
            else {
                // noinspection JSDeprecatedSymbols
                target.setOrientation(forward.x, forward.y, forward.z, up.x, up.y, up.z);
            }
        }
    }
}
