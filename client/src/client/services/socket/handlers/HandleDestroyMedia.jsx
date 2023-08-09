import { MediaManager } from '../../media/MediaManager';

export function handleDestroyMedia(data) {
  MediaManager.destroySounds(data.soundId, data.all, false, data.fadeTime);
}
