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

        this.show('You have a incoming call with ' + readableNames + '.<br />' +
            '<div style="text-align: center;"><a id="call-accept-button" style="background: limegreen" class="alert-message-button">Accept Call</a><a style="background: red" id="call-deny-button" class="alert-message-button">Deny Call</a></div>' +
            '<br /><hr /><label class="container"><input type="checkbox" id="auto-join-call-or-not">Automatically join future calls this sesssion</label>');

        let ignored = false;

        document.getElementById('call-accept-button').onclick = () => {
            ignored = true;
            this.hide(this);
            new AlertBox('#alert-area', {
                closeTime: 1500,
                persistent: false,
                hideCloseButton: true,
            }).show('Starting call.');
            setTimeout(() => {
                onAccept();
            }, 1000);
        };

        document.getElementById('auto-join-call-or-not').onclick = () => {
            console.log('auto join is set to ' + document.getElementById('auto-join-call-or-not').checked)
            Cookies.set('auto-join-call', document.getElementById('auto-join-call-or-not').checked)
        };

        if (Cookies.get('auto-join-call') === "true") {
            ignored = true;
            document.getElementById('call-accept-button').click();
        }

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
