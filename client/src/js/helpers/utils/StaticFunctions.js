// boot
import {OpenAudioEnv, OpenAudioMc} from '../../OpenAudioMc'
import ClientTokenSet from '../libs/ClientTokenSet'
import {fetch} from '../../../libs/github.fetch'
import {ReportError} from '../protocol/ErrorReporter'
import {API_ENDPOINT} from '../protocol/ApiEndpoints'
import {strictlyShowCard, UiCards} from '../../modules/ui/UserInterfaceModule'
import DebugPopupLog from "debug-popup-log";
import {CallAfterDomUpdate} from "../domhelper";
import {DebugPanel} from "../../debug";

let openAudioMc = null

export default openAudioMc

function enable() {
    if (openAudioMc.canStart) {
        openAudioMc.start()
    }
}

export function linkBootListeners() {
    const isSafari = navigator.vendor && navigator.vendor.indexOf('Apple') > -1 &&
        navigator.userAgent &&
        navigator.userAgent.indexOf('CriOS') == -1 &&
        navigator.userAgent.indexOf('FxiOS') == -1

    if (isSafari) {
        window.location.href = 'https://help.openaudiomc.net/browsers.html'
        return
    }

    // use debugging UI
    if (!OpenAudioEnv.isProd) {
        window.debugUi = new DebugPopupLog(document.body, {zIndex: 999999999, backgroundColor: "black"});
        CallAfterDomUpdate(() => {
            document.getElementById("j3-info-popup").style.zIndex = 99999999;
            document.getElementById("j3-info-popup").style.backgroundColor = "black";
        })
        window.debugUi.addPanel(DebugPanel.BUILD, () => OpenAudioEnv.build + " by " + OpenAudioEnv.compiler + " with dev mode");
    }

    let sessionLoader = new ClientTokenSet()
    sessionLoader.initialize()
        .then(tokenSet => {
            if (tokenSet == null) {
                strictlyShowCard(UiCards.BAD_AUTH);
                window.location = location.protocol + "//" + window.location.host + window.location.pathname + "/login.html";
                ReportError('A faulty login attempt was done at ' + window.location.host, 'Steve')
                return
            }

            if (!OpenAudioEnv.isProd) {
                window.debugUi.addPanel(DebugPanel.SESSION, tokenSet.name + "@" + tokenSet.publicServerKey + "/" + tokenSet.scope)
            }

            // can we find a name? let's put it as a welcome text!
            // makes the experience a bit more personal
            if (tokenSet != null && tokenSet.name != null) {
                document.getElementById('in-game-name').innerText = tokenSet.name
                openAudioMc = new OpenAudioMc()
            }

            document.body.addEventListener('click', enable)
        })

}
