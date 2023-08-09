import { ClearPrefetchedMedia, PreFetch } from '../../../util/AudioFactory';
import { getGlobalState } from '../../../../state/store';

export function handlePrefetchPacket(data) {
  if (data.clear) {
    // clear all prefetched bullshit
    setTimeout(() => {
      ClearPrefetchedMedia();
    }, 2500);
  } else {
    if (!getGlobalState().settings.prefetchMedia) {
      return;
    }
    const toFetch = data.source;
    // fetch a file
    setTimeout(() => {
      PreFetch(toFetch);
    }, 2500);
  }
}
