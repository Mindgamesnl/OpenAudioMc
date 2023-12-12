import { MediaManager } from '../../media/MediaManager';

export function handleDestroyMedia(data) {
  const succeeded = MediaManager.destroySounds(data.soundId, data.all, false, data.fadeTime);
  if (!succeeded) {
    // eslint-disable-next-line no-console
    console.warn(`Failed to destroy ${data.soundId}`);
  }
}
