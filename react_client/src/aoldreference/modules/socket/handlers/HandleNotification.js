import {AlertBox} from "../../ui/Notification";

export function handleNotification(openAudioMc, data) {
    const message = data.message;
    openAudioMc.notificationModule.sendNotification(data.title, message);
    new AlertBox('#alert-area', {
        closeTime: 30000,
        persistent: false,
        hideCloseButton: false,
    }).show(data.title + '<hr />' + message);
}