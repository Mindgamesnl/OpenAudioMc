import {Vector3} from "../../../helpers/math/Vector3";

export function handlePlayerLocation(openAudioMc, data) {
    const x = data.x;
    const y = data.y;
    const z = data.z;
    const pitch = data.pitch;
    const yaw = data.yaw;

    openAudioMc.world.player.updateLocation(new Vector3(x, y, z), pitch, yaw);
}