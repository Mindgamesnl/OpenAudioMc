import {RoomMember} from "./RoomMember";
import {fetch} from "../../../libs/github.fetch";
import {AlertBox} from "../ui/Notification";

export class Room {

    constructor(main, voiceServer, roomId, currentUser, accessToken, memberList) {
        this.main = main;
        this.voiceServer = voiceServer;
        this.roomId = roomId;
        this.accessToken = accessToken;
        this.roomMembers = new Map();
        this.currentUser = currentUser;

        this.isUnsubscribing = false;

        new AlertBox('#call-members', {
            closeTime: 500,
            persistent: false,
            hideCloseButton: true,
        }).show('Loading call..');

        document.getElementById("call-control-box").style.display = "";

        document.getElementById('leave-call-button').onclick = () => {
            this.unsubscribe();
        };

        this.muteMicButtonElement = document.getElementById('mute-microphone');
        this.canToggleMute = true;
        this.muteMicButtonElement.onclick = () => {
            this.toggleMic();
        };

        // loop for members
        memberList.forEach((remoteMember) => {
            this.registerMember(remoteMember.uuid, remoteMember.name);
        });
    }

    toggleMic() {
        let voice = null;
        if (!this.canToggleMute) return;
        this.muteMicButtonElement.disabled = true;
        this.canToggleMute = false;

        // find the broadcaster
        this.roomMembers.forEach((member) => {
            if (member.voiceBroadcast != null) voice = member.voiceBroadcast;
        });

        if (voice.isMuted) {
            this.muteMicButtonElement.innerText = "Mute Microphone";
            voice.unMute();
        } else {
            this.muteMicButtonElement.innerText = "Unmute Microphone";
            voice.mute();
        }


        setTimeout(() => {
            this.muteMicButtonElement.disabled = false;
            this.canToggleMute = true;
        }, 1000);
    }

    unsubscribe() {
        if (this.isUnsubscribing) return;
        this.isUnsubscribing = true;

        new AlertBox('#alert-area', {
            closeTime: 1500,
            persistent: false,
            hideCloseButton: true,
        }).show('Quitting room, please wait.');

        fetch(this.voiceServer.rest + "/leave-room?room=" + this.roomId + "&uuid=" + this.currentUser.uuid + "&accessToken=" + this.accessToken)
            .then((response) => {
                response.json().then((json) => {
                    if (json.results.length !== 0) {
                        // ok
                        // do shutdown stuff
                        this.roomMembers.forEach((member) => {
                            this.handleMemberLeaving(member.uuid);
                        });
                        document.getElementById("call-control-box").style.display = "none";
                        this.main.voiceModule.clearCall();
                    } else {
                        // fuck
                    }
                }).catch((e) => {
                    console.error(e.stack);
                    this.leaveErrorhandler(e);
                });
            }).catch((e) => {
            console.error(e.stack);
            this.leaveErrorhandler(e);
        });
    }

    resubToPlayer(uuid) {
        let client = this.roomMembers.get(uuid);
        client.connectStream();
    }

    handleMemberLeaving(uuid) {
        let member = this.roomMembers.get(uuid);
        if (member == null) return;

        if (member.voiceBroadcast != null) {
            member.voiceBroadcast.shutdown();
            member.voiceBroadcast.changeMicPopup.hide();
        }
        if (member.voiceReceiver != null) member.voiceReceiver.shutdown();
        member.removeCard();
        this.roomMembers.delete(uuid);

        // am i the only member left? then might as well completely fuckoff
        if (this.roomMembers.size === 1) {
            this.unsubscribe();
        }
    }

    leaveErrorhandler(e) {
        new AlertBox('#alert-area', {
            closeTime: 5000,
            persistent: true,
            hideCloseButton: true,
            extra: 'warning'
        }).show('Something went wrong while leaving your wrong. Please try again in a moment.');
        this.isUnsubscribing = false;
    }

    errorHandler(e) {
        new AlertBox('#alert-area', {
            closeTime: 20000,
            persistent: false,
            hideCloseButton: true,
            extra: 'warning'
        }).show('A networking error occurred when loading the voice room.');
        console.error(e);
    }

    registerMember(uuid, name) {
        const roomMember = new RoomMember(this, uuid, name);
        this.roomMembers.set(uuid, roomMember);

        // if it isn't me, lets connect it
        if (uuid != this.currentUser.uuid) {
            roomMember.connectStream();
        } else {
            roomMember.broadcastStream();
        }
    }

}
