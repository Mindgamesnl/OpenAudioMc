import "@babel/polyfill";

import {TimeService} from "./modules/socket/TimeService";
import {Messages} from "./modules/ui/Messages";
import {strictlyShowCard, UiCards, UserInterfaceModule} from "./modules/ui/UserInterfaceModule";
import {HueModule} from "./modules/hue/HueModule";
import {MediaManager} from "./modules/media/MediaManager";
import {SocketModule} from "./modules/socket/SocketModule";
import {Handlers} from "./modules/socket/Handlers";
import {HueConfigurationModule} from "./modules/hue/HueConfigurationModule";
import {Getters} from "./helpers/utils/Getters";
import {SocketDirector} from "./modules/socket/SocketDirector";
import {NotificationModule} from "./modules/notifications/NotificationModule";
import ClientTokenSet from "./helpers/libs/ClientTokenSet";
import {getHueInstance} from "./helpers/libs/JsHue";
import {linkBootListeners} from "./helpers/utils/StaticFunctions";
import {WorldModule} from "./modules/world/WorldModule";
import {ReportError} from "./helpers/protocol/ErrorReporter";
import {API_ENDPOINT} from "./helpers/protocol/ApiEndpoints";
import {VoiceModule} from "./modules/voice/VoiceModule";
import {oalog} from "./helpers/log";

export class OpenAudioMc extends Getters {

    constructor() {
        super();
        oalog("Starting build __VERSION__")

        this.canStart = false;
        this.host = null;
        this.background = null;
        this.ambianceSound = "";

        this.tokenSet = new ClientTokenSet().fromCache();

        if (this.tokenSet == null) {
            strictlyShowCard(UiCards.BAD_AUTH);
            return;
        }

        this.notificationModule = new NotificationModule(this);
        this.timeService = new TimeService();
        this.messages = new Messages(this);
        this.userInterfaceModule = new UserInterfaceModule(this);
        this.hueConfiguration = new HueConfigurationModule(this);
        this.mediaManager = new MediaManager(this);
        this.voiceModule = new VoiceModule(this);

        // request a socket service, then do the booting
        const director = new SocketDirector(API_ENDPOINT.MAIN_BACKEND);
        director.route(this)
            .then((res) => {
                this.canStart = true;
                this.host = res.host;
                this.background = res.background;
                this.ambianceSound = res.ambianceSound;
                strictlyShowCard(UiCards.WELCOME);

                let presetVolume = Cookies.get("volume");
                if (presetVolume != null) {
                    this.mediaManager.changeVolume(presetVolume);
                }
            })
            .catch((error) => {
                console.error(error);
                console.error("Exception thrown", error.stack);
                this.userInterfaceModule.kickScreen("Your current URL appears to be invalid. Please request a new one in-game using the /audio command. If this issue if persists please contact a member of staff.")
            });
    }

    start() {
        if (!this.canStart) return;
        this.canStart = false;

        this.world = new WorldModule(this);
        this.hueModule = new HueModule(this, getHueInstance());
        this.socketModule = new SocketModule(this, this.host);
        this.messages.apply();

        this.mediaManager.setupAmbianceSound(this.ambianceSound);

        this.mediaManager.postBoot()

        // setup packet handler
        new Handlers(this);
        if (this.background !== "") {
            document.getElementById("banner-image").src = this.background;
        }

        this.mediaManager.postBoot();
    }

    sendError(message) {
        ReportError(message, this.tokenSet.name);
    }
}

window.onload = linkBootListeners;
window.onhashchange = () => window.location.reload();
