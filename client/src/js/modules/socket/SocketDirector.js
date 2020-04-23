import {fetch} from "../../../libs/github.fetch";
import UrlReader from "../../helpers/UrlReader";
import ClientTokenSet from "../../helpers/ClientTokenSet";
import {parseStyle} from "../../helpers/MinecraftColorCodes";
import {Channel} from "../media/objects/Channel";
import {Sound} from "../media/objects/Sound";

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

                        // loop over them and try to find one with a secure tag
                        // if you cant find one like the blind fuck that
                        // you are or the server has no ssl enabled (like a debug env)
                        // then fallback to the first entry
                        let relayHost = response.secureEndpoint;

                        // indeed null? then fallback to 0
                        if (relayHost == null) relayHost = response.insecureEndpoint;

                        // complete the promise with the resulted url
                        console.log("accepting and applying settings")

                        openAudioMc.debugPrint("Updating settings...");
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

                        if (background !== "") {
                            document.getElementById("page").style = "vertical-align: middle;\n" +
                                "    background:\n" +
                                "            url(" + background + ");\n" +
                                "    -webkit-background-size: cover;\n" +
                                "    background-size: cover;"
                        }

                        // replace the default with a defined one
                        openAudioMc.getUserInterfaceModule().changeColor("#304FFE", response.accentColor);

                        if (response.startSound != "") {
                            const createdChannel = new Channel("startsound");
                            const createdMedia = new Sound(response.startSound);
                            createdMedia.openAudioMc = openAudioMc;
                            createdMedia.setOa(openAudioMc);
                            createdMedia.finalize().then(ready => {
                                openAudioMc.getMediaManager().mixer.addChannel(createdChannel);
                                createdChannel.addSound(createdMedia);
                                createdChannel.setChannelVolume(100);
                                createdChannel.updateFromMasterVolume();
                                createdMedia.finish();
                            });
                        }

                        if (title !== "default") {
                            document.title = title;
                        }

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
