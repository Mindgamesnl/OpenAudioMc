// boot
import {OpenAudioEnv, OpenAudioMc} from '../../OpenAudioMc'
import ClientTokenSet from '../libs/ClientTokenSet'
import {ReportError} from '../protocol/ErrorReporter'
import {DebugPanel, EnableDebugMode, WhenDebugging} from "../../debug";
import {prepareLogging} from "../log";
import {replaceGlobalText, replaceProperty} from "../domhelper";

let openAudioMc = null

export default openAudioMc

function enable() {
    if (openAudioMc.canStart) {
        replaceProperty("{{ oam.click_request_style }}", "display: none;", "style")
        replaceProperty("{{ oam.hidden_until_started }}", "", "style")
        openAudioMc.start()
    }
}

export function linkBootListeners() {
    setLoaderText("loading assets...")

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

    prepareUiDefaults()

    setLoaderText("logging in...")
    let sessionLoader = new ClientTokenSet()
    sessionLoader.initialize()
        .then(tokenSet => {
            if (tokenSet == null) {
                replaceProperty("{{ oam.loader_style }}", "display: -;", "style")
                replaceProperty("{{ oam.login_style }}", "display: -;", "style")
                replaceProperty("{{ oam.loader_status }}", "display: none;", "style")
                ReportError('A faulty login attempt was done at ' + window.location.host, 'Steve')
                return
            }

            WhenDebugging(() => {
                window.debugUi.addPanel(DebugPanel.SESSION, tokenSet.name + "@" + tokenSet.publicServerKey + "/" + tokenSet.scope)
            })

            // can we find a name? let's put it as a welcome text!
            // makes the experience a bit more personal
            if (tokenSet != null && tokenSet.name != null) {
                replaceProperty("{{ oam.player_head }}", "https://visage.surgeplay.com/bust/" + tokenSet.uuid + "?overlay", "src")
                replaceGlobalText("{{ oam.player_name }}", tokenSet.name)
                openAudioMc = new OpenAudioMc()
                window.openAudioMc = openAudioMc;
            }

            document.body.addEventListener('click', enable)
        })
        .catch(console.error)
}

function prepareUiDefaults() {
    // side background image and rename the property name
    replaceProperty("{{ oam.side_image }}", "assets/bg.jpg", "src")
    replaceProperty("{{ oam.logo_image }}", "assets/logo.png", "src")
    replaceProperty("{{ oam.bg_image_map }}", "--bg-map:url('../assets/bg.jpg');", "style")
    replaceGlobalText("{{ oam.hue_bridge_name }}", "No bridge")
}

export function setLoaderText(message) {
    // show tagline
    replaceProperty("{{ oam.loading_tagline_style }}", "", "style")
    replaceGlobalText("{{ oam.loading_tagline_text }}", message)
}
