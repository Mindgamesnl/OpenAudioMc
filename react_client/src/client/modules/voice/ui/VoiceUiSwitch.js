import {CallAfterDomUpdate} from "../../../helpers/domhelper";

export class VoiceUiSwitch {

    constructor(id, onByDefault, onToggle, enabledText, disabledText) {
        this.id = id;
        this.enabledText = enabledText;
        this.disabledText = disabledText;
        this.onToggle = onToggle;
        this.state = (Cookies.get(id) == null ? onByDefault : JSON.parse(Cookies.get(id)));
        this.setVisuallyActive(this.state)

        CallAfterDomUpdate(() => {
            document.getElementById(this.id).checked = !this.state;
            document.getElementById(this.id).onclick = () => {
                this.state = !this.state;
                Cookies.set(this.id, this.state, {expires: 30});
                this.onToggle(this.state);
                this.setVisuallyActive(this.state)
            };
        })
    }

    setVisuallyActive(state) {
        if (state) {
            document.getElementById(this.id).innerText = this.enabledText;
            document.getElementById(this.id).style.backgroundColor = ""
            document.getElementById(this.id).style.color = ""
        } else {
            document.getElementById(this.id).innerText = this.disabledText;
            document.getElementById(this.id).style.backgroundColor = "#EF4444"
            document.getElementById(this.id).style.color = "#F3F4F6"
        }
    }

    getState() {
        return this.state;
    }

    isOn() {
        return this.state;
    }

}
