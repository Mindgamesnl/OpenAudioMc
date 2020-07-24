// boot
import {OpenAudioMc} from "../../OpenAudioMc";
import ClientTokenSet from "../libs/ClientTokenSet";
import {fetch} from "../../../libs/github.fetch";
import {ReportError} from "../protocol/ErrorReporter";
import {API_ENDPOINT} from "../protocol/ApiEndpoints";

let openAudioMc = null;

export default openAudioMc;

function enable() {
    if (openAudioMc.canStart) {
        openAudioMc.start();
    }
}

export async function linkBootListeners() {
    const isSafari = navigator.vendor && navigator.vendor.indexOf('Apple') > -1 &&
        navigator.userAgent &&
        navigator.userAgent.indexOf('CriOS') == -1 &&
        navigator.userAgent.indexOf('FxiOS') == -1;

    if (isSafari) {
        window.location.href = "https://mindgamesnl.github.io/OpenAudioMc/browsers.html";
        return;
    }

    let tokenSet = new ClientTokenSet().fromCache();
    if (tokenSet == null) {
        strictlyShowCard("bad-auth-card");
        ReportError("A faulty login attempt was done at " + window.location.host,"Steve");
        return;
    }

    // can we find a name? let's put it as a welcome text!
    // makes the experience a bit more personal
    if (tokenSet != null && tokenSet.name != null) {
        document.getElementById("top-head").src = "https://minotar.net/avatar/" + tokenSet.name;
        document.getElementById("in-game-name").innerText = tokenSet.name;
        openAudioMc = new OpenAudioMc();
        await openAudioMc.initialize();
    }

    document.body.onclick = () => enable();

    // check server status
    fetch(API_ENDPOINT.SERVER_STATUS + tokenSet.name).then(r => {
        r.json().then(response => {
            if (response.offline) {
                window.location.href = "https://mindgamesnl.github.io/OpenAudioMc/network_error.html";
            } else {
                console.log("Server status:" + JSON.stringify(response));
            }
        });
    })

}

export function strictlyShowCard(id) {
    let elements = document.querySelectorAll('[data-type=card]');

    for (let element of elements) {
        element.style.display = "none";
    }

    document.getElementById(id).style.display = "";
}
