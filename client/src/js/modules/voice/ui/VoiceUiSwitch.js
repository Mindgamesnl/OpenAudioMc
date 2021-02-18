import {CallAfterDomUpdate} from "../../../helpers/domhelper";

export class VoiceUiSwitch {

    constructor(id, title, inactiveText, activeText, onByDefault, onToggle) {
        this.id = id;
        this.activeText = activeText;
        this.inactiveText = inactiveText;
        this.onToggle = onToggle;
        this.state = (Cookies.get(id) == null ? onByDefault : JSON.parse(Cookies.get(id)));

        let html = `
        <div style="text-align:center; display:inline-block;" class="w-3/5">
            <h4>` + title + `</h4>
            <input class="tgl tgl-skewed text-center" id="` + this.id + `" type="checkbox"/>
            <label class="tgl-btn block w-max" data-tg-off="` + this.activeText + `" data-tg-on="` + this.inactiveText + `"
                   for="` + this.id + `" style="width: 100%"></label>
        </div>
        `

        document.getElementById("vc-toggles-wrapper").innerHTML += html;
        CallAfterDomUpdate(() => {
            document.getElementById(this.id).checked = !this.state;
            document.getElementById(this.id).onclick = () => {
                this.state = !this.state;
                Cookies.set(this.id, this.state, {expires: 30});
                this.onToggle(this.state);
            };
        })
    }

    getState() {
        return this.state;
    }

    isOn() {
        return this.state;
    }

}
