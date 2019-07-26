import {Room} from "./Room";
import {AcceptCallNotification} from "./notifications/AcceptCallNotification";
import {AlertBox} from "../ui/Notification";
import {fetch} from "../../../libs/github.fetch";

export class VoiceModule {

    constructor(main) {
        this.room = null;
        this.main = main;
        this.currentUser = main.currentUser;;
    }

    promptCall(server, roomId, token, memberNames, memberList) {
        if (this.room == null) {
            new AcceptCallNotification(this.main, memberNames,
                // on accept
                () => {
                    this.room = new Room(this.main, server, roomId, this.main.tokenSet, token, memberList);
                },

                // on deny
                () => {
                    // dan nie! send terug naar de server, dan nie
                    fetch(this.voiceServer.rest + "/leave-room?room=" + roomId + "&uuid=" + this.currentUser.uuid + "&accessToken=" + token)
                        .then((response) => {
                            response.json().then((json) => {
                                if (json.results.length != 0) {
                                    console.log("cancelled call");
                                } else {
                                    // fuck
                                    this.leaveErrorhandler('denied request');
                                }
                            }).catch((e) => {
                                this.leaveErrorhandler(e);
                            });
                        }).catch((e) => {
                        this.leaveErrorhandler(e);
                    });
                });
        } else {
            new AlertBox('#alert-area', {
                closeTime: 20000,
                persistent: false,
                hideCloseButton: false,
                extra: 'warning'
            }).show('You just got invited to another call, but you are already chitter-chatting. There for your new call request was ignored. You can always leave this call and request another invite.');
        }
    }

    leaveErrorhandler(e) {
        new AlertBox('#alert-area', {
            closeTime: 5000,
            persistent: true,
            hideCloseButton: true,
            extra: 'warning'
        }).show('Failed to cancel call. Please try again in a moment.');
    }

    handleSocketClosed() {
        if (this.room == null) return;
        this.room.unsubscribe();
    }

    setVolume(master) {
        if (this.room != null) {
            this.room.roomMembers.forEach((member, id) => {
                if (member.voiceReceiver != null) {
                    member.voiceReceiver.setVolume(master);
                }
            });
        }
    }

}
