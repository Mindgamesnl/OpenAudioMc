import {Listener} from "../streaming/Listener";

export class VoiceReceivingChannel {

    constructor(room, roomMember) {
        this.room = room;
        this.roomMember = roomMember;
        this.isStopped = false;
        this.player = new Listener({}, new WebSocket(this.room.voiceServer.ws
            + "/listener?room=" + this.room.roomId
            + "&uuid=" + this.room.currentUser.uuid
            + "&target=" + this.roomMember.uuid
            + "&accessToken=" + this.room.accessToken));

        this.player.start();

        this.setVolume(this.room.main.getMediaManager().masterVolume);
    }

    setVolume(v) {
        if (this.player != null) this.player.setVolume(v / 50);
    }

    shutdown() {
        if (this.isStopped) return;
        this.isStopped = true;
        this.player.stop();
    }

}
