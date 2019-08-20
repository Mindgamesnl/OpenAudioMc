import {AlertBox} from "../../ui/Notification";

export class UserCard extends AlertBox {

    constructor(room, username, member) {
        super('#call-members', {
            closeTime: 60000,
            persistent: true,
            hideCloseButton: true,
        });

        this.room = room;
        this.username = username;
        this.isMuted = false;
        this.member = member;

        let content = '<img class="call-box" src="https://minotar.net/avatar/' + username + '" />';
        content += '<div class="call-content" id="user-box-content-'+username+'">';
        content += '<div style="text-align: center;"><p>(loading)</p></div>';
        content += "</div>";

        this.show(content, true);


        this.setUsernameAsContent();

        // on mouse enter
        document.getElementById("user-box-content-"+ this.username).onmouseenter = () => {
            this.setStateAsContent();
        };

        // on mouse leave
        document.getElementById("user-box-content-"+ this.username).onmouseout = () => {
            this.setUsernameAsContent();
        };

        document.getElementById("user-box-content-"+ this.username).onclick = () => {
            if (this.room.main.tokenSet.name !== this.username) {
                this.onClickHandler();
            }
        };
    }

    onClickHandler() {
        if (this.isMuted) {
            // unmute
            document.getElementById("user-box-content-"+ this.username).classList.remove('mutedUser');
            this.member.unmuteReceiver();
        } else {
            // mute
            document.getElementById("user-box-content-"+ this.username).classList.add('mutedUser');
            this.member.muteReceiver();
        }
        this.isMuted = !this.isMuted;
        this.setStateAsContent();
    }

    setStateAsContent() {
        if (this.room.main.tokenSet.name === this.username) {
            return;
        }

        if (this.isMuted) {
            document.getElementById("user-box-content-"+ this.username).innerHTML = '<div class="pointer-event" style="text-align: center;"><p><i>click to unmute</i></p></div>';
        } else {
            document.getElementById("user-box-content-"+ this.username).innerHTML = '<div class="pointer-event" style="text-align: center;"><p><i>click to mute</i></p></div>';
        }
    }

    setUsernameAsContent() {
        document.getElementById("user-box-content-"+ this.username).innerHTML = '<div class="pointer-event" style="text-align: center;"><p>' + this.username + '</p></div>';
    }

}
