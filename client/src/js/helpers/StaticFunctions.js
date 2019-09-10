// boot
import {OpenAudioMc} from "../OpenAudioMc";
import ClientTokenSet from "./ClientTokenSet";

let openAudioMc = null;

export default openAudioMc;

function enable() {
    if (openAudioMc == null) {
        document.getElementById("boot-button").style.display = "none";
        document.getElementById("welcome-text-landing").innerHTML = "Connecting you to the server. Please wait.";
        openAudioMc = new OpenAudioMc();
    }
}

export function linkBootListeners() {
    let tokenSet = new ClientTokenSet().fromUrl(window.location.href);
    if (tokenSet == null) {
        document.getElementById('footer-welcome').innerText = 'No authentication provided';
        document.getElementById("boot-button").style.display = "none";
        document.getElementById("welcome-text-landing").innerHTML = "The audio client is only available for players who are online in the server. Use <small>/audio</small> to obtain a URL<br />";
        return;
    }

    document.body.onclick = () => enable();

    // can we find a name? let's put it as a welcome text!
    // makes the experiance a bit more personal

    if (tokenSet != null && tokenSet.name != null) {
        document.getElementById('welcome-text-landing').innerText = "Welcome to your web client, " + tokenSet.name + "!";
        document.getElementById("skull").src = "https://minotar.net/avatar/" + tokenSet.name;
        document.getElementById('footer-welcome').innerText = 'Logged in as ' + tokenSet.name;
    }
}
