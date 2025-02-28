import { SpatialAudioListener } from '../../rendering/CustomSpatialRenderer';
import { haltCriticalError } from '../../../../state/store';

export class Player {
  constructor(world, location, pitch, yaw) {
    this.world = world;
    let audioContextType;
    if (typeof window !== 'undefined') {
      audioContextType = window.AudioContext || window.webkitAudioContext;
    }
    // eslint-disable-next-line new-cap
    this.audioCtx = new audioContextType({
      latencyHint: 'interactive',
    });

    // compile our module
    this.audioCtx.audioWorklet.addModule('assets/spatial-audio-processor.js')
      .then(() => {
        this.listener = SpatialAudioListener.getInstance(this.audioCtx);
        this.updateLocation(location, pitch, yaw);
      })
      .catch((err) => {
        console.error('AudioWorklet failed to load:', err);
        haltCriticalError(
          'PROCESSOR_LOAD_FAILED',
          'Failed to load the audio processor',
          'The audio processor failed to load, please try again later',
        );
      });
  }

  updateLocation(location, pitch, yaw) {
    this.location = location;
    this.yaw = this.toRadians(this.normalizeYaw(360 - yaw));

    this.listener.updatePosition(location.x, location.y, location.z, this.yaw);
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
