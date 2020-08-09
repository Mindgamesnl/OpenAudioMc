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
            this.tokenSet = new ClientTokenSet().fromCache();

            fetch('https://cloud.openaudiomc.net/api/v2/account-services/client/login/' + this.tokenSet.publicServerKey )

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
                            ReportError("Declined connection due to ban " + window.location.host,"Steve");
                            window.location.href = "https://mindgamesnl.github.io/OpenAudioMc/blocked_domain.html";
                            return;
                        }

                        // loop over them and try to find one with a secure tag
                        // if you cant find one like the blind fuck that
                        // you are or the server has no ssl enabled (like a debug env)
                        // then fallback to the first entry
                        let relayHost = response.secureEndpoint;
                        let ambianceSound = response.ambianceSound;

                        // indeed null? then fallback to 0
                        if (relayHost == null) relayHost = response.insecureEndpoint;

                        // complete the promise with the resulted url
                        console.log("[OpenAudioMc] accepting and applying settings")

                        openAudioMc.debugPrint("Updating settings...");
                        if (response.backgroundImage != null &&  response.backgroundImage != "") {
                            response.backgroundImage = "https://dark-mouse-53ea.craftmend.workers.dev/corsproxy/?apiurl=" + response.backgroundImage;
                        }
                        const background = response.backgroundImage;

                        if (background !== "") {
                            document.getElementById("banner-image").src = background;
                        }

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

                        document.getElementById("initialize-text").innerHTML = hello;
                        document.getElementById("initialize-button").innerHTML = response.connectButtonText;

                        // replace the default with a defined one
                        function convertHexToRGBA(hexCode, opacity) {
                            const tempHex = hexCode.replace('#', '');
                            const r = parseInt(tempHex.substring(0, 2), 16);
                            const g = parseInt(tempHex.substring(2, 4), 16);
                            const b = parseInt(tempHex.substring(4, 6), 16);

                            return `rgba(${r},${g},${b},${opacity / 100})`;
                        };



                        document.documentElement.style.setProperty('--border-color-dark', response.accentColor);
                        let normal = convertHexToRGBA(response.accentColor, 70)
                        let light = convertHexToRGBA(response.accentColor, 40)
                        document.documentElement.style.setProperty('--border-color-normal', normal);
                        document.documentElement.style.setProperty('--border-color-light', light);
                        console.log("new value " + light)

                        openAudioMc.getUserInterfaceModule().changeColor("#2c78f6", response.accentColor);

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
                            "background": background,
                            "ambianceSound": ambianceSound
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
