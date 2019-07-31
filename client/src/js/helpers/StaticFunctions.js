// boot
import {OpenAudioMc} from "../OpenAudioMc";
import ClientTokenSet from "./ClientTokenSet";

let openAudioMc = null;

export default openAudioMc;

function enable() {
    if (openAudioMc == null) {
        openAudioMc = new OpenAudioMc();
    }
}

export function linkBootListeners() {
    document.body.onclick = () => enable();

    // can we find a name? let's put it as a welcome text!
    // makes the experiance a bit more personal
    let tokenSet = new ClientTokenSet().fromUrl(window.location.href);
    if (tokenSet != null && tokenSet.name != null) {
        document.getElementById('welcome-text-landing').innerText = "Welcome to your web client, " + tokenSet.name + "!";
        document.getElementById("skull").src = "https://minotar.net/avatar/" + tokenSet.name;
        document.getElementById('footer-welcome').innerText = 'Logged in as ' + tokenSet.name;
    }
}
