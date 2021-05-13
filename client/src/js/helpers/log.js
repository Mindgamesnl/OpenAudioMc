import {OpenAudioEnv} from "../OpenAudioMc";
import {DebugPanel} from "../debug";

let logLines = [];
let hooked = false;

export function oalog(message) {
    if (!hooked) {
        if (!OpenAudioEnv.isProd) {
            hooked = true;
            window.debugUi.addPanel(DebugPanel.LOG, () => logLines[logLines.length - 1])
        }
    }

    console.log("[OpenAudioMc] " + message);
    logLines.push(message);

    if (logLines.length > 5) {
        logLines.shift()
    }
}