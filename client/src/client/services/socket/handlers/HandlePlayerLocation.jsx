import { WorldModule } from '../../world/WorldModule';
import { Interpolator, MAGIC_SCHEDULE_VALUES } from '../../../util/math/Interpolator';
import { Vector3 } from '../../../util/math/Vector3';

const playerMovementInterpolator = new Interpolator();

export function handlePlayerLocation(data) {
  const { x } = data;
  const { y } = data;
  const { z } = data;
  const { pitch } = data;
  const { yaw } = data;

  playerMovementInterpolator.onMove = (l, p, q) => {
    WorldModule.player.updateLocation(l, p, q);
  };
  playerMovementInterpolator.interpolate(new Vector3(x, y, z), pitch, yaw, MAGIC_SCHEDULE_VALUES.SELF_LOCATION_UPDATES);
}
