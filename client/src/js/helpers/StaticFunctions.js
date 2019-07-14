// boot
import {OpenAudioMc} from "../OpenAudioMc";

let openAudioMc = null;

function enable() {
    if (openAudioMc == null) {
        openAudioMc = new OpenAudioMc();
    }
}

export function linkBootListeners() {
    document.body.onclick = () => enable();
}
