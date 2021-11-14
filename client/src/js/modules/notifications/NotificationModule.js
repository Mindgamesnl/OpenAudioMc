import {AlertBox} from "../ui/Notification";
import {CallAfterDomUpdate} from "../../helpers/domhelper";

export class NotificationModule {

    constructor(main) {
        this.main = main;
        this.requestBox = null;
    }

    setupPermissions() {
        if (Notification.permission === "granted") return;

        if (Notification.permission !== "denied") {
            this.requestBox = new AlertBox('#alert-area', {
                closeTime: 60000,
                persistent: false,
                hideCloseButton: true,
            });

            this.requestBox.show(
                getMessageString("notification.setup")
            );

            CallAfterDomUpdate(() => {
                document.getElementById('noti-perm-request-link').onclick = () => {
                    this.requestNotificationPermissions();
                }
            })
        }
    }

    sendNotification(title, body, playerId = null) {
        if (playerId == null) {
            playerId = this.main.tokenSet.uuid
        }
        new Notification(title, {
            body,
            icon: "https://minotar.net/helm/" + playerId
        });

        new AlertBox('#alert-area', {
            closeTime: 60000,
            persistent: false,
            hideCloseButton: true,
        }).show('<div style="text-align: center;" class="medium-text">' + body + '</div>');
    }

    requestNotificationPermissions() {
        Notification.requestPermission().then((permission) => {
            // If the user accepts, let's create a notification
            if (permission === "granted") {
                this.requestBox.hide();
                new AlertBox('#alert-area', {
                    closeTime: 1500,
                    persistent: false,
                    hideCloseButton: true,
                }).show(
                    getMessageString("notification.success")
                );
                this.sendNotification(getMessageString("notification.test.title"), getMessageString("notification.test.body"));
            }
        });
    }

}

