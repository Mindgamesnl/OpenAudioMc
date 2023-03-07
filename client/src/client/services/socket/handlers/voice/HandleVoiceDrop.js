import {VoiceModule} from "../../../voice/VoiceModule";

export function HandleVoiceDrop(data) {
    if (data.streamKey == null) {
        // fuck them all
        VoiceModule.removeAllPeers()
    } else {
        // remove one peer
        VoiceModule.removePeer(data.streamKey)
    }
}