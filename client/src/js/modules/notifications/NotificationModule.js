import {AlertBox} from "../ui/Notification";

export class NotificationModule {

    constructor() {
        if ("Notification" in window) {
            this.setupPermissions();
        }
    }


    setupPermissions() {
        if (Notification.permission === "granted") return;

        if (Notification.permission !== "denied") {
            new AlertBox('#alert-area', {
                closeTime: 20000,
                persistent: true,
                hideCloseButton: false,
            }).show(
                '<b>Tip</b> you can enable push notifications to get notified when you get a call or the server sends you a message. To get them setup, <a id="noti-perm-request-link"><u><i>click here</i></u></a>'
            );

            document.getElementById('noti-perm-request-link').onclick = () => {
                this.requestNotificationPermissions();
            }
        }
    }

    sendNotification(main, title, body) {
        new Notification(title, {
            body,
            icon: "https://minotar.net/avatar/" + main.tokenSet.name
        });
    }

    requestNotificationPermissions() {
        Notification.requestPermission().then((permission) => {
            // If the user accepts, let's create a notification
            if (permission === "granted") {
                this.sendNotification(openAudioMc,"Testing testing 123", "It worked! you have configured Notifications correctly!");
            }
        });
    }

}

