import { MediaManager } from '../../media/MediaManager';
import { MediaEngine } from '../../../medialib/MediaEngine';

export function handleMediaUpdate(data) {
  // old for old versions
  function convertDistanceToVolume(maxDistance, currentDistance) {
    return Math.round(((maxDistance - currentDistance) / maxDistance) * 100);
  }

  const id = data.mediaOptions.target;
  const { fadeTime } = data.mediaOptions;
  const { distance } = data.mediaOptions;
  const { reApplyVolume } = data.mediaOptions;
  const newVolume = data.mediaOptions.volume;

  const engine = MediaManager.engine instanceof MediaEngine ? MediaManager.engine : null;
  if (engine) {
    const ch = engine.channels.get(id);
    if (ch) {
      if (reApplyVolume) {
        ch.fadeTo(newVolume, fadeTime);
      } else {
        const vol = convertDistanceToVolume(ch.maxDistance || 0, distance);
        ch.fadeTo(vol, fadeTime);
      }
    }
  }
}
