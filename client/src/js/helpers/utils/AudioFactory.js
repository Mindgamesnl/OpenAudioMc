import { AudioSourceProcessor } from '../protocol/AudioSourceProcessor'

let prefetchedSounds = {};
let pro = new AudioSourceProcessor();

export function ClearPrefetchedMedia() {
  prefetchedSounds = {};
}

export function PreFetch(source) {
  source = pro.translate(source)
  let soundElement = new Audio();
  soundElement.autoplay = false;
  soundElement.src = source;
  soundElement.load();
  prefetchedSounds[source] = soundElement;
  return soundElement;
}

export function GetAudio(source) {
  source = pro.translate(source)
  let loaded = prefetchedSounds[source];
  if (loaded != null) {
    return loaded;
  }
  return new Audio();
}
