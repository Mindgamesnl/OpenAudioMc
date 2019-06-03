export class HueConfigurationModule {

    constructor(main) {
        // attach items
        this.dropdowns = [];
        this.state = [];

        this.dropdowns.push(document.getElementById("bulb-selection-1"));
        this.dropdowns.push(document.getElementById("bulb-selection-2"));
        this.dropdowns.push(document.getElementById("bulb-selection-3"));

        this.dropdowns.forEach(item => {
            item.onchange = me => {
                this.select(me);
            };
        });

        this.setLightNamesAndIds([
            {
                "name": "Lamp 1",
                "id": 0
            },
            {
                "name": "Lamp 2",
                "id": 1
            },
            {
                "name": "Lamp 3",
                "id": 2
            },
            {
                "name": "Lamp 4",
                "id": 3
            }
        ]);

        // load state, or default
        const oldState = Cookies.get("hue-state");
        if (oldState != null) {
            this.state = JSON.parse(Cookies.get("hue-state"));
            this.applyState();
        }
    }

    setBridgeName(name) {
        document.getElementById("bridge-name").innerText = name;
    }

    select(item) {
        this.updateState();
    }

    applyState() {
        this.state.forEach(state => {
            console.log(state.bulb)
            this.getInputById(state.bulb).selectedIndex = state.selectedIndex;
        });
    }

    updateState() {
        this.state = [];
        this.dropdowns.forEach(item => {
            this.state.push(this.obtainSelection(item));
        });

        Cookies.set("hue-state", this.state);
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

    setLightNamesAndIds(items) {
        let options = "";

        items.forEach(item => {
            options += "<option data-light='" + item.id + "'>" + item.name + "</option>";
        });

        this.dropdowns.forEach(item => {
            item.innerHTML = options;
        });
    }

}
