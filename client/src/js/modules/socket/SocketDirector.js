import {fetch} from "../../../libs/github.fetch";
import UrlReader from "../../helpers/UrlReader";

export class SocketDirector {

    constructor(host) {
        this.host = host;
    }

    route() {
        return new Promise((accept, reject) => {

            // cors workaround
            const params = UrlReader.getParametersFromUrl(window.location.href.split('?')[1]);

            fetch(this.host + '/proxy?referer=' + params.data )
                .then(function (response) {
                    response.json().then(result => {
                        // error handling first! because, reasons! alright fuck you just let me do what i want!
                        if (result.errors == null || result.errors.length != 0) {
                            reject(result.errors);
                            console.log('dead end 0')
                            return;
                        }

                        // handle the cool things
                        let assignedHost = result.data[0].assignedEndpoints;

                        // loop over them and try to find one with a secure tag
                        // if you cant find one like the blind fuck that
                        // you are or the server has no ssl enabled (like a debug env)
                        // then fallback to the first entry
                        let relayHost = null;
                        for (const host of assignedHost) {
                            if (host.secure) relayHost = host.url;
                        }

                        // indeed null? then fallback to 0
                        if (relayHost == null) relayHost = assignedHost[0].url;

                        // complete the promise with the resulted url
                        console.log("accepting")
                        accept(relayHost);
                    })
                        .catch((e => {
                            console.log('Dead end 1')
                            reject(e);
                        }));
                })
                .catch(function (ex) {
                    console.log('Dead end 2')
                    reject(ex);
                });
        });
    }

}
