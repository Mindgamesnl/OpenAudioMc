import {TimeService} from "./modules/TimeService";
import {Messages} from "./modules/Messages";
import {UserInterfaceModule} from "./modules/UserInterfaceModule";
import {HueModule} from "./modules/HueModule";
import {MediaManager} from "./modules/MediaManager";
import {SocketModule} from "./modules/SocketModule";
import {Handlers} from "./modules/Handlers";

console.log('%c Take note! this is a bundled version of OpenAudioMc. To get the full source code, please visit https://github.com/Mindgamesnl/OpenAudioMc', [
    'background: linear-gradient(#D33106, #571402)'
    , 'border: 1px solid #3E0E02'
    , 'color: white'
    , 'display: block'
    , 'text-shadow: 0 1px 0 rgba(0, 0, 0, 0.3)'
    , 'box-shadow: 0 1px 0 rgba(255, 255, 255, 0.4) inset, 0 5px 3px -5px rgba(0, 0, 0, 0.5), 0 -13px 5px -10px rgba(255, 255, 255, 0.4) inset'
    , 'line-height: 40px'
    , 'text-align: center'
    , 'font-weight: bold'
].join(';'));

class OpenAudioMc {

    constructor() {
        //load cookies
        const hueOptions = {
            "userid": Cookies.get("hueid"),
            "group": Cookies.get("huegroup")
        };

        this.log("Enabling the web client for " + window.navigator.userAgent);
        this.debugPrint("starting.");
        this.timeService = new TimeService();
        this.messages = new Messages(this);
        this.userInterfaceModule = new UserInterfaceModule(this);
        this.hueModule = new HueModule(this, hueOptions);
        this.mediaManager = new MediaManager(this);
        this.socketModule = new SocketModule(this, "https://craftmendserver.eu");
        new Handlers(this);
        this.messages.apply();

        //set volume
        let presetVolume = Cookies.get("volume");
        if (presetVolume != null) this.mediaManager.changeVolume(presetVolume);
    }

    log(message) {
        console.log("[OpenAudioMc] " + message);
    }

    getMessages() {
        return this.messages;
    }

    getTimeService() {
        return this.timeService;
    }

    debugPrint(message) {
        this.log(message);
    }

    getMediaManager() {
        return this.mediaManager;
    }

    getHueModule() {
        return this.hueModule;
    }

    getUserInterfaceModule() {
        return this.userInterfaceModule;
    }

}

//enable
let openAudioMc = null;

function enable() {
    if (openAudioMc == null) {
        openAudioMc = new OpenAudioMc();
    }
}

document.getElementById("start-button").onclick = () => enable();
