import {fetch} from "../../../libs/github.fetch";

export class SocketDirector {

    constructor(host) {
        this.host = host;
    }

    route() {
        return new Promise((accept, reject) => {
            fetch(this.host + '/proxy')
                .then(function (response) {
                    let result = response.json();
                    // error handling first! because, reasons! alright fuck you just let me do what i want!
                    if (result.errors == null || result.errors.length != 0) {
                        reject(result.errors);
                        return;
                    }

                    // handle the cool things
                    let assignedHost = result.data[0].assignedEndpoints;

                    // loop over them and try to find one with a secure tag
                    // if you cant find one like the blind fuck that you are or the server has no ssl enabled (like a debug env)
                    // then fallback to the first entry
                    let relayHost = null;
                    for (const host of assignedHost) {
                        if (host.secure) relayHost = host.url;
                    }

                    // indeed null? then fallback to 0
                    if (relayHost == null) relayHost = assignedHost[0].url;

                    // complete the promise with the resulted url
                    accept(relayHost);
                })
                .catch(function (ex) {
                    reject(ex);
                });
        });
    }

}
