// OpenAudioMc classes
import {TimeService} from "./modules/TimeService";
import {Messages} from "./modules/Messages";
import {UserInterfaceModule} from "./modules/UserInterfaceModule";
import {HueModule} from "./modules/HueModule";
import {MediaManager} from "./modules/MediaManager";
import {SocketModule} from "./modules/SocketModule";
import {Handlers} from "./modules/Handlers";
import {HueConfigurationModule} from "./modules/HueConfigurationModule";
import {Getters} from "./helpers/Getters";
import {getHueInstance} from "./helpers/JsHue";
import {linkBootListeners} from "./helpers/StaticFunctions";
import {SocketDirector} from "./modules/socket/SocketDirector";

export class OpenAudioMc extends Getters {

    constructor() {
        super();

        this.timeService = new TimeService();
        this.messages = new Messages(this);
        this.userInterfaceModule = new UserInterfaceModule(this);
        this.hueConfiguration = new HueConfigurationModule(this);
        this.hueModule = new HueModule(this, getHueInstance());
        this.mediaManager = new MediaManager(this);

        this.userInterfaceModule.showVolumeSlider(false);
        this.userInterfaceModule.setMessage("Loading proxy..");

        // request a socket service, then do the booting
        const director = new SocketDirector("https://craftmendserver.eu");
        director.route()
            .then((host) => {
                this.socketModule = new SocketModule(this, host);
                // setup packet handler
                new Handlers(this);

                this.boot();
            })
            .catch((error) => {
                this.userInterfaceModule.showVolumeSlider(false);
                this.userInterfaceModule.setMessage("Error while booting. Message: " + error);
            });
    }
}

linkBootListeners();
