import {AlertBox} from "../../ui/Notification";

export class AcceptCallNotification {

    constructor(main, members, onAccept, onDeny) {
        let names = [];
        members.forEach(member => {
            if (member != main.tokenSet.name) names.push(member);
        });

        main.notificationModule.sendNotification("Incoming call!", "Please see your web client for more information, and to accept or deny.");

        let readableNames = names.join(', ').replace(/,(?=[^,]*$)/, ' and');

        document.getElementById("call-modal-text").innerText = 'You have a incoming call with ' + readableNames;
            document.getElementById('call-modal').style.display = '';
        document.getElementById('modal-overlay').style.display = '';

        this.ignored = false;

        document.getElementById('call-accept-button').onclick = () => {
            this.ignored = true;
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
            this.ignored = true;
            document.getElementById('call-accept-button').click();
        }

        let ignoreCallFunction = () => {
            if (this.ignored) return;
            this.ignored = true;
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

    hide() {
        document.getElementById('call-modal').style.display = 'none';
        document.getElementById('modal-overlay').style.display = 'none';
    }

}
