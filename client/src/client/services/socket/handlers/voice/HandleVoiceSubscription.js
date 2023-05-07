import {VoiceModule} from "../../../voice/VoiceModule";
import {reportVital} from "../../../../util/vitalreporter";
import {StringifyError} from "../../../../util/errorreformat";

export function HandleVoiceSubscription(data) {
    try {
        VoiceModule.addPeer(data.targetUuid, data.targetPlayerName, data.targetStreamKey, data.location);
    } catch (e) {
        reportVital("metrics:voice:peer:failed-packet " + data + " " + StringifyError(e));
    }
}
