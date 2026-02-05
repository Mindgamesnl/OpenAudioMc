import { MediaManager } from '../../media/MediaManager';
import { MediaTrack } from '../../../medialib/MediaTrack';
import { MediaEngine } from '../../../medialib/MediaEngine';
import { debugLog } from '../../debugging/DebugService';
import { AudioPreloader } from '../../preloading/AudioPreloader';
import { MEDIA_MUTEX } from '../../../util/mutex';
import { AudioSourceProcessor } from '../../../util/AudioSourceProcessor';
import { TimeService } from '../../time/TimeService';

const sourceRewriter = new AudioSourceProcessor();

export async function handleCreateMedia(data) {
  function convertDistanceToVolume(maxDistance, currentDistance) {
    return Math.round(((maxDistance - currentDistance) / maxDistance) * 100);
  }

  // Helper function to select a random index excluding a specific index (unless impossible)
  function getRandomIndex(arrayLength, excludeIndex = -1) {
    if (arrayLength === 1) return 0;
    if (excludeIndex < 0 || excludeIndex >= arrayLength) {
      return Math.floor(Math.random() * arrayLength);
    }
    // Get random index that's not the excluded one
    const availableIndices = [];
    for (let i = 0; i < arrayLength; i++) {
      if (i !== excludeIndex) availableIndices.push(i);
    }
    return availableIndices[Math.floor(Math.random() * availableIndices.length)];
  }

  // Helper function to play next track from playlist (for looping playlists)
  async function playNextFromPlaylist(channel, engine, id, fadeTime, muteRegions, muteSpeakers, startInstant, startAtMillis, speed) {
    // eslint-disable-next-line no-console
    console.log(`[Playlist ${id}] playNextFromPlaylist called`);
    const { playlistData } = channel;
    if (!playlistData || !playlistData.loop) {
      // eslint-disable-next-line no-console
      console.log(`[Playlist ${id}] No playlist data or not looping, exiting`);
      return;
    }

    // eslint-disable-next-line no-console
    console.log(`[Playlist ${id}] Acquiring mutex...`);
    await MEDIA_MUTEX.lock();
    // eslint-disable-next-line no-console
    console.log(`[Playlist ${id}] Mutex acquired`);
    try {
      // Select next random track (avoiding the last one if possible)
      const nextIndex = getRandomIndex(playlistData.sources.length, playlistData.lastIndex);
      playlistData.lastIndex = nextIndex;
      const nextSource = playlistData.sources[nextIndex];

      // eslint-disable-next-line no-console
      console.log(`Playlist transition: playing track ${nextIndex} from playlist`);

      // Preload next track
      let preloaded;
      try {
        preloaded = await AudioPreloader.getResource(nextSource, false, true);
      } catch (e) {
        // eslint-disable-next-line no-console
        console.error(`Failed to load next playlist track from ${nextSource}`, e);
        MEDIA_MUTEX.unlock();
        return;
      }

      // Create new track for the next source
      // IMPORTANT: Don't use the original startInstant/startAtMillis for transitions!
      // Those are for syncing the FIRST track. Subsequent tracks should start from 0.
      const track = new MediaTrack({
        id: `${id}::${nextIndex}`,
        source: nextSource,
        audio: preloaded,
        loop: false, // Individual tracks don't loop; playlist manages transitions
        startAtMillis: 0, // Start from beginning, not the original offset
        startInstant: null, // No sync timestamp for subsequent tracks
      });

      if (speed != null && speed !== 1 && speed !== 0) track.setPlaybackSpeed(speed);

      // Set up end handler for continuous looping
      // eslint-disable-next-line no-console
      console.log(`[Playlist ${id}] Setting up onEnded handler for track ${nextIndex}`);
      track.onEnded(() => {
        // eslint-disable-next-line no-console
        console.log(`[Playlist ${id}] Track ${nextIndex} ended, calling playNextFromPlaylist`);
        playNextFromPlaylist(channel, engine, id, fadeTime, muteRegions, muteSpeakers, startInstant, startAtMillis, speed);
      });

      // Remove old track and add new one
      const oldTracks = Array.from(channel.tracks.values());
      // eslint-disable-next-line no-console
      console.log(`[Playlist ${id}] Found ${oldTracks.length} old tracks to clean up`);

      // CRITICAL: Clear callbacks from old tracks FIRST, before any channel operations
      // because removing from channel or adding new track can trigger stop() which fires callbacks
      // eslint-disable-next-line no-console
      console.log(`[Playlist ${id}] Clearing callbacks from ${oldTracks.length} old tracks BEFORE removal`);
      oldTracks.forEach((t) => {
        // eslint-disable-next-line no-console
        console.log(`[Playlist ${id}] Clearing ${t.onFinish.size} callbacks from track ${t.id}`);
        t.onFinish.clear();
      });

      // eslint-disable-next-line no-console
      console.log(`[Playlist ${id}] Removing ${oldTracks.length} old tracks from channel`);
      oldTracks.forEach((t) => {
        // eslint-disable-next-line no-console
        console.log(`[Playlist ${id}] Removing track ${t.id} from channel`);
        channel.tracks.delete(t.id);
      });
      // eslint-disable-next-line no-console
      console.log(`[Playlist ${id}] Adding new track ${track.id} to channel`);
      channel.addTrack(track);

      // Start playback
      // eslint-disable-next-line no-console
      console.log(`[Playlist ${id}] Starting playback of track ${nextIndex}`);
      await track.play();

      // Clean up old tracks after new one starts
      // Callbacks already cleared above before channel operations
      // eslint-disable-next-line no-console
      console.log(`[Playlist ${id}] Destroying ${oldTracks.length} old tracks`);
      oldTracks.forEach((t) => {
        try {
          // eslint-disable-next-line no-console
          console.log(`[Playlist ${id}] Destroying track ${t.id}`);
          t.destroy();
        } catch (e) {
          // eslint-disable-next-line no-console
          console.error(`[Playlist ${id}] Error destroying track ${t.id}:`, e);
        }
      });
    } finally {
      MEDIA_MUTEX.unlock();
    }
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

  // Detect and handle playlists BEFORE translation
  let isPlaylist = false;
  let playlistSources = null;
  let selectedSource = source;

  if (typeof source === 'string' && source.startsWith('[') && source.endsWith(']')) {
    try {
      const rawSources = JSON.parse(source);
      if (Array.isArray(rawSources) && rawSources.length > 0) {
        isPlaylist = true;
        // eslint-disable-next-line no-console
        console.log(`Detected playlist with ${rawSources.length} sources`);

        // Translate each source in the playlist
        playlistSources = await Promise.all(rawSources.map((rawSrc) => sourceRewriter.translate(rawSrc)));

        // Select random initial track
        const initialIndex = getRandomIndex(playlistSources.length);
        selectedSource = playlistSources[initialIndex];
        // eslint-disable-next-line no-console
        console.log(`Selected initial playlist track ${initialIndex}: ${selectedSource}`);
      }
    } catch (e) {
      // eslint-disable-next-line no-console
      console.error('Failed to parse playlist, treating as single source', e);
      isPlaylist = false;
    }
  }

  // Translate single source if not a playlist
  if (!isPlaylist) {
    selectedSource = await sourceRewriter.translate(source);
  }

  // eslint-disable-next-line no-console
  console.log(`Translated source to ${selectedSource}`);

  let preloaded;
  try {
    preloaded = await AudioPreloader.getResource(selectedSource, false, true);
  } catch (e) {
    // eslint-disable-next-line no-console
    console.error(`Failed to load audio from ${selectedSource}`, e);
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

  // Store playlist data on channel if this is a playlist
  if (isPlaylist && playlistSources) {
    const initialIndex = playlistSources.indexOf(selectedSource);
    newChannel.setPlaylistData({
      sources: playlistSources,
      loop: looping,
      lastIndex: initialIndex,
    });
  }

  // Use the same fadeTime as the media to crossfade regions/speakers
  if (muteRegions) { debugLog('Incrementing region inhibit'); MediaManager.engine.incrementInhibitor('REGION', fadeTime); }
  if (muteSpeakers) { debugLog('Incrementing speaker inhibit'); MediaManager.engine.incrementInhibitor('SPEAKER', fadeTime); }

  // Undo inhibitors when the engine channel is finally removed
  engine.whenFinished(id, async () => {
    // eslint-disable-next-line no-console
    console.log(`Channel ${id} finished, removing inhibitors`);
    try {
      await MEDIA_MUTEX.lock();
      if (muteRegions) MediaManager.engine.decrementInhibitor('REGION', fadeTime);
      if (muteSpeakers) MediaManager.engine.decrementInhibitor('SPEAKER', fadeTime);
    } finally {
      MEDIA_MUTEX.unlock();
    }
  });

  let si = startInstant;
  if (!doPickup) {
    si = TimeService.getPredictedTime();
  }

  newChannel.setTag(flag);
  // Preload audio element and create track
  const track = new MediaTrack({
    id: `${id}::0`,
    source: selectedSource,
    audio: preloaded,
    loop: isPlaylist ? false : looping, // Playlists don't loop individual tracks
    startAtMillis,
    startInstant: si,
  });

  if (speed != null && speed !== 1 && speed !== 0) track.setPlaybackSpeed(speed);
  newChannel.addTrack(track);

  // Handle track end based on playlist mode
  if (isPlaylist && looping) {
    // Looping playlist: play next track on end
    track.onEnded(() => {
      playNextFromPlaylist(newChannel, engine, id, fadeTime, muteRegions, muteSpeakers, startInstant, startAtMillis, speed);
    });
  } else if (!isPlaylist && !looping) {
    // Non-looping single track: remove channel on end
    track.onEnded(() => {
      if (MediaManager.engine) MediaManager.engine.removeChannel(id);
    });
  }
  // If isPlaylist && !looping, track ends naturally and channel cleans up
  // If !isPlaylist && looping, track.loop is true so it loops internally

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
