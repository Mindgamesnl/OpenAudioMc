import {getGlobalState} from "../../state/store";
import {VERSION} from "../../index";
import {getTranslation} from "../OpenAudioAppContainer";
import {API_ENDPOINT} from "../config/ApiEndpoints";

export async function reportVital(message) {
    console.log("Reporting vital: ", message);
    let u = getGlobalState().currentUser;
    let {userName, uuid} = u ? u : {"userName": "unknown", "uuid": "unknown"};

    let serverName = getTranslation(null, "serverName")

    let currentDomain = window.location.hostname;

    message += " | " + currentDomain + " | " + VERSION.build + " | " + serverName

    await fetch(API_ENDPOINT.VITALS, {
        method: "POST",
        body: JSON.stringify({
            playerName: userName,
            uuid: uuid,
            text: message
        })
    });
}