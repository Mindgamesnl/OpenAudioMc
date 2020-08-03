import {AlertBox} from "../../ui/Notification";

export function handleProtocolVersion(openAudioMc, data) {
    const revision = parseInt(data.protocolRevision);

    console.log("[OpenAudioMc] Received PROTOCOL revision update");
    if (revision >= 2) {
        // enable callbacks
        console.log("[OpenAudioMc] PROTO rev => 2, enabling callbacks");
        openAudioMc.socketModule.callbacksEnabled = true;
    }

    if (revision >= 3) {
        // enable callbacks
        console.log("[OpenAudioMc] PROTO rev => 3, enabling youtube callbacks");
        openAudioMc.socketModule.supportsYoutube = true;
    }

    // outdated? lets check it
    if (revision < 3) {
        this.requestBox = new AlertBox('#alert-area', {
            closeTime: 60000,
            persistent: false,
            hideCloseButton: true,
        });

        this.requestBox.show(
            '<div style="text-align: center;"><b>Warning!</b> Your installation of OpenAudioMc seems to be pretty outdated. Please download the most recent version from Spigot and install it in your server.' +
            '<br/><br/><a href="https://www.spigotmc.org/resources/openaudiomc-music-speakers-regions-bungeecord.30691/" class="alert-message-button">Download page</a></div>'
        );
    }
}