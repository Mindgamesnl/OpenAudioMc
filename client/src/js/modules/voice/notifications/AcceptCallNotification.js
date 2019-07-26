import {AlertBox} from "../../ui/Notification";

export class AcceptCallNotification extends AlertBox {

    constructor(main, members, onAccept, onDeny) {
        let names = [];
        members.forEach(member => {
            if (member != main.tokenSet.name) names.push(member);
        });

        super('#alert-area', {
            closeTime: 60000,
            persistent: false,
            hideCloseButton: true,
        });

        main.notificationModule.sendNotification("Incoming call!", "Please see your web client for more information, and to accept or deny.");

        let readableNames = names.join(', ').replace(/,(?=[^,]*$)/, ' and');

        this.show('You have a incoming call with ' + readableNames + '.<hr /><a id="call-accept-button" class="alert-message-button">Accept Call</a> or <a id="call-deny-button" class="alert-message-button">Deny Call</a>');

        document.getElementById('call-accept-button').onclick = () => {
            ignored = true;
            this.hide(this);
            new AlertBox('#alert-area', {
                closeTime: 1500,
                persistent: false,
                hideCloseButton: true,
            }).show('Starting call.');
            onAccept();
        };

        let ignored = false;

        let ignoreCallFunction = () => {
            if (ignored) return;
            ignored = true;
            this.hide(this);
            new AlertBox('#alert-area', {
                closeTime: 1500,
                persistent: false,
                hideCloseButton: true,
            }).show('Ignored call.');
            onDeny();
        };

        this.onTimeout = ignoreCallFunction;

        document.getElementById('call-deny-button').onclick = ignoreCallFunction;
    }

}
