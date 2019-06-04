// OpenAudioMc classes
import {TimeService} from "./modules/TimeService";
import {Messages} from "./modules/Messages";
import {UserInterfaceModule} from "./modules/UserInterfaceModule";
import {HueModule} from "./modules/HueModule";
import {MediaManager} from "./modules/MediaManager";
import {SocketModule} from "./modules/SocketModule";
import {Handlers} from "./modules/Handlers";
import {HueConfigurationModule} from "./modules/HueConfigurationModule";
import {Getters} from "./modules/Getters";

// Static functions
import {getHueInstance} from "./modules/JsHue";
import {linkBootListeners} from "./modules/StaticFunctions";

export class OpenAudioMc extends Getters {

    constructor() {
        super();
        this.timeService = new TimeService();
        this.messages = new Messages(this);
        this.userInterfaceModule = new UserInterfaceModule(this);
        this.hueConfiguration = new HueConfigurationModule(this);
        this.hueModule = new HueModule(this, getHueInstance());
        this.mediaManager = new MediaManager(this);
        this.socketModule = new SocketModule(this, "https://craftmendserver.eu");

        // setup packet handler
        new Handlers(this);

        this.boot();
    }
}

linkBootListeners();
