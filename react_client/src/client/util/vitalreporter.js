import {getGlobalState} from "../../state/store";
import {VERSION} from "../../index";

export async function reportVital(message) {
    let u = getGlobalState().currentUser;
    let {userName, uuid} = u ? u : {"userName": "unknown", "uuid": "unknown"};
    let currentDomain = window.location.hostname;

    message += " | " + currentDomain + " | " + VERSION.revision;

    await fetch("https://plus.openaudiomc.net/cf-log/development", {
        method: "POST",
        body: JSON.stringify({
            playerName: userName,
            uuid: uuid,
            text: message
        })
    });
}