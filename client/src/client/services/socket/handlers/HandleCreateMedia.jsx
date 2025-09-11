import { MediaManager } from '../../media/MediaManager';
import { MediaTrack } from '../../../medialib/MediaTrack';
import { MediaEngine } from '../../../medialib/MediaEngine';
import { debugLog } from '../../debugging/DebugService';
import { AudioPreloader } from '../../preloading/AudioPreloader';
import { MEDIA_MUTEX } from '../../../util/mutex';

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
  const { startAtMillis } = data.media;
  const { speed } = data.media;
  let volume = 100;

  await MEDIA_MUTEX.lock();
  let preloaded;
  try {
    preloaded = await AudioPreloader.getResource(source, false);
  } catch (e) {
    console.error(`Failed to load audio from ${source}`, e);
    MEDIA_MUTEX.unlock();
    return;
  }

  // only if its a new version and provided, then use that volume
  if (data.media.volume != null) {
    volume = data.media.volume;
  }

  // attempt to stop the existing one, if any
  MediaManager.destroySounds(id, false, true);

  // Engine path: create or reuse channel
  const engine = MediaManager.engine instanceof MediaEngine ? MediaManager.engine : new MediaEngine();
  const newChannel = engine.ensureChannel(id, volume);
  newChannel.setTag(id);

  // Use the same fadeTime as the media to crossfade regions/speakers
  if (muteRegions) { debugLog('Incrementing region inhibit'); MediaManager.engine.incrementInhibitor('REGION', fadeTime); }
  if (muteSpeakers) { debugLog('Incrementing speaker inhibit'); MediaManager.engine.incrementInhibitor('SPEAKER', fadeTime); }

  // Undo inhibitors when the engine channel is finally removed
  engine.whenFinished(id, async () => {
    // eslint-disable-next-line no-console
    console.log(`Channel ${id} finished, removing inhibitors`);
    try {
      await MEDIA_MUTEX.unlock();
      if (muteRegions) MediaManager.engine.decrementInhibitor('REGION', fadeTime);
      if (muteSpeakers) MediaManager.engine.decrementInhibitor('SPEAKER', fadeTime);
    } finally {
      MEDIA_MUTEX.unlock();
    }
  });

  newChannel.setTag(flag);
  // Preload audio element and create track
  const track = new MediaTrack({
    id: `${id}::0`, source, audio: preloaded, loop: looping, startAtMillis, startInstant,
  });

  if (speed != null && speed !== 1 && speed !== 0) track.setPlaybackSpeed(speed);
  newChannel.addTrack(track);
  if (!looping) {
    track.onEnded(() => {
      if (MediaManager.engine) MediaManager.engine.removeChannel(id);
    });
  }

  newChannel.setChannelVolumePct(0);
  // convert distance
  if (maxDistance !== 0) {
    const startVolume = convertDistanceToVolume(maxDistance, distance);
    newChannel.setTag('SPECIAL');
    newChannel.maxDistance = maxDistance;
    newChannel.fadeTo(startVolume, fadeTime);
  } else {
    // default sound, just play
    newChannel.setTag('DEFAULT');

    if (fadeTime === 0) {
      newChannel.setChannelVolumePct(volume);
    } else {
      newChannel.fadeTo(volume, fadeTime);
    }
  }

  MEDIA_MUTEX.unlock();
  // Start playback via MediaTrack
  if (doPickup) { /* startInstant already handled by track */ }
  await track.play();
}
