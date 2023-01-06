
import {oalog} from "../../../helpers/log";

export function handleProtocolVersion(openAudioMc, data) {
    const revision = parseInt(data.protocolRevision);

    oalog("Received PROTOCOL revision update");
    if (revision >= 2) {
        // enable callbacks
        oalog("PROTO rev => 2, enabling callbacks");
        openAudioMc.socketModule.callbacksEnabled = true;
    }

    if (revision >= 3) {
        // enable callbacks
        oalog("PROTO rev => 3, enabling youtube callbacks");
        openAudioMc.socketModule.supportsYoutube = true;
    }

    if (revision >= 4) {
        // enable volume updates
        oalog("PROTO rev => 4, enabling volume callbacks");
        openAudioMc.mediaManager.startVolumeWatcher(openAudioMc)
    }

    if (revision >= 5) {
        // enable volume loudness, but this has already been deprecated/scrapped
        // oalog("PROTO rev => 5, enabling loudness callbacks");
        // openAudioMc.voiceModule.loudnessDetectionEnabled = true
    }
}