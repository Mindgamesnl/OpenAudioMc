let prefetchedSounds = {};

export function ClearPrefetchedMedia() {
  prefetchedSounds = {};
}

export function PreFetch(source) {
  let soundElement = new Audio();
  soundElement.autoplay = false;
  soundElement.src = source;
  soundElement.load();
  prefetchedSounds[source] = soundElement;
  return soundElement;
}

export function GetAudio(source) {
  let loaded = prefetchedSounds[source];
  if (loaded != null) {
    return loaded;
  }
  return new Audio();
}