export class UserInterfaceModule {

    constructor() {
        document.getElementById("welcome").style.display = "none";
        document.getElementById("app").style.display = "";

        document.getElementById("hue-bridge-menu-button").onclick = () => this.showHue();
        document.getElementById("show-main-button").onclick = () => this.showMain();

    }

    setMessage(text) {
        document.getElementById("status-message").innerHTML = text;
    }

    showMain() {
        document.getElementById("welcome").style.display = "none";
        document.getElementById("hueMenu").style.display = "none";
        document.getElementById("app").style.display = "";
    }

    showHue() {
        document.getElementById("welcome").style.display = "none";
        document.getElementById("hueMenu").style.display = "";
        document.getElementById("app").style.display = "none";
    }

    showVolumeSlider(state) {
        if (state) {
            document.getElementById("volume-label").style.display = "";
        } else {
            document.getElementById("volume-label").style.display = "none";
        }
    }

}
