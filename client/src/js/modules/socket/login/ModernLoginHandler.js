import {fetch} from "../../../../libs/github.fetch";
import {ReportError} from "../../../helpers/protocol/ErrorReporter";
import {parseStyle} from "../../../helpers/libs/MinecraftColorCodes";
import {oalog} from "../../../helpers/log";
import {replaceProperty} from "../../../helpers/domhelper";

let oldColors = ["#2c78f6", "#4F46E5"]

export function HandleModernLogin(openAudioMc, accept, reject, tokenSet) {

    fetch('https://cloud.openaudiomc.net/api/v3/account-services/client/login/' + tokenSet.publicServerKey )
        .then(function (response) {
            response.json().then(result => {
                // error handling first! because, reasons! alright fuck you just let me do what i want!
                if (result.errors == null || result.errors.length != 0) {
                    reject(result.errors);
                    console.log(result.errors)
                    Swal.fire({
                        title: "error",
                        html: "Something went terribly wrong while opening the OpenAudioMc web client. Please request a new link with /audio and try again",
                        showCloseButton: false,
                        backdrop: '',
                        showCancelButton: false,
                        timerProgressBar: false,
                        allowOutsideClick: false,
                        allowEscapeKey: false,
                        allowEnterKey: false,

                    })
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

                function setBgImage(bg) {
                    document.documentElement.style.setProperty('--background-image', `url("`+bg+`")`);
                }

                window.debugHooks.setBgImage = setBgImage;

                if (background !== "") {
                    // update background dom
                    setBgImage(background)
                }

                const title = response.settings.title;
                const welcomeMessage = response.settings.activeMessage;


                let hello = response.settings.welcomeMessage;
                hello = hello.replace('%name', openAudioMc.tokenSet.name);

                if (!result.response.settings.useTranslations) {
                    openAudioMc.messageModule.setKey("home.welcome", hello)
                    openAudioMc.messageModule.setKey("home.activateText", response.settings.startButton)
                    openAudioMc.messageModule.setKey("home.header", welcomeMessage)
                }

                // replace the default with a defined one
                function convertHexToRGBA(hexCode, opacity) {
                    const tempHex = hexCode.replace('#', '');
                    const r = parseInt(tempHex.substring(0, 2), 16);
                    const g = parseInt(tempHex.substring(2, 4), 16);
                    const b = parseInt(tempHex.substring(4, 6), 16);

                    return `rgba(${r},${g},${b},${opacity / 100})`;
                };

                function setBgColor(col) {
                    // let normal = convertHexToRGBA(response.accentColor, 70)
                    let light = convertHexToRGBA(col, 40)
                    document.documentElement.style.setProperty('--primary-accent', col);
                    // old

                    for (let i = 0; i < oldColors.length; i++) {
                        openAudioMc.getUserInterfaceModule().changeColor(oldColors[i], col);
                    }

                    oldColors = [col]
                }

                setBgColor(response.settings.color)

                window.debugHooks.setBgColor = setBgColor

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
                    "rtc": result.response.rtc,
                    "serverName": result.response.name,
                    "isPatreon": result.response.isPatreon,
                    "countryCode": result.response.countryCode,
                    "useTranslations": result.response.settings.useTranslations
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
