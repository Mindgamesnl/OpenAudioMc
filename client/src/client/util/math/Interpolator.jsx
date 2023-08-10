import { Vector3 } from './Vector3';
import { getGlobalState } from '../../../state/store';

export const MAGIC_SCHEDULE_VALUES = {
  VC_LOCATION_UPDATES: 3 * 50,
  SELF_LOCATION_UPDATES: 2 * 50,
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
  }

  interpolate(nextTarget, pitch, yaw, duration) {
    if (!getGlobalState().settings.interpolationEnabled) {
      this.location = nextTarget;
      this.pitch = pitch;
      this.yaw = yaw;
      this.onMove(this.location, this.pitch, this.yaw);
    }

    if (!this.hasData) {
      this.location = nextTarget;
      this.pitch = pitch;
      this.yaw = yaw;
      this.hasData = true;
      this.onMove(this.location, this.pitch, this.yaw);
      return;
    }

    // do we already have a task? yes? well, skip it
    if (this.isRunning) {
      clearInterval(this.currentTask);
      this.isRunning = false;
      this.location = this.target;
    }

    this.isRunning = true;
    this.target = nextTarget;
    const steps = duration / 3;
    const loop = duration / steps;

    const vStepSize = this.target.clone().sub(this.location).divide(steps);
    const pStepSize = (this.pitch - pitch) / steps;

    // handle yaw wrapping around
    let yDiff = yaw - this.yaw;
    if (yDiff > 180) {
      yDiff -= 360;
    } else if (yDiff < -180) {
      yDiff += 360;
    }

    const normalizedCurrentYaw = normalizeYaw(this.yaw);
    const normalizedTargetYaw = normalizeYaw(yaw);
    const yawDiff = getYawDifference(normalizedCurrentYaw, normalizedTargetYaw);
    const isClockwise = (normalizedTargetYaw - normalizedCurrentYaw + 360) % 360 <= 180;
    const yStepSize = isClockwise ? yawDiff / steps : -yawDiff / steps;

    let step = 1;

    const h = () => {
      step++;
      if (step >= steps || !this.isRunning) {
        clearInterval(this.currentTask);
        this.isRunning = false;
        this.location = this.target;
        this.pitch = pitch;
        this.yaw = yaw;
        this.onMove(this.location, this.pitch, this.yaw);
        return;
      }
      this.location.sub(vStepSize);
      this.pitch -= pStepSize;
      this.yaw = normalizeYaw(this.yaw + yStepSize);
      this.onMove(this.location, this.pitch, this.yaw);
    };

    h();

    this.currentTask = setInterval(h, loop);
  }
}

function normalizeYaw(yaw) {
  return (yaw + 360) % 360;
}

function getYawDifference(yaw1, yaw2) {
  const diff = Math.abs(yaw1 - yaw2);
  return Math.min(diff, 360 - diff);
}
