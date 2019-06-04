// OpenAudioMc classes
import {TimeService} from "./modules/TimeService";
import {Messages} from "./modules/Messages";
import {UserInterfaceModule} from "./modules/UserInterfaceModule";
import {HueModule} from "./modules/HueModule";
import {MediaManager} from "./modules/MediaManager";
import {SocketModule} from "./modules/SocketModule";
import {Handlers} from "./modules/Handlers";
import {Utils} from "./modules/Utils";
import {HueConfigurationModule} from "./modules/HueConfigurationModule";
import {Getters} from "./modules/Getters";

// Hue lib
import {getHueInstance} from "./modules/JsHue";

class OpenAudioMc extends Getters {

    constructor() {
        super();

        this.timeService = new TimeService();
        this.messages = new Messages(this);
        this.userInterfaceModule = new UserInterfaceModule(this);
        this.hueConfiguration = new HueConfigurationModule(this);
        this.hueModule = new HueModule(this, getHueInstance());
        this.mediaManager = new MediaManager(this);
        this.socketModule = new SocketModule(this, "https://craftmendserver.eu");

        new Handlers(this);
        new Utils(this);

        this.boot();
    }

}

// enable
let openAudioMc = null;

function enable() {
    if (openAudioMc == null) {
        openAudioMc = new OpenAudioMc();
    }
}

document.getElementById("start-button").onclick = () => enable();
document.body.onclick = () => enable();
