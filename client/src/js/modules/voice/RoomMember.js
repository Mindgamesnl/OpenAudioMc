import {VoiceReceivingChannel} from "./connections/VoiceReceivingChannel";
import {VoiceBroadcastChannel} from "./connections/VoiceBroadcastChannel";
import {UserCard} from "./notifications/UserCard";

export class RoomMember {

    constructor(room, uuid, name) {
        this.room = room;
        this.uuid = uuid;
        this.name = name;
        this.voiceReceiver = null;
        this.voiceBroadcast = null;
        this.card = new UserCard(name);
    }

    removeCard() {
        this.card.hide();
    }

    connectStream() {
        this.voiceReceiver = new VoiceReceivingChannel(this.room, this);
    }

    broadcastStream() {
        this.voiceBroadcast = new VoiceBroadcastChannel(this.room);
    }

}
