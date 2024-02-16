import { getGlobalState } from '../../../../state/store';
import { AudioPreloader } from '../../preloading/AudioPreloader';

export function handlePrefetchPacket(data) {
  const { clear, source } = data;
  let { origin, keepCopy } = data;
  // clear = bool, whether the origin context should be cleared
  // origin = string, the origin context
  // source = untranslated media source

  // if origin is null, default to global
  if (origin == null) {
    origin = 'global';
  }

  if (keepCopy == null) {
    keepCopy = false;
  }

  if (clear) {
    setTimeout(() => {
      AudioPreloader.drop(origin);
    }, 500);
  } else {
    if (!getGlobalState().settings.prefetchMedia) {
      return;
    }

    setTimeout(() => {
      AudioPreloader.fetch(source, origin, keepCopy);
    }, 500);
  }
}
