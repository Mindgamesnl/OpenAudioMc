import { MediaManager } from '../../media/MediaManager';

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

  MediaManager.mixer.getChannels().forEach((channel) => {
    if (channel.hasTag(id)) {
      if (reApplyVolume) {
        // update master volume
        channel.fadeChannel(newVolume, fadeTime);
      } else {
        // only update distance
        channel.fadeChannel(convertDistanceToVolume(channel.maxDistance, distance), fadeTime);
      }
    }
  });
}
