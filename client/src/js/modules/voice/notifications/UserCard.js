import {AlertBox} from "../../ui/Notification";

export class UserCard extends AlertBox {

    constructor(username) {
        super('#alert-area-left', {
            closeTime: 60000,
            persistent: true,
            hideCloseButton: true,
        });

        let content = '<div class="call-box" style="background-image: url(https://minotar.net/avatar/' + username + ');">';
        content += "</div>";
        content += '<div class="call-content">';
        content += '<div style="text-align: center;"><p>' + username + '</p></div>';
        content += "</div>";

        this.show(content);
    }

}
