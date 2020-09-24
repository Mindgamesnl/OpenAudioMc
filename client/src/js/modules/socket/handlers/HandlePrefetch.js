import { ClearPrefetchedMedia, PreFetch } from '../../../helpers/utils/AudioFactory'

export function handlePrefetchPacket(openAudioMc, data) {

  if (data.clear) {
    // clear all prefetched bullshit
    console.log("[OpenAudioMc] Clearing pre-fetched resources");
    ClearPrefetchedMedia();
  } else {
    let toFetch = data.source;
    console.log("[OpenAudioMc] Pre-fetching resource..");
    // fetch a file
    setTimeout(function() {
      PreFetch(toFetch)
    }, 250)
  }

}