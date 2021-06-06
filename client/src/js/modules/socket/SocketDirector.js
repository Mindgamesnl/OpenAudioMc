import ClientTokenSet from "../../helpers/libs/ClientTokenSet";
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

            if (this.tokenSet.scope === "ACCOUNT") {
                oalog("Using account based profile system...")
                HandleModernLogin(openAudioMc, accept, reject, this.tokenSet)
            }
        });
    }

}
