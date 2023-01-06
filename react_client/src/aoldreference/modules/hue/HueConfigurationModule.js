import {replaceGlobalText} from "../../helpers/domhelper";

export class HueConfigurationModule {

    constructor() {
        // attach items
        this.dropdowns = [];
        this.state = [];

        this.dropdowns.push(document.getElementById("bulb-selection-1"));
        this.dropdowns.push(document.getElementById("bulb-selection-2"));
        this.dropdowns.push(document.getElementById("bulb-selection-3"));

        this.dropdowns.forEach(item => {
            item.onchange = () => {
                this.select();
            };
        });
    }

    setBridgeName(name) {
        replaceGlobalText("{{ oam.hue_bridge_name }}", name)
    }

    select() {
        this.updateState();
    }

    applyState() {
        this.state.forEach(state => {
            this.getInputById(state.bulb).selectedIndex = state.selectedIndex;
        });
    }

    updateState() {
        this.state = [];
        for (let i = 0; i < this.dropdowns.length; i++){
            const item = this.dropdowns[i];
            this.state.push(this.obtainSelection(document.getElementById(item.id)));
        }

        Cookies.set("hue-state", this.state, { expires: 30 });
    }

    obtainSelection(item) {
        const id = item.dataset.bulb;
        const selected = item.options[item.selectedIndex].dataset.light;
        return {
            "selectedIndex": item.selectedIndex,
            "bulb": id,
            "value": selected
        }
    }

    getBulbStateById(id) {
        this.state.forEach(bulb => {
            if (bulb.id == id) return bulb;
        });
        return -1;
    }

    getInputById(id) {
        for (const dropdown of this.dropdowns) {
            if (dropdown.dataset.bulb == id) return dropdown;
        }
    }

    getHueIdFromId(id) {
        return this.state[parseInt(id)].value;
    }

    setLightNamesAndIds(items) {
        let options = "";

        for (let i = 0; i < items.length; i++){
            const item = items[i];
            options += "<option data-light='" + item.id + "'>" + item.name + "</option>";
        }

        for (let i = 0; i < this.dropdowns.length; i++){
            const item = this.dropdowns[i];
            document.getElementById(item.id).innerHTML += "<div>" + options + "</div>";
        }
    }

}
