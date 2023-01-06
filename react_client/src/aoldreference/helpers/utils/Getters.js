import {Boot} from "./Boot";
import {oalog} from "../log";

export class Getters extends Boot {
    log(message) {
        oalog(message);
    }

    getMessages() {
        return this.messages;
    }

    getTimeService() {
        return this.timeService;
    }

    getHueConfiguration() {
        return this.hueConfiguration;
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
