import {VoiceModule} from "../../../voice/VoiceModule";

export function HandleVoiceSubscription(data) {
    VoiceModule.addPeer(data.targetUuid, data.targetPlayerName, data.targetStreamKey, data.location);
}
