import {VoiceModule} from "../../../voice/VoiceModule";
import {debugLog} from "../../../debugging/DebugService";

export function HandleVoiceDrop(data) {

    // We need to seperate this into two cases:
    // 1. Legacy handling, packets follow a format pre 6.8.5
    // 2. Modern handling, where packets can cover multiple peers at once.
    // We can differentiate this by checking if the 'dropAll' field is present, if it is, we can assume it's a modern packet.

    const isModern = data.hasOwnProperty('dropAll');

    if (!isModern) {
        debugLog("legacy voice subscription packet received");
        // legacy
        if (data.streamKey == null) {
            // fuck them all
            VoiceModule.removeAllPeers()
        } else {
            // remove one peer
            VoiceModule.removePeer(data.streamKey)
        }
        return
    }

    // modern handling
    if (data.dropAll) {
        VoiceModule.removeAllPeers();
        return;
    }

    // try to parse all given peers, so we can loop over keysToDrop
    const toDrop = data.keysToDrop;
    for (let i = 0; i < toDrop.length; i++) {
        try {
            VoiceModule.removePeer(toDrop[i])
        } catch (e) {
            console.error(e)
        }
    }
}