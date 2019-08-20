
import {UserCard} from "./notifications/UserCard";
import {VoiceReceivingChannel} from "./connections/VoiceReceivingChannel";
import {VoiceBroadcastChannel} from "./connections/VoiceBroadcastChannel";

export class RoomMember {

    constructor(room, uuid, name) {
        this.room = room;
        this.uuid = uuid;
        this.name = name;
        this.voiceReceiver = null;
        this.voiceBroadcast = null;
        this.card = new UserCard(room, name, this);
        this.volume = room.main.mediaManager.getMasterVolume();
    }

    removeCard() {
        this.card.hide();
    }

    connectStream() {
        console.log('opening channel')
        this.voiceReceiver = new VoiceReceivingChannel(this.room, this);
        if (this.card.isMuted) this.voiceReceiver.setVolume(0);
    }

    setVolume(v) {
        this.volume = v;
        if (!this.card.isMuted) this.voiceReceiver.setVolume(v);
    }

    muteReceiver() {
        this.voiceReceiver.setVolume(0);
    }

    unmuteReceiver() {
        this.voiceReceiver.setVolume(this.volume);
    }

    broadcastStream() {
        this.voiceBroadcast = new VoiceBroadcastChannel(this.room);
    }

}
