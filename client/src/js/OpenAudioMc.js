// OpenAudioMc classes
import {TimeService} from "./modules/socket/TimeService";
import {Messages} from "./modules/ui/Messages";
import {UserInterfaceModule} from "./modules/ui/UserInterfaceModule";
import {HueModule} from "./modules/hue/HueModule";
import {MediaManager} from "./modules/media/MediaManager";
import {SocketModule} from "./modules/socket/SocketModule";
import {Handlers} from "./modules/socket/Handlers";
import {HueConfigurationModule} from "./modules/hue/HueConfigurationModule";
import {Getters} from "./helpers/Getters";
import {getHueInstance} from "./helpers/JsHue";
import {linkBootListeners} from "./helpers/StaticFunctions";
import {SocketDirector} from "./modules/socket/SocketDirector";
import {AlertBox} from "./modules/ui/Notification";
import {VoiceModule} from "./modules/voice/VoiceModule";
import {NotificationModule} from "./modules/notifications/NotificationModule";
import ClientTokenSet from "./helpers/ClientTokenSet";
import {initAudioContext} from "./modules/voice/objects/AbstractAudio";

export class OpenAudioMc extends Getters {

    constructor() {
        super();

        this.tokenSet = new ClientTokenSet().fromUrl(window.location.href);
        this.notificationModule = new NotificationModule(this);
        this.timeService = new TimeService();
        this.messages = new Messages(this);
        this.userInterfaceModule = new UserInterfaceModule(this);
        this.hueConfiguration = new HueConfigurationModule(this);
        this.hueModule = new HueModule(this, getHueInstance());
        this.mediaManager = new MediaManager(this);
        this.userInterfaceModule.showVolumeSlider(false);
        this.userInterfaceModule.setMessage("Loading proxy..");

        //initialize audio encoding
        initAudioContext();

        this.voiceModule = new VoiceModule(this);

        this.userInterfaceModule.setMessage(this.messages.welcomeMessage);
        this.userInterfaceModule.showVolumeSlider(true);

        this.boot();

        // request a socket service, then do the booting
        const director = new SocketDirector("https://craftmendserver.eu:444");
        if (this.tokenSet != null) director.route()
            .then((host) => {
                this.socketModule = new SocketModule(this, host);
                this.messages.apply();

                // setup packet handler
                new Handlers(this);
            })
            .catch((error) => {
                console.error("Exception thrown", error);
                this.userInterfaceModule.showVolumeSlider(false);
                this.userInterfaceModule.setMessage("Something went wrong. Please try again with a new link.");
                new AlertBox('#alert-area', {
                    closeTime: 20000,
                    persistent: false,
                    hideCloseButton: true,
                    extra: 'warning'
                }).show('A networking error occurred while connecting to the server, please request a new url and try again.');
            });
    }
}

linkBootListeners();
