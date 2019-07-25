import {AlertBox} from "../ui/Notification";

export class NotificationModule {

    constructor(main) {
        this.main = main;
        this.requestBox = null;
        if ("Notification" in window) {
            this.setupPermissions();
        }
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
                '<div style="text-align: center;"><b>Welcome!</b> you can enable push notifications to get notified when you get a call or the server sends you a message. To get them setup, press the button below.' +
                '<br/><br/><a id="noti-perm-request-link" class="alert-message-button">Setup</a></div>'
            );

            document.getElementById('noti-perm-request-link').onclick = () => {
                this.requestNotificationPermissions();
            }
        }
    }

    sendNotification(title, body) {
        new Notification(title, {
            body,
            icon: "https://minotar.net/avatar/" + this.main.tokenSet.name
        });
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
                    "Hurray! you'll now receive notifications"
                );
                this.sendNotification("Testing testing 123", "It worked! you have configured Notifications correctly!");
            }
        });
    }

}

