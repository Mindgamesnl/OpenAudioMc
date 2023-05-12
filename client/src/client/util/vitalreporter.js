import {getGlobalState} from "../../state/store";
import {VERSION} from "../../index";
import {getTranslation} from "../OpenAudioAppContainer";

export async function reportVital(message) {
    console.log("Reporting vital: ", message);
    let u = getGlobalState().currentUser;
    let {userName, uuid} = u ? u : {"userName": "unknown", "uuid": "unknown"};

    let serverName = getTranslation(null, "serverName")

    let currentDomain = window.location.hostname;

    message += " | " + currentDomain + " | " + VERSION.build + " | " + serverName

    await fetch("https://plus.openaudiomc.net/cf-log/development", {
        method: "POST",
        body: JSON.stringify({
            playerName: userName,
            uuid: uuid,
            text: message
        })
    });
}