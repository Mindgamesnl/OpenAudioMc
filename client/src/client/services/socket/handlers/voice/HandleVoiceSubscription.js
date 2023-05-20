import {VoiceModule} from "../../../voice/VoiceModule";
import {reportVital} from "../../../../util/vitalreporter";
import {StringifyError} from "../../../../util/errorreformat";

export function HandleVoiceSubscription(data) {
    try {
        VoiceModule.addPeer(data.targetUuid, data.targetPlayerName, data.targetStreamKey, data.location);
    } catch (e) {
        // check if its not a ConnectionClosedError
        if (e.name !== "ConnectionClosedError") {
            reportVital("metrics:voice:peer:failed-packet " + data + " " + StringifyError(e));
        } else {
            console.log("Connection closed error, ignoring");
            // report vital, then reload page
            reportVital("metrics:voice:peer:failed-conn-closed " + data + " " + StringifyError(e))
                .then(() => {
                    window.location.reload();
                })
        }
    }
}
