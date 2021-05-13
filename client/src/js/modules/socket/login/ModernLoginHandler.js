import {fetch} from "../../../../libs/github.fetch";
import {ReportError} from "../../../helpers/protocol/ErrorReporter";
import {parseStyle} from "../../../helpers/libs/MinecraftColorCodes";
import {oalog} from "../../../helpers/log";

export function HandleModernLogin(openAudioMc, accept, reject, tokenSet) {

    fetch('https://cloud.openaudiomc.net/api/v3/account-services/client/login/' + tokenSet.publicServerKey )
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

                if (response.settings.banned) {
                    ReportError("Declined connection due to ban " + window.location.host,"Steve", function () {
                        window.location.href = "https://help.openaudiomc.net/blocked_domain.html";
                    })
                    return;
                }

                let relayHost = response.secureEndpoint;

                oalog("accepting and applying settings")
                let ambianceSound = response.settings.ambianceSound;

                if (response.settings.backgroundImage != null &&  response.settings.backgroundImage != "") {
                    response.settings.backgroundImage = "https://media.openaudiomc.net/proxy?apiurl=" + response.settings.backgroundImage;
                }
                const background = response.settings.backgroundImage;

                if (background !== "") {
                    document.getElementById("banner-image").src = background;
                }

                const title = response.settings.title;
                const welcomeMessage = response.settings.activeMessage;
                const errorMessage = response.settings.errorMessage;

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

                let hello = response.settings.welcomeMessage;
                hello = hello.replace('%name', openAudioMc.tokenSet.name);

                document.getElementById("initialize-text").innerHTML = hello;
                document.getElementById("initialize-button").innerHTML = response.settings.startButton;

                // replace the default with a defined one
                function convertHexToRGBA(hexCode, opacity) {
                    const tempHex = hexCode.replace('#', '');
                    const r = parseInt(tempHex.substring(0, 2), 16);
                    const g = parseInt(tempHex.substring(2, 4), 16);
                    const b = parseInt(tempHex.substring(4, 6), 16);

                    return `rgba(${r},${g},${b},${opacity / 100})`;
                };



                document.documentElement.style.setProperty('--border-color-dark', response.settings.color);
                // let normal = convertHexToRGBA(response.accentColor, 70)
                let light = convertHexToRGBA(response.settings.color, 40)
                document.documentElement.style.setProperty('--border-color-normal', response.settings.color);
                document.documentElement.style.setProperty('--border-color-light', light);

                // old
                openAudioMc.getUserInterfaceModule().changeColor("#2c78f6", response.settings.color);

                // modern from tailwind
                openAudioMc.getUserInterfaceModule().changeColor("#4F46E5", response.settings.color);

                if (response.settings.startSound != "") {
                    openAudioMc.getMediaManager().startSound = response.settings.startSound;
                }

                if (title !== "default") {
                    document.title = title;
                    try {
                        parent.document.title = title;
                    } catch (e) {

                    }
                }

                oalog("Logging into " + response.name + " with " + response.playerCount + " online player(s)")

                accept({
                    "fromCache": result.fromCache,
                    "host": relayHost,
                    "background": background,
                    "ambianceSound": ambianceSound,
                    "playerCount": result.response.playerCount,
                    "claimed": result.response.claimed,
                    "rtc": result.response.rtc
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

}
