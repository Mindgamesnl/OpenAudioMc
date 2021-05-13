import { ClearPrefetchedMedia, PreFetch } from '../../../helpers/utils/AudioFactory'
import {oalog} from "../../../helpers/log";

export function handlePrefetchPacket(openAudioMc, data) {

  if (data.clear) {
    // clear all prefetched bullshit
    oalog('Clearing pre-fetched resources')
    setTimeout(function() {
      ClearPrefetchedMedia()
    }, 2500)
  } else {
    let toFetch = data.source
    oalog('Pre-fetching resource..')
    // fetch a file
    setTimeout(function() {
      PreFetch(toFetch)
    }, 2500)
  }

}