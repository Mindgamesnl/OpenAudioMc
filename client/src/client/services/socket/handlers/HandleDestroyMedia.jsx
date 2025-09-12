import { MediaManager } from '../../media/MediaManager';
import { MEDIA_MUTEX } from '../../../util/mutex';

export async function handleDestroyMedia(data) {
  try {
    await MEDIA_MUTEX.lock();
    const succeeded = MediaManager.destroySounds(data.soundId, data.all, false, data.fadeTime);
    if (!succeeded) {
      // eslint-disable-next-line no-console
      console.warn(`Failed to destroy ${data.soundId}`);
    }
  } finally {
    MEDIA_MUTEX.unlock();
  }
}
