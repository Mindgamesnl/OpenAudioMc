// boot
import {OpenAudioMc} from "../OpenAudioMc";

let openAudioMc = null;

function enable() {
    if (openAudioMc == null) {
        openAudioMc = new OpenAudioMc();
    }
}

export function linkBootListeners() {
    document.getElementById("start-button").onclick = () => enable();
    document.body.onclick = () => enable();
}
