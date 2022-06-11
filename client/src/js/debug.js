import DebugPopupLog from "debug-popup-log";
import {CallAfterDomUpdate, replaceGlobalText, replaceProperty} from "./helpers/domhelper";
import {OpenAudioEnv, OpenAudioMc} from "./OpenAudioMc";
import {oalog} from "./helpers/log";
import openAudioMc from "./helpers/utils/StaticFunctions";
import ClientTokenSet from "./helpers/libs/ClientTokenSet";
import {HueModule} from "./modules/hue/HueModule";
import {getHueInstance} from "./helpers/libs/JsHue";
import {SettingsManager} from "./modules/settings/SettingsManager";
import {WaitFor} from "./helpers/utils/WaitFor";
import {VoicePeerUi} from "./modules/voice/ui/VoicePeerUi";

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

async function enterUiTestMode() {
    oalog("STARTING FAKE CLIENT TO TEST UI!!!")
    let tokenSet = new ClientTokenSet(
        "2fb3a3e2-64ca-433d-8692-ff9d35bc6f92",
        "2fb3a3e2-64ca-433d-8692-ff9d35bc6f92",
        "Nepla",
        "6969"
    )
    window.tokenCache = tokenSet;
    replaceProperty("{{ oam.player_head }}", "https://visage.surgeplay.com/bust/" + tokenSet.uuid + "?overlay", "src")
    replaceGlobalText("{{ oam.player_name }}", tokenSet.name)
    var openAudioMc = new OpenAudioMc(true)
    window.openAudioMc = openAudioMc;
    await openAudioMc.start();
    replaceProperty("{{ oam.click_request_style }}", "display: none;", "style")
    replaceProperty("{{ oam.hidden_until_started }}", "", "style")

    // wait for the director to die
    await WaitFor(10, () => {
        return openAudioMc.directorFinished;
    });

    // start fake client
    await openAudioMc.messageModule.load("en.lang");
    if ("Notification" in window) {
        openAudioMc.notificationModule.setupPermissions();
    }
    openAudioMc.hueModule = new HueModule(openAudioMc, getHueInstance());
    openAudioMc.settingsManager = new SettingsManager(openAudioMc);
    // set static shit
    openAudioMc.messageModule.seedStatic([
        ["%player", tokenSet.name],
        ["%server", "TstSrv"]
    ]);

    replaceGlobalText("{{ oam.volume }}", 24 + "%")
    replaceGlobalText("{{ craftmend.account.serverName }}", "TestClient")
    // wat a tiny bit, then show
    setTimeout(() => {
        replaceProperty("{{ oam.loader_style }}", "display: none;", "style")
    }, 250)

    replaceProperty("{{ navbar.vc_button }}", "", "style")
    document.getElementById("voice-settings-container").style.display = "";

    // debug voice cards
    new VoicePeerUi(openAudioMc, "OGnelly", "2039de57-aab9-49f7-816c-b1f6cf4b5d5f", 100, (newVolume) => {});
    new VoicePeerUi(openAudioMc, "seulri", "90477479-f6e2-402e-b67b-5c074d93b086", 48, (newVolume) => {});
    new VoicePeerUi(openAudioMc, "Axeljucken", "7564e03a-3ebd-43e3-ae5e-2f10e1595020", 123, (newVolume) => {});
}

window.enterUiTestMode = enterUiTestMode;
setTimeout(() => {
    if (window.location.href.indexOf("?debugUI") != -1) {
        enterUiTestMode()
    }
}, 1000)