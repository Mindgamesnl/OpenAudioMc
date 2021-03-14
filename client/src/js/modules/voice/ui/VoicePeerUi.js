import {CallAfterDomUpdate} from "../../../helpers/domhelper";

export class VoicePeerUi {

    constructor(playerName, playerUuid, volume, onVolumeChange) {
        this.playerName = playerName;

        let baseHtml = `
        <div class="flex items-center p-2" id="vc-user-card-` + playerName + `">
            <div class="w-16 h-16 rounded-full mr-3 overflow-hidden flex items-center" id="vc-user-card-` + playerName + `-indicator">
                <img id="vc-user-card-` + playerName + `-picture" src="https://visage.surgeplay.com/bust/512/` + playerUuid + `" class="w-16">
            </div>
            <div class="flex-1">
                <div class="flex items-center">
                    <div class="font-semibold text-lg text-teal-500"><svg id="vc-user-card-` + playerName + `-muted" class="h-8 w-8 text-red-500" style="display: none;" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"> <line x1="1" y1="1" x2="23" y2="23" /> <path d="M9 9v3a3 3 0 0 0 5.12 2.12M15 9.34V4a3 3 0 0 0-5.94-.6" /> <path d="M17 16.95A7 7 0 0 1 5 12v-2m14 0v2a7 7 0 0 1-.11 1.23" /> <line x1="12" y1="19" x2="12" y2="23" /> <line x1="8" y1="23" x2="16" y2="23" /></svg>` + playerName + ` <small id="vc-user-card-` + playerName + `-volume-disp">(` + volume + `% volume)</small>
                    </div>
                </div>
                <div><input id="vc-user-card-` + playerName + `-volume-input"
                            class="rounded-lg overflow-hidden appearance-none bg-gray-400 h-3 w-full"
                            type="range" min="0" max="120" step="1" value="` + volume + `"/></div>
            </div>
        </div>
        `

        // insert html
        document.getElementById("vc-call-members").innerHTML += baseHtml;


        CallAfterDomUpdate(() => {
            document.getElementById("vc-user-card-" + playerName + "-volume-input").oninput = (e) => {
                let v = document.getElementById("vc-user-card-" + playerName + "-volume-input").value;
                onVolumeChange(v);
                this.updateVolumeDisplay(v);
            }
        })
    }

    remove() {
        document.getElementById("vc-call-members").removeChild(document.getElementById("vc-user-card-" + this.playerName))
    }

    setVisuallyTalking(state) {
        if (state) {
            document.getElementById("vc-user-card-" + this.playerName + "-indicator").style.boxShadow = "0 0 10pt 2pt lime"
        } else {
            document.getElementById("vc-user-card-" + this.playerName + "-indicator").style.boxShadow = ""
        }
    }

    setVisuallyMuted(state) {
        if (state) {
            document.getElementById("vc-user-card-" + this.playerName + "-picture").style.opacity = "0.2";
            document.getElementById("vc-user-card-" + this.playerName + "-muted").style.display = "inline";
        } else {
            document.getElementById("vc-user-card-" + this.playerName + "-picture").style.opacity = "1";
            document.getElementById("vc-user-card-" + this.playerName + "-muted").style.display = "none";
        }
    }

    updateVolumeDisplay(volume) {
        document.getElementById("vc-user-card-" + this.playerName + "-volume-disp").innerText = "(" + volume + "% volume)";
    }

}
