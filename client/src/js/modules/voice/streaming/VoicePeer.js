import {VoicePeerUi} from "../ui/VoicePeerUi";
import {IncomingVoiceStream} from "./IncomingVoiceStream";
import {Interpolator, MAGIC_SCHEDULE_VALUES} from "../../../helpers/math/Interpolator";
import {Vector3} from "../../../helpers/math/Vector3";

export class VoicePeer {

    constructor(openAudioMc, playerName, playerUuid, streamKey, server, location) {
        this.openAudioMc = openAudioMc;
        this.playerName = playerName;
        this.playerUuid = playerName;
        this.streamKey = streamKey;
        this.interpolator = new Interpolator();
        this.active = true;
        this.ready = false;
        this.location = location;

        this.volume = 80;

        // try to load volume, we may still have it
        let oldVol = Cookies.get("vc-volume-of-" + playerName);
        if (oldVol != null) {
            this.volume = parseInt(oldVol);
        }

        // create UI
        this.ui = new VoicePeerUi(this.openAudioMc, playerName, playerUuid, this.volume, (newVolume) => {
            this.volume = newVolume;
            Cookies.set("vc-volume-of-" + playerName, newVolume, { expires: 30 });
            if (this.ready) {
                this.stream.setVolume(this.volume);
            }
        }, this);

        this.stream = new IncomingVoiceStream(openAudioMc, server, openAudioMc.voiceModule.streamKey, streamKey, this.volume, this.ui);
        this.stream.setLocation(location.x, location.y, location.z, false);
        this.stream.start(() => {
            // am I actually too late?
            if (!this.active) {
                this.stop();
                return
            }

            this.stream.setVolume(this.volume);
            this.ready = true;
        })

        this.openAudioMc.streamerLink.announceVoicePeerJoin(this)
    }

    updateLocation(x, y, z) {
        this.interpolator.onMove = (l, p, y) => {
            this.stream.setLocation(l.x, l.y, l.z, true);
        }
        this.interpolator.interpolate(new Vector3(x, y, z), 90, 90, MAGIC_SCHEDULE_VALUES.VC_LOCATION_UPDATES);
    }

    stop() {
        // remove stream
        this.openAudioMc.streamerLink.announceVoicePeerLeave(this)
        if (this.openAudioMc.voiceModule.peerManager != null) {
            this.openAudioMc.voiceModule.peerManager.dropStream(this.streamKey)
        }
        this.active = false;
        this.ui.remove();
        if (this.stream != null) {
            this.stream.stop();
        }
    }

}
