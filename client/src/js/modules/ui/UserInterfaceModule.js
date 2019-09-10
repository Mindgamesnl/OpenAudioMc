export class UserInterfaceModule {

    constructor(oa) {
        this.openAudioMc = oa;

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

    openApp() {
        document.getElementById("welcome").style.display = "none";
        document.getElementById("app").style.display = "";
        this.openAudioMc.userInterfaceModule.setMessage(this.openAudioMc.messages.welcomeMessage);
        this.openAudioMc.userInterfaceModule.showVolumeSlider(true);
        document.getElementById('page').classList.remove('dark-bg');
    }

    showHue() {
        document.getElementById("welcome").style.display = "none";
        document.getElementById("hueMenu").style.display = "";
        document.getElementById("app").style.display = "none";
    }

    kickScreen(message) {
        document.getElementById('footer-welcome').innerText = 'Session terminated';
        document.getElementById("boot-button").style.display = "none";
        if (message == null) {
            document.getElementById("welcome-text-landing").innerHTML = this.openAudioMc.messages.errorMessage;
        } else {
            document.getElementById("welcome-text-landing").innerHTML = message;
        }
        document.getElementById("welcome").style.display = "";
        document.getElementById('page').classList.add('dark-bg');
        document.getElementById("app").style.display = "none";
    }

    showVolumeSlider(state) {
        if (state) {
            document.getElementById("volume-label").style.display = "";
            document.getElementById("volume-disp").style.display = "";
        } else {
            document.getElementById("volume-disp").style.display = "none";
            document.getElementById("volume-label").style.display = "none";
        }
    }

}
