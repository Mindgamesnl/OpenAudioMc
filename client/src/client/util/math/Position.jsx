import { Vector3 } from './Vector3';
import { Quaternion } from './Quaternion';
import { WorldModule } from '../../services/world/WorldModule';

export class Position {
  constructor(position = new Vector3(), rotation = new Quaternion()) {
    this.position = position;
    this.rotation = rotation;

    // Cache vectors to avoid creating new objects each update
    this.forwardVec = new Vector3(0, 0, 1);
    this.upVec = new Vector3(0, 1, 0);

    // Cache for last values to prevent unnecessary updates
    this.lastPos = new Vector3();
    this.lastForward = new Vector3();
    this.lastUp = new Vector3();

    // Threshold for position/orientation changes
    this.UPDATE_THRESHOLD = 0.01;

    // Smoothing parameters
    this.smoothingFactor = 0.15; // Adjust between 0 and 1
    this.targetPos = new Vector3();
    this.currentPos = new Vector3();
  }

  needsUpdate(current, last) {
    return Math.abs(current - last) > this.UPDATE_THRESHOLD;
  }

  lerp(start, end, factor) {
    return start + (end - start) * factor;
  }

  smoothPosition() {
    this.currentPos.x = this.lerp(this.currentPos.x, this.targetPos.x, this.smoothingFactor);
    this.currentPos.y = this.lerp(this.currentPos.y, this.targetPos.y, this.smoothingFactor);
    this.currentPos.z = this.lerp(this.currentPos.z, this.targetPos.z, this.smoothingFactor);
  }

  applyTo(target, context = WorldModule.player.audioCtx) {
    // Update target position
    this.targetPos.copy(this.position);
    this.smoothPosition();

    // Calculate orientations
    const forward = this.forwardVec.applyQuaternion(this.rotation);
    const up = this.upVec.applyQuaternion(this.rotation);

    // Check if update is necessary
    const positionChanged = (
      this.needsUpdate(this.currentPos.x, this.lastPos.x)
      || this.needsUpdate(this.currentPos.y, this.lastPos.y)
      || this.needsUpdate(this.currentPos.z, this.lastPos.z)
    );

    const orientationChanged = (
      this.needsUpdate(forward.x, this.lastForward.x)
      || this.needsUpdate(forward.y, this.lastForward.y)
      || this.needsUpdate(forward.z, this.lastForward.z)
    );

    // Only update if necessary
    if (positionChanged) {
      if (target.positionX) {
        // Schedule position updates using AudioParam automation
        const { currentTime } = context;
        const transitionTime = 0.05; // 50ms transition

        target.positionX.linearRampToValueAtTime(this.currentPos.x, currentTime + transitionTime);
        target.positionY.linearRampToValueAtTime(this.currentPos.y, currentTime + transitionTime);
        target.positionZ.linearRampToValueAtTime(this.currentPos.z, currentTime + transitionTime);
      } else {
        target.setPosition(this.currentPos.x, this.currentPos.y, this.currentPos.z);
      }

      // Update last position
      this.lastPos.copy(this.currentPos);
    }

    // Update orientation if changed
    if (orientationChanged) {
      if (target instanceof PannerNode) {
        if (target.orientationX) {
          const { currentTime } = context;
          const transitionTime = 0.05;

          target.orientationX.linearRampToValueAtTime(forward.x, currentTime + transitionTime);
          target.orientationY.linearRampToValueAtTime(forward.y, currentTime + transitionTime);
          target.orientationZ.linearRampToValueAtTime(forward.z, currentTime + transitionTime);
        } else {
          target.setOrientation(forward.x, forward.y, forward.z);
        }
      } else if (target.forwardX) {
        const { currentTime } = context;
        const transitionTime = 0.05;

        target.forwardX.linearRampToValueAtTime(forward.x, currentTime + transitionTime);
        target.forwardY.linearRampToValueAtTime(forward.y, currentTime + transitionTime);
        target.forwardZ.linearRampToValueAtTime(forward.z, currentTime + transitionTime);

        target.upX.linearRampToValueAtTime(up.x, currentTime + transitionTime);
        target.upY.linearRampToValueAtTime(up.y, currentTime + transitionTime);
        target.upZ.linearRampToValueAtTime(up.z, currentTime + transitionTime);
      } else {
        target.setOrientation(forward.x, forward.y, forward.z, up.x, up.y, up.z);
      }

      // Update last orientation
      this.lastForward.copy(forward);
      this.lastUp.copy(up);
    }
  }
}
