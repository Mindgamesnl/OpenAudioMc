import {CallAfterDomUpdate} from "../../helpers/domhelper";

export class VoicePeerUi {

    constructor(playerName, playerUuid, volume, onVolumeChange) {
        this.playerName = playerName;

        let baseHtml = `
        <div class="flex items-center p-2" id="vc-user-card-` + playerName + `">
            <div class="w-16 h-16 rounded-full mr-3 overflow-hidden flex items-center">
                <img src="https://visage.surgeplay.com/bust/512/` + playerUuid + `" class="w-16">
            </div>
            <div class="flex-1">
                <div class="flex items-center">
                    <div class="font-semibold text-lg text-teal-500">` + playerName + ` <small id="vc-user-card-` + playerName + `-volume-disp">(` + volume + `% volume)</small>
                    </div>
                </div>
                <div><input id="vc-user-card-` + playerName + `-volume-input"
                            class="rounded-lg overflow-hidden appearance-none bg-gray-400 h-3 w-full"
                            type="range" min="0" max="100" step="1" value="` + volume + `"/></div>
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

    updateVolumeDisplay(volume) {
        document.getElementById("vc-user-card-" + this.playerName + "-volume-disp").innerText = "(" + volume + "% volume)";
    }

}
