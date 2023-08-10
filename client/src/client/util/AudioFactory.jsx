import { AudioSourceProcessor } from './AudioSourceProcessor';
import { feedDebugValue } from '../services/debugging/DebugService';
import { DebugStatistic } from '../services/debugging/DebugStatistic';

// eslint-disable-next-line import/no-mutable-exports
export let prefetchedSounds = {};
const pro = new AudioSourceProcessor();

export function ClearPrefetchedMedia() {
  prefetchedSounds = {};
  feedDebugValue(DebugStatistic.PRELOADED_SOUNDS, 0);
}

export async function PreFetch(source) {
  source = await pro.translate(source);
  const soundElement = new Audio();
  soundElement.autoplay = false;
  soundElement.src = source;
  soundElement.load();
  prefetchedSounds[source] = soundElement;
  feedDebugValue(DebugStatistic.PRELOADED_SOUNDS, Object.keys(prefetchedSounds).length);
  return soundElement;
}

export async function GetAudio(source, isTranslated = false, allowCaching = true) {
  if (!allowCaching) {
    return new Audio();
  }
  if (!isTranslated) {
    source = await pro.translate(source);
  }
  const loaded = prefetchedSounds[source];
  if (loaded != null) {
    return loaded;
  }
  return new Audio();
}
