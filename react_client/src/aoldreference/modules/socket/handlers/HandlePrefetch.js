import { ClearPrefetchedMedia, PreFetch } from '../../../helpers/utils/AudioFactory'
import {oalog} from "../../../helpers/log";
import {SETTING_STATES} from "../../settings/SettingsManager";

export function handlePrefetchPacket(openAudioMc, data) {

  if (data.clear) {
    // clear all prefetched bullshit
    oalog('Clearing pre-fetched resources')
    setTimeout(function() {
      ClearPrefetchedMedia()
    }, 2500)
  } else {
    if (!SETTING_STATES.preloadAudio) {

    }
    let toFetch = data.source
    oalog('Pre-fetching resource..')
    // fetch a file
    setTimeout(function() {
      PreFetch(toFetch)
    }, 2500)
  }

}