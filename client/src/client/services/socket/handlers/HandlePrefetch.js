import {ClearPrefetchedMedia, PreFetch} from "../../../util/AudioFactory";
import {getGlobalState} from "../../../../state/store";

export function handlePrefetchPacket(data) {

  if (data.clear) {
    // clear all prefetched bullshit
    console.log('Clearing pre-fetched resources')
    setTimeout(function() {
      ClearPrefetchedMedia()
    }, 2500)
  } else {
    if (!getGlobalState().settings.prefetchMedia) {
        console.log('Pre-fetching is disabled, skipping')
        return
    }
    let toFetch = data.source
    console.log('Pre-fetching resource..')
    // fetch a file
    setTimeout(function() {
      PreFetch(toFetch)
    }, 2500)
  }

}