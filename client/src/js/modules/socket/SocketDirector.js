import {fetch} from "../../../libs/github.fetch";
import ClientTokenSet from "../../helpers/libs/ClientTokenSet";
import {parseStyle} from "../../helpers/libs/MinecraftColorCodes";
import {ReportError} from "../../helpers/protocol/ErrorReporter";

export class SocketDirector {

    constructor(host) {
        this.host = host;
    }

    route(openAudioMc) {
        return new Promise((accept, reject) => {

            // cors workaround
            this.tokenSet = new ClientTokenSet().fromUrl(window.location.href);

            fetch(this.host + '/api/v1/client/login/' + this.tokenSet.publicServerKey )

                .then(function (response) {
                    response.json().then(result => {
                        // error handling first! because, reasons! alright fuck you just let me do what i want!
                        if (result.errors == null || result.errors.length != 0) {
                            reject(result.errors);
                            console.log(result.errors)
                            return;
                        }

                        // handle the cool things
                        let response = result.response;

                        if (response.banned) {
                            window.location.href = "https://mindgamesnl.github.io/OpenAudioMc/blocked_domain.html";
                            ReportError("Declined connection due to ban " + window.location.host,"Steve");
                            return;
                        }

                        // loop over them and try to find one with a secure tag
                        // if you cant find one like the blind fuck that
                        // you are or the server has no ssl enabled (like a debug env)
                        // then fallback to the first entry
                        let relayHost = response.secureEndpoint;

                        // indeed null? then fallback to 0
                        if (relayHost == null) relayHost = response.insecureEndpoint;

                        // complete the promise with the resulted url
                        console.log("[OpenAudioMc] accepting and applying settings")

                        openAudioMc.debugPrint("Updating settings...");
                        if (response.backgroundImage != null &&  response.backgroundImage != "") {
                            response.backgroundImage = "https://dark-mouse-53ea.craftmend.workers.dev/corsproxy/?apiurl=" + response.backgroundImage;
                        }
                        const background = response.backgroundImage;
                        const title = response.title;
                        const welcomeMessage = response.clientWelcomeMessage;
                        const errorMessage = response.clientErrorMessage;

                        let errorHtml = "";
                        parseStyle(errorMessage).childNodes.forEach(node => {
                            errorHtml += node.outerHTML;
                        });

                        let welcomeHtml = "";
                        parseStyle(welcomeMessage).childNodes.forEach(node => {
                            welcomeHtml += node.outerHTML;
                        });

                        if (errorMessage !== "") openAudioMc.getMessages().errorMessage = errorHtml;
                        if (welcomeMessage !== "") openAudioMc.getMessages().welcomeMessage = welcomeHtml;

                        let hello = response.greetingMessage;
                        hello = hello.replace('%name', openAudioMc.tokenSet.name);

                        document.getElementById("welcome-text-landing").innerHTML = hello;
                        document.getElementById("boot-button").style.display = "";
                        document.getElementById("boot-button").innerHTML = response.connectButtonText;

                        // replace the default with a defined one
                        openAudioMc.getUserInterfaceModule().changeColor("#304FFE", response.accentColor);

                        if (response.startSound != "") {
                            openAudioMc.getMediaManager().startSound = response.startSound;
                        }

                        if (title !== "default") {
                            document.title = title;
                            try {
                                parent.document.title = title;
                            } catch (e) {

                            }
                        }

                        accept({
                            "host": relayHost,
                            "background": background
                        });
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
