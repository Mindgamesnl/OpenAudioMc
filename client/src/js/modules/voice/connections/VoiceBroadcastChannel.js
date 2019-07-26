import {RequestMicrophonePermissions} from "../notifications/RequestMicrophonePermissions";

export class VoiceBroadcastChannel {

    constructor(room) {
        this.room = room;
        this.isRunning = false;
        this.streamer = null;
        this.micId = true;

        this.changeMicPopup = new RequestMicrophonePermissions((micId) => {
            this.shutdown();
            this.start();
            if (micId == null) {
                this.micId = true;
            } else {
                this.micId = micId;
            }
        });
    }

    start() {
        this.streamer = new WSAudioAPI.Streamer({
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
