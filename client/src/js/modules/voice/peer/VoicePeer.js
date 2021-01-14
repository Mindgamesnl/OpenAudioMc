import {VoicePeerUi} from "./VoicePeerUi";

export class VoicePeer {

    constructor(openAudioMc, playerName, playerUuid, streamKey) {
        this.openAudioMc = openAudioMc;
        this.playerName = playerName;
        this.playerUuid = playerName;
        this.streamKey = streamKey;

        this.volume = 80;

        // try to load volume, we may still have it
        let oldVol = Cookies.get("vc-volume-of-" + playerName);
        if (oldVol != null) {
            this.volume = parseInt(oldVol);
        }

        // create UI
        this.ui = new VoicePeerUi(playerName, playerUuid, this.volume, (newVolume) => {
            this.volume = newVolume;
            Cookies.set("vc-volume-of-" + playerName, newVolume, { expires: 30 });

            // todo: update actual volume from the stream
        })
    }

    stop() {
        this.ui.remove()
    }

}