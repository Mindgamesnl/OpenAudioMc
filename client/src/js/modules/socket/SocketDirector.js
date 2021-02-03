import ClientTokenSet from "../../helpers/libs/ClientTokenSet";
import {HandleLegacyLogin} from "./login/LegacyLoginHandler";
import {HandleModernLogin} from "./login/ModernLoginHandler";
import {oalog} from "../../helpers/log";

export class SocketDirector {

    constructor(host) {
        this.host = host;
    }

    route(openAudioMc) {
        return new Promise((accept, reject) => {

            // cors workaround
            this.tokenSet = new ClientTokenSet().fromCache();

            if (this.tokenSet === "LEGACY") {
                oalog("Using LEGACY profile system...")
                HandleLegacyLogin(openAudioMc, accept, reject, this.tokenSet)
            } else {
                oalog("Using account based profile system...")
                HandleModernLogin(openAudioMc, accept, reject, this.tokenSet)
            }
        });
    }

}
