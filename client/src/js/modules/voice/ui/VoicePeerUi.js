import {replaceGlobalText} from "../../../helpers/domhelper";
import {isSettingEnabled, SETTING_STATES} from "../../settings/SettingsManager";

let handlers = {}

let lists = []

window.handlePeerVolumeEvent = function (e) {
    // attempt to get the handler
    let handler = handlers[e.id]
    if (handler != null) {
        handler(e)
    }
}

let total = 0;

function updateTotal() {
    replaceGlobalText("{{ oam.rtc_peer_count }}", "" + total + "")
}

updateTotal();

export class VoicePeerUi {

    constructor(openAudioMc, playerName, playerUuid, volume, onVolumeChange) {
        
        if (lists.length === 0) {
            lists = [
                document.getElementById("vc-call-members-left"),
                document.getElementById("vc-call-members-right"),
            ]
        }
        
        this.openAudioMc = openAudioMc;
        this.playerName = playerName;
        this.onVolumeChange = onVolumeChange;
        this.removed = false;

        let baseHtml = `
        <li id="vc-user-card-` + playerName + `">
            <div>
                <img src="https://visage.surgeplay.com/bust/512/` + playerUuid + `" id="vc-user-card-` + playerName + `-indicator"
                     class="avatar mid-avatar" alt="Avatar">
            </div>
            <div class="flex-1">
                <div class="flex items-center">
                    <h1 style="margin-bottom: 10px">
                        <svg id="vc-user-card-` + playerName + `-muted" class="red"
                             style="display: none;"
                             viewBox="0 0 24 24" fill="none"
                             stroke="currentColor" stroke-width="2" stroke-linecap="round"
                             stroke-linejoin="round">
                            <line x1="1" y1="1" x2="23" y2="23"/>
                            <path d="M9 9v3a3 3 0 0 0 5.12 2.12M15 9.34V4a3 3 0 0 0-5.94-.6"/>
                            <path d="M17 16.95A7 7 0 0 1 5 12v-2m14 0v2a7 7 0 0 1-.11 1.23"/>
                            <line x1="12" y1="19" x2="12" y2="23"/>
                            <line x1="8" y1="23" x2="16" y2="23"/>
                        </svg>
                        ` + playerName + ` <small id="vc-user-card-` + playerName + `-volume-disp"
                                           class="soft-text">(` + volume + `% volume)</small>
                                   </h1>
                </div>
                <div><input id="vc-user-card-` + playerName + `-volume-input"
                            oninput="handlePeerVolumeEvent(this)"
                            class="volume-slider tiny-slider"
                            type="range" min="0" max="140" step="1" value="` + volume + `"/></div>
            </div>
        </li>
        `
        // insert html
        
        let lowest = null;
        for (let i = 0; i < lists.length; i++) {
            if (lowest === null) {
                lowest = lists[i];
                continue;
            }
            if (lowest.childNodes.length > lists[i].childNodes.length) {
                lowest = lists[i];
            }
        }

        lowest.innerHTML += baseHtml;
        total++;
        updateTotal();

        handlers["vc-user-card-" + this.playerName + "-volume-input"] = function (e) {
            this.callingSliderUpdate(e)
        }.bind(this)

        setTimeout(() => {
            this.updatePlaceholder()
        }, 10)

        if (isSettingEnabled("vcNotifications")) {
            this.openAudioMc.notificationModule.sendNotification(
                getMessageString("notification.voicechat.peeradd.title"),
                getMessageString("notification.voicechat.peeradd.body", [["%name", this.playerName]]),
                this.playerName
            )
        }
    }

    callingSliderUpdate(e) {
        if (this.removed) return;
        let v = document.getElementById("vc-user-card-" + this.playerName + "-volume-input").value;
        this.onVolumeChange(v);
        this.updateVolumeDisplay(v);
    }

    updatePlaceholder() {
        // if (this.openAudioMc.voiceModule.peerMap.size == 0) {
        //     document.getElementById("empty-call-placeholder").style.display = "";
        // } else {
        //     document.getElementById("empty-call-placeholder").style.display = "none";
        // }
    }

    remove() {
        total--;
        updateTotal();
        this.removed = true;
        for (let i = 0; i < lists.length; i++) {
            try {
                lists[i].removeChild(document.getElementById("vc-user-card-" + this.playerName))
            } catch (e) {}
        }
        this.updatePlaceholder()
        delete handlers["vc-user-card-" + this.playerName + "-volume-input"]

        if (isSettingEnabled("vcNotifications")) {
            this.openAudioMc.notificationModule.sendNotification(
                getMessageString("notification.voicechat.peerdop.title"),
                getMessageString("notification.voicechat.peerdop.body", [["%name", this.playerName]]),
                this.playerName
            )
        }
    }

    setVisuallyTalking(state) {
        if (this.removed) return;
        if (state) {
            document.getElementById("vc-user-card-" + this.playerName + "-indicator").style.backgroundColor = "lime"
            document.getElementById("vc-user-card-" + this.playerName + "-indicator").style.boxShadow = "0 0 10pt 2pt lime"
        } else {
            document.getElementById("vc-user-card-" + this.playerName + "-indicator").style.boxShadow = ""
            document.getElementById("vc-user-card-" + this.playerName + "-indicator").style.backgroundColor = ""
        }
    }

    setVisuallyMuted(state) {
        if (this.removed) return;
        if (state) {
            document.getElementById("vc-user-card-" + this.playerName + "-indicator").style.opacity = "0.2";
            document.getElementById("vc-user-card-" + this.playerName + "-muted").style.display = "inline";
        } else {
            document.getElementById("vc-user-card-" + this.playerName + "-indicator").style.opacity = "1";
            document.getElementById("vc-user-card-" + this.playerName + "-muted").style.display = "none";
        }
    }

    updateVolumeDisplay(volume) {
        if (this.removed) return;
        document.getElementById("vc-user-card-" + this.playerName + "-volume-disp").innerText = "(" + volume + "% volume)";
    }

}
