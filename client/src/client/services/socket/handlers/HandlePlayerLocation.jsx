
import {WorldModule} from "../../world/WorldModule";
import {Interpolator, MAGIC_SCHEDULE_VALUES} from "../../../util/math/Interpolator";
import {Vector3} from "../../../util/math/Vector3";

let playerMovementInterpolator = new Interpolator();

export function handlePlayerLocation(data) {
    const x = data.x;
    const y = data.y;
    const z = data.z;
    const pitch = data.pitch;
    const yaw = data.yaw;

    playerMovementInterpolator.onMove = (l, p, y) => {
        WorldModule.player.updateLocation(l, p, y)
    }
    playerMovementInterpolator.interpolate(new Vector3(x, y, z), pitch, yaw, MAGIC_SCHEDULE_VALUES.SELF_LOCATION_UPDATES);
}