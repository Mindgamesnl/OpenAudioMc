import DebugPopupLog from "debug-popup-log";
import {CallAfterDomUpdate} from "./helpers/domhelper";
import {OpenAudioEnv} from "./OpenAudioMc";
import {oalog} from "./helpers/log";

export const DebugPanel = {
    BUILD: "Build",
    UI: "Ui Templating",
    SESSION: "Session",
    ACCOUNT: "Account",
    AUDIO: "Mixer",
    SOCKET: "Socket",
    LOG: "Latest Log",
    RTC: "Streaming",
}

let reallyInitialized = false;
let preInit = [];

export function EnableDebugMode() {
    window.debugUi = new DebugPopupLog(document.body, {zIndex: 999999999, backgroundColor: "black"});
    CallAfterDomUpdate(() => {
        document.getElementById("j3-info-popup").style.zIndex = 99999999;
        document.getElementById("j3-info-popup").style.backgroundColor = "black";
    })
    window.debugUi.addPanel(DebugPanel.BUILD, () => OpenAudioEnv.build + " by " + OpenAudioEnv.compiler + " " + OpenAudioEnv.envDescription);

    for (let i = 0; i < handlers.length; i++) {
        handlers[i]()
    }

    if (!reallyInitialized) {
        reallyInitialized = true;
        for (let i = 0; i < preInit.length; i++) {
            preInit[i]()
        }
    }

    oalog("Enabling debug mode")
}

let handlers = [];

export function WhenDebugging(call) {
    if (!reallyInitialized) {
        preInit.push(call)
        return
    }

    if (!OpenAudioEnv.isProd) {
        call();
    }
    handlers.push(call);
}
