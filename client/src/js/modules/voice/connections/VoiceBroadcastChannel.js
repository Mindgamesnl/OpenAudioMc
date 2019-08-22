import {RequestMicrophonePermissions} from "../notifications/RequestMicrophonePermissions";
import {Streamer} from "../streaming/Streamer";

export class VoiceBroadcastChannel {

    constructor(room) {
        this.room = room;
        this.isRunning = false;
        this.streamer = null;
        this.micId = true;
        this.isMuted = false;

        this.changeMicPopup = new RequestMicrophonePermissions((micId) => {
            this.shutdown();
            setTimeout(() => {
                if (micId == null) {
                    this.micId = true;
                } else {
                    this.micId = micId;
                }
                this.start();
            }, 5000);
        });
    }

    mute() {
        this.isMuted= true;
        this.streamer.mute();
    }

    unMute() {
        this.isMuted= false;
        this.streamer.unMute();
    }

    start() {
        this.streamer = new Streamer({
            'micId': this.micId
        }, new WebSocket(this.room.voiceServer.ws
            + "/stream?room=" + this.room.roomId
            + "&uuid=" + this.room.currentUser.uuid
            + "&accessToken=" + this.room.accessToken));

        this.streamer.start();

        this.isRunning = true;
    }

    shutdown() {
        if (this.streamer != null) this.streamer.stop();
        this.isRunning = false;
    }

}
