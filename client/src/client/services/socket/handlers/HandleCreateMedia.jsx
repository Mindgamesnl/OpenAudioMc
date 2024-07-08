import { Channel } from '../../media/objects/Channel';
import { Sound } from '../../media/objects/Sound';
import { MediaManager } from '../../media/MediaManager';
import { debugLog } from '../../debugging/DebugService';

export async function handleCreateMedia(data) {
  function convertDistanceToVolume(maxDistance, currentDistance) {
    return Math.round(((maxDistance - currentDistance) / maxDistance) * 100);
  }

  const looping = data.media.loop;
  const { startInstant } = data.media;
  const id = data.media.mediaId;
  const { source } = data.media;
  const { doPickup } = data.media;
  const { fadeTime } = data.media;
  const { distance } = data;
  const { flag } = data.media;
  const { maxDistance } = data;
  const { muteRegions, muteSpeakers } = data.media;
  const { startAt } = data.media;
  let volume = 100;

  // only if its a new version and provided, then use that volume
  if (data.media.volume != null) {
    volume = data.media.volume;
  }

  // attempt to stop the existing one, if any
  MediaManager.destroySounds(id, false, true);

  // register with metadata
  const createdChannel = new Channel(id, volume);
  createdChannel.trackable = true;
  createdChannel.setPrefferedFadeTime(fadeTime);
  const createdMedia = new Sound();

  createdChannel.addSound(createdMedia);
  MediaManager.mixer.addChannel(createdChannel);

  createdChannel.setTag(id);

  if (muteRegions) {
    debugLog('Incrementing region inhibit');
    MediaManager.mixer.incrementInhibitor('REGION');
  }

  if (muteSpeakers) {
    debugLog('Incrementing speaker inhibit');
    MediaManager.mixer.incrementInhibitor('SPEAKER');
  }

  MediaManager.mixer.whenFinished(id, () => {
    // undo inhibit
    if (muteRegions) {
      debugLog('Decrementing region inhibit');
      MediaManager.mixer.decrementInhibitor('REGION');
    }

    if (muteSpeakers) {
      debugLog('Decrementing speaker inhibit');
      MediaManager.mixer.decrementInhibitor('SPEAKER');
    }
  });

  createdChannel.setTag(flag);

  MediaManager.mixer.tick();

  // load file and play
  await createdMedia.load(source);
  createdChannel.setChannelVolume(0);
  createdChannel.originalVolume = volume;
  createdMedia.setLooping(looping);
  createdMedia.setStartAt(startAt);
  // convert distance
  if (maxDistance !== 0) {
    const startVolume = convertDistanceToVolume(maxDistance, distance);
    createdChannel.setTag('SPECIAL');
    createdChannel.maxDistance = maxDistance;
    createdMedia.whenInitialized(() => {
      createdChannel.fadeChannel(startVolume, fadeTime);
    });
  } else {
    // default sound, just play
    createdChannel.setTag('DEFAULT');

    createdMedia.whenInitialized(() => {
      // are we not already nicked from the start?
      if (createdChannel.mutedByScore) {
        return;
      }

      if (fadeTime === 0) {
        createdChannel.setChannelVolume(volume);
        createdChannel.updateFromMasterVolume();
      } else {
        createdChannel.updateFromMasterVolume();
        createdChannel.fadeChannel(volume, fadeTime);
      }
    });
  }

  MediaManager.mixer.updateCurrent();

  createdMedia.finalize().then(() => {
    if (doPickup) createdMedia.startDate(startInstant, true);
    createdMedia.finish();
  });
}
