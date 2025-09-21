import { MediaManager } from '../../media/MediaManager';
import { MediaEngine } from '../../../medialib/MediaEngine';
import { MEDIA_MUTEX } from '../../../util/mutex';

export async function handleMediaUpdate(data) {
  try {
    await MEDIA_MUTEX.lock();
    const id = data.mediaOptions.target;
    const { volume, speed, fadeTimeMs } = data.mediaOptions;

    const engine = MediaManager.engine instanceof MediaEngine ? MediaManager.engine : null;
    if (engine) {
      const ch = engine.channels.get(id);
      if (ch) {
        if (volume) {
          ch.fadeTo(volume, fadeTimeMs);
        }

        if (speed) {
          ch.updateMediaSpeed(speed);
        }
      }
    }
  } finally {
    MEDIA_MUTEX.unlock();
  }
}
