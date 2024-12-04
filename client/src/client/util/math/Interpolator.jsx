/* eslint-disable no-underscore-dangle */
import { Vector3 } from './Vector3';
import { getGlobalState } from '../../../state/store';

export const MAGIC_SCHEDULE_VALUES = {
  VC_LOCATION_UPDATES: 150, // 3 * 50 simplified
  SELF_LOCATION_UPDATES: 100, // 2 * 50 simplified
};

export class Interpolator {
  constructor(startLocation = new Vector3(0, 0, 0), pitch = 0, yaw = 0) {
    this.hasData = false;
    this.location = startLocation;
    this.target = startLocation;
    this.isRunning = false;
    this.currentTask = -1;
    this.pitch = pitch;
    this.yaw = yaw;
    this.onMove = () => {};
    // Cache for vector calculations
    this._stepBase = new Vector3(0, 0, 0);
  }

  interpolate(nextTarget, pitch, yaw, duration) {
    // Quick returns for special cases
    const { interpolationEnabled } = getGlobalState().settings;
    if (!interpolationEnabled || !this.hasData) {
      this.location = nextTarget;
      this.pitch = pitch;
      this.yaw = yaw;
      this.onMove(this.location, this.pitch, this.yaw);

      if (!this.hasData) {
        this.hasData = true;
      }
      return;
    }

    // Clear existing interpolation
    if (this.isRunning) {
      clearInterval(this.currentTask);
    }

    // Setup interpolation
    this.isRunning = true;
    this.target = nextTarget;

    // eslint-disable-next-line no-bitwise
    const steps = duration / 3 | 0;
    const loop = duration / steps;

    // Precalculate step values
    // Reuse existing Vector3 instance instead of creating new ones
    const dx = (nextTarget.x - this.location.x) / steps;
    const dy = (nextTarget.y - this.location.y) / steps;
    const dz = (nextTarget.z - this.location.z) / steps;
    this._stepBase.x = dx;
    this._stepBase.y = dy;
    this._stepBase.z = dz;

    // Precalculate rotation values
    const yawDiff = this.getShortestYawDistance(
      this.normalizeYaw(this.yaw),
      this.normalizeYaw(yaw),
    );
    const yawStep = yawDiff / steps;
    const pitchStep = (pitch - this.pitch) / steps;

    let step = 0;

    const h = () => {
      step++;

      if (step >= steps || !this.isRunning) {
        clearInterval(this.currentTask);
        this.isRunning = false;
        this.location = nextTarget; // Use final target directly
        this.pitch = pitch;
        this.yaw = yaw;
        this.onMove(this.location, this.pitch, this.yaw);
        return;
      }

      // Update position using cached step values
      this.location = this.location.add(dx, dy, dz);

      // Update rotations
      this.pitch += pitchStep;
      this.yaw = this.normalizeYaw(this.yaw + yawStep);

      this.onMove(this.location, this.pitch, this.yaw);
    };

    h();
    this.currentTask = setInterval(h, loop);
  }

  normalizeYaw(yaw) {
    return ((yaw % 360) + 360) % 360;
  }

  getShortestYawDistance(current, target) {
    let diff = target - current;
    if (diff > 180) diff -= 360;
    if (diff < -180) diff += 360;
    return diff;
  }
}
