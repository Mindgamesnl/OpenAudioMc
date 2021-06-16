// boot
import {OpenAudioEnv, OpenAudioMc} from '../../OpenAudioMc'
import ClientTokenSet from '../libs/ClientTokenSet'
import {ReportError} from '../protocol/ErrorReporter'
import {strictlyShowCard, UiCards} from '../../modules/ui/UserInterfaceModule'
import {DebugPanel, EnableDebugMode, WhenDebugging} from "../../debug";
import {prepareLogging} from "../log";
import {replaceGlobalText} from "../domhelper";

let openAudioMc = null

export default openAudioMc

function enable() {
    if (openAudioMc.canStart) {
        openAudioMc.    start()
    }
}

export function linkBootListeners() {
    // use debugging UI
    if (!OpenAudioEnv.isProd) {
        EnableDebugMode()
    }

    prepareLogging()

    const isSafari = navigator.vendor && navigator.vendor.indexOf('Apple') > -1 &&
        navigator.userAgent &&
        navigator.userAgent.indexOf('CriOS') == -1 &&
        navigator.userAgent.indexOf('FxiOS') == -1

    if (isSafari) {
        window.location.href = 'https://help.openaudiomc.net/browsers.html'
        return
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

            WhenDebugging(() => {
                window.debugUi.addPanel(DebugPanel.SESSION, tokenSet.name + "@" + tokenSet.publicServerKey + "/" + tokenSet.scope)
            })

            // can we find a name? let's put it as a welcome text!
            // makes the experience a bit more personal
            if (tokenSet != null && tokenSet.name != null) {
                replaceGlobalText("{{ oam.player_name }}", tokenSet.name)
                openAudioMc = new OpenAudioMc()
            }

            document.body.addEventListener('click', enable)
        })

}

