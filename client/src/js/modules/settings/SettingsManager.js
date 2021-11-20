import {makeid} from "../../helpers/libs/random";

const icons = {
    CHIME: `<svg fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5.882V19.24a1.76 1.76 0 01-3.417.592l-2.147-6.15M18 13a3 3 0 100-6M5.436 13.683A4.001 4.001 0 017 6h1.832c4.1 0 7.625-1.234 9.168-3v14c-1.543-1.766-5.067-3-9.168-3H7a3.988 3.988 0 01-1.564-.317z"/></svg>`,
    DARK_MODE: `<svg viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  stroke-width="2"  stroke-linecap="round"  stroke-linejoin="round">  <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" /></svg>`,
    NOTIFICATION: `<svg width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">  <path stroke="none" d="M0 0h24v24H0z"/>  <path d="M9 7 h-3a2 2 0 0 0 -2 2v9a2 2 0 0 0 2 2h9a2 2 0 0 0 2 -2v-3" />  <circle cx="16" cy="8" r="3" /></svg>`,
    MIX_AND_FADE: `<svg viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  stroke-width="2"  stroke-linecap="round"  stroke-linejoin="round">  <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" /></svg>`,
    PRELOAD: `<svg width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">  <path stroke="none" d="M0 0h24v24H0z"/>  <path d="M16 8v-4h-12v12.01h4" stroke-dasharray=".001 4" />  <rect x="8" y="8" width="12" height="12" rx="2" /></svg>`
}

export var SETTING_STATES = {
    "useChimes": true,
    "darkMode": true,
    "vcNotifications": false,
    "audioFading": true,
    "preloadAudio": true
}

export function isSettingEnabled(name) {
    return SETTING_STATES[name]
}

export class SettingsManager {

    constructor(openAudioMc) {
        this.settings = {}
        this.setup()
    }

    reload() {
        let hue = document.getElementById("hue-box-ssl");
        document.getElementById("settings-content").innerHTML = "";
        this.setup();
        document.getElementById("settings-content").appendChild(hue);
    }

    setup() {

        window.handleSettingsClick = (e, id) => {
            if (this.settings[id] instanceof CheckboxSetting) {
                this.settings[id].isEnabled = !this.settings[id].isEnabled;
                this.settings[id].onChange(this.settings[id].isEnabled);
            } else {
                this.settings[id].value = !this.settings[id].value;
                this.settings[id].onChange(this.settings[id].value);
            }
        }

        this.registerSetting(new CheckboxSetting("useChimes",
                icons.CHIME,
                getMessageString("settings.voicechat.chimes.title"),
                getMessageString("settings.voicechat.chimes.body"),
                getMessageString("settings.voicechat.chimes.button"),
                true
            )
        )

        this.registerSetting(new CheckboxSetting("darkMode",
                icons.DARK_MODE,
                getMessageString("settings.theme.title"),
                getMessageString("settings.theme.body"),
                getMessageString("settings.theme.button"),
                true,
                (enabled) => {
                    if (enabled) {
                        document.body.classList.remove('light-mode');
                    } else {
                        document.body.classList.add('light-mode');
                    }
                }
            )
        )

        this.registerSetting(new CheckboxSetting("vcNotifications",
                icons.NOTIFICATION,
                getMessageString("settings.voicechat.peer.title"),
                getMessageString("settings.voicechat.peer.body"),
                getMessageString("settings.voicechat.peer.button"),
                false
            )
        )

        this.registerSetting(new CheckboxSetting("audioFading",
                icons.MIX_AND_FADE,
                getMessageString("settings.mix-and-fade.title"),
                getMessageString("settings.mix-and-fade.body"),
                getMessageString("settings.mix-and-fade.button"),
                true
            )
        )

        this.registerSetting(new CheckboxSetting("preloadAudio",
                icons.PRELOAD,
                getMessageString("settings.preload.title"),
                getMessageString("settings.preload.body"),
                getMessageString("settings.preload.button"),
                true
            )
        )
    }

    registerSetting(setting) {
        this.settings[setting.id] = setting;
    }

}

class DropdownOption {
    constructor(value, readableValue) {
        this.value = value;
        this.readableValue = readableValue;
    }
}

class DropdownSetting {
    constructor(id, icon, name, body, options, defaultValue, onChange = () => {
    }) {
        this.htmlId = makeid(5);
        this.id = id;
        this.onChange = (state) => {
            Cookies.set("settings-" + id, state)
            SETTING_STATES[id] = state
            onChange(state)
        };

        this.value = (Cookies.get("settings-" + id) !== undefined ? Cookies.get("settings-" + id) : defaultValue);

        let optionsHtml = "";
        for (let i = 0; i < options.length; i++) {
            let op = options[i];
            let opName = op.readableValue;
            let opValue = op.value;
            optionsHtml += `<option value="` + opValue + `" ` + (this.value === opValue ? "selected" : "") + `>` + opName + `</option>`
        }

        this.html = `
        <div class="content-card settings-card">
           <span>
            ` + icon + `
            ` + name + `
            </span>
            <div class="content-card-content content-card-content-border-bottom">
                ` + body + `
            </div>
            <label for="vc-mic-select" style="display: none;"></label>
            <select class="full soft-tex content-pill" id="` + this.htmlId + `" onchange="handleSettingsClick(this, '` + this.id + `')">
                ` + optionsHtml + `
            </select>
            </div>
        </div>
        `
    }
}

class CheckboxSetting {
    constructor(id, icon, name, body, toggleText, defaultState, onChange = () => {
    }) {
        this.htmlId = makeid(5);
        this.id = id;
        this.onChange = (state) => {
            Cookies.set("settings-" + id, state)
            SETTING_STATES[id] = state
            onChange(state)
        };

        this.isEnabled = (Cookies.get("settings-" + id) !== undefined ? Cookies.get("settings-" + id) === "true" : defaultState);

        this.html = `
        <div class="content-card settings-card">
           <span>
            ` + icon + `
            ` + name + `
            </span>
            <div class="content-card-content content-card-content-border-bottom">
                ` + body + `
            </div>
            <div class="content-card-buttons">
                <label class="content-pill status-button">
                    <input type="checkbox" id="` + this.htmlId + `" ` + (this.isEnabled ? "checked" : "") + ` onchange="handleSettingsClick(this, '` + this.id + `')">
                    <span style="display: inline;">` + toggleText + `</span>
                </label>
            </div>
        </div>`

        this.settingsPage = document.getElementById("settings-content");
        this.settingsPage.innerHTML += this.html;
        this.onChange(this.isEnabled);
    }

}