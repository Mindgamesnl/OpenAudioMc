import UrlReader from "../protocol/UrlReader";
import {fetch} from "../../../libs/github.fetch";
import {API_ENDPOINT} from "../protocol/ApiEndpoints";
import { Log } from '../utils/log'
import {oalog} from "../log";

export default class ClientTokenSet {

    constructor(publicServerKey, playerUUID, playerName, playerToken, scope) {
        this.publicServerKey = publicServerKey;
        this.uuid = playerUUID;
        this.name = playerName;
        this.token = playerToken;
        this.scope = scope;
        this.attempts = 0;
    }

    initialize() {
        return new Promise((resolve => {
            let url = window.location.href;
            if (url == null) {
                resolve(null);
                return
            }
            if (url.split('?').length >= 2) {
                const params = UrlReader.getParametersFromUrl(url.split('?')[1]);

                // if the params does not contain shit, dont return shit either
                // fuck off
                if (params.data == null) {
                    resolve(null);
                    return
                }

                let query = atob(params.data).split(":");

                // validate all data
                if (query.length !== 4) {
                    resolve(null);
                    return null;
                } // must be 4 arguments
                const playerName = query[0];
                const playerUuid = query[1];
                const serverUuid = query[2];
                const playerToken = query[3];

                // validate the given data
                if (!(playerName != null && playerName.length <= 16 && // player name cant be null and must be 16 chars or less
                    playerUuid != null && playerUuid.length <= 40 &&   // player uuid cant be null or less than 40 char
                    serverUuid != null && serverUuid.length <= 40 &&   // server uuid cant be null or less than 40 char
                    playerToken != null && playerToken.length <= 5)) { // player token cant be null or less than 5 char
                    resolve(null);
                }

                // all appears to be okay! thats good! give a session
                const out = new ClientTokenSet(serverUuid, playerUuid, playerName, playerToken)
                window.tokenCache = out;
                resolve(out);
            } else if (url.split('#').length >= 2) {
                // try to load via fetch
                let token = url.split('#')[1];
                fetch(API_ENDPOINT.CLIENT_SESSION_SERVER + "?token=" + token)
                    .then(body => {
                        body.json().then(sessionValidationResponse => {

                            if (sessionValidationResponse.errors.length > 0) {
                                if (this.attempts < 3) {
                                    oalog("Failed to load session, trying again in a bit.")
                                    setTimeout(() => {
                                        // try again
                                        this.requestWasPreviouslyAttempted = true;
                                        this.initialize()
                                            .then(resolve)
                                        this.attempts++;
                                    }, 1000)
                                } else {
                                    console.log("Session error")
                                    resolve(null);
                                }
                                return
                            }
                            let ses = sessionValidationResponse.response;

                            if (ses.hasOwnProperty("serverIdentity") != null) {
                                // HandleServerIdentity(ses.serverIdentity, ses.playerName).then(r => console.log).catch(e => console.log)
                            } else {
                                Log("No identity to fetch")
                                document.getElementById('top-head').src = 'https://minotar.net/helm/' + ses.playerName
                            }

                            const out = new ClientTokenSet(ses.publicKey, ses.playerUuid, ses.playerName, ses.session, ses.scope)
                            window.tokenCache = out;
                            resolve(out);
                        }).catch(e => {
                            console.error(e);
                        });
                    })
                    .catch(error => {
                        console.error(error);
                    });
            } else {
                resolve(null);
            }
        }));
    }

    fromCache() {
        if (window.tokenCache != null) {
            return window.tokenCache;
        }
        throw new Error("No token cache in window.");
    }

}
