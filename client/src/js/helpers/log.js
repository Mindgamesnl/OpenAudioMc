import {OpenAudioEnv} from "../OpenAudioMc";
import {DebugPanel, WhenDebugging} from "../debug";

let logLines = [];

export function prepareLogging() {
    WhenDebugging(() => {
        window.debugUi.addPanel(DebugPanel.LOG, () => logLines.join("\n"))
    })
}

export function oalog(message) {
    console.log("[OpenAudioMc] " + message);
    logLines.push(message);

    if (logLines.length > 5) {
        logLines.shift()
    }
}
