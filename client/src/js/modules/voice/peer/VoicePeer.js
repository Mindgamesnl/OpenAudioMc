import {VoicePeerUi} from "./VoicePeerUi";
import {IncomingVoiceStream} from "./IncomingVoiceStream";

export class VoicePeer {

    constructor(openAudioMc, playerName, playerUuid, streamKey, server) {
        this.openAudioMc = openAudioMc;
        this.playerName = playerName;
        this.playerUuid = playerName;
        this.streamKey = streamKey;
        this.active = true;
        this.ready = false;

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
            if (this.ready) {
                this.stream.setVolume(this.volume);
            }
        })

        this.stream = new IncomingVoiceStream(openAudioMc, server, openAudioMc.voiceModule.streamKey, streamKey);
        this.stream.start(() => {
            // am I actually too late?
            if (!this.active) {
                this.stream.stop();
                return
            }

            this.stream.setVolume(this.volume);
            this.ready = true;
        })
    }

    stop() {
        this.active = false;
        this.ui.remove()
        if (this.stream != null) {
            this.stream.stop();
        }
    }

}
