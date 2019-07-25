export class VoiceBroadcastChannel {

    constructor(room) {
        this.room = room;
        this.isRunning = false;
        this.streamer = null;
        this.start();
    }

    start() {
        this.streamer = new WSAudioAPI.Streamer({}, new WebSocket(this.room.voiceServer.ws
            + "/stream?room=" + this.room.roomId
            + "&uuid=" + this.room.currentUser.uuid
            + "&accessToken=" + this.room.accessToken));

        this.streamer.start();

        this.isRunning = true;
    }

    shutdown() {
        this.streamer.stop();
        this.isRunning = false;
    }

}
