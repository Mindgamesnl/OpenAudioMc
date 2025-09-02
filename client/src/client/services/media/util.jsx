import { MediaManager } from './MediaManager';
import { MediaEngine } from '../../medialib/MediaEngine';
import { MediaTrack } from '../../medialib/MediaTrack';
import { AudioPreloader } from '../preloading/AudioPreloader';

export async function playInternalEffect(src) {
  // Engine-only simple effect
  const engineChannel = MediaManager.engine.ensureChannel(src, 100);
  const preloaded = await AudioPreloader.getResource(src, false);
  const track = new MediaTrack({
    id: `${src}::0`, source: src, audio: preloaded, loop: false,
  });
  engineChannel.addTrack(track);
  MediaManager.engine.whenFinished(src, () => {
    MediaManager.engine.removeChannel(src);
  });
  track.play();
}
