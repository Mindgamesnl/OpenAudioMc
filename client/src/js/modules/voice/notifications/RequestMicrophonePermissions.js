import {AlertBox} from "../../ui/Notification";

export class RequestMicrophonePermissions extends AlertBox {

    constructor(defaultMic) {

        super('#alert-area', {
            closeTime: 60000,
            persistent: true,
            hideCloseButton: true,
        });


        let microphones = [];
        let failPermissions = false;

        navigator.mediaDevices.enumerateDevices()
            .then((devices) => {
                for (const device of devices) {
                    if (device.kind == "audioinput") {
                        if (device.label === "") {
                            failPermissions = true;
                        } else {
                            microphones.push({
                                "name": device.label,
                                "id": device.deviceId
                            })
                        }
                    }
                }
            })
            .then(() => {
                if (failPermissions) {
                    this.show('<div style="text-align: center;">OpenAudioMc requires Microphone permissions in order to setup voice calls<br /><br />' +
                        '<a id="request-mic-permissions" class="alert-message-button">Request Permissions</a> ' +
                        '</div>');

                    document.getElementById('request-mic-permissions').onclick = () => {
                        navigator.mediaDevices.getUserMedia({ audio: true })
                            .then((stream) => {
                                // retry the popup
                                stream.getTracks()[0].stop();
                                new RequestMicrophonePermissions(defaultMic);
                            })
                            .catch((err) => {
                                console.log(err);
                                this.hide();
                                this.deniedMessage();
                                defaultMic(null);
                            });
                    }
                } else {
                    if (this.requestBox != null) this.requestBox.hide();

                    // create dropdown
                    let dropdown = '<select id="select-mic-dropdown" class="alert-message-button">';
                    for (const mic of microphones) {
                        dropdown += '<option value="' + mic.id + '">' + mic.name + '</option>';
                    }
                    dropdown += '</select>';

                    this.show('<div style="text-align: center;">What microphone would you like to use in this voicecall?' +
                        '<br /><small>changes can take a second or two to apply</small><br />' + dropdown + '</div>');

                    // if default, set it!
                    if (Cookies.get('default-mic') != null) {
                        let select = document.getElementById('select-mic-dropdown');
                        for(var i = 0;i < select.options.length;i++){
                            if(select.options[i].innerText == Cookies.get('default-mic')){
                                select.options[i].selected = true;
                            }
                        }
                    }

                    document.getElementById('select-mic-dropdown').onchange = (value) => {
                        document.getElementById('select-mic-dropdown').disabled = true;
                        Cookies.set('default-mic', value.target.selectedOptions[0].childNodes[0].data);
                        defaultMic(this.getId());

                        setTimeout(() => {
                            document.getElementById('select-mic-dropdown').disabled = false;
                        }, 2 * 1000);
                    };

                    defaultMic(this.getId());
                }
            })
            .catch((e) => console.error(e));
    }

    getId() {
        let select = document.getElementById('select-mic-dropdown');
        for(var i = 0;i < select.options.length;i++){
            if(select.options[i].innerText == Cookies.get('default-mic')){
                return select.options[i].value;
            }
        }
        return 'default';
    }

    deniedMessage() {
        this.requestBox = new AlertBox('#alert-area', {
            closeTime: 5000,
            persistent: true,
            hideCloseButton: true,
            extra: 'warning'
        }).show("It looks like you denied OpenAudioMc's request to use your Microphone. You won't be able to join voice calls because of this. Please go to your browser settings, and enable them manually.");
    }

}
