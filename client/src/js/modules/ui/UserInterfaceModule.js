export class UserInterfaceModule {

    constructor(oa) {
        this.openAudioMc = oa;

        document.getElementById("hue-bridge-menu-button").onclick = () => this.showHue();
        document.getElementById("show-main-button").onclick = () => this.showMain();
        // slider shit

    }

    colorToHex(color) {
        if (color.substr(0, 1) === '#') {
            return color;
        }
        let digits = /(.*?)rgb\((\d+), (\d+), (\d+)\)/.exec(color);
        let red = parseInt(digits[2]);
        let green = parseInt(digits[3]);
        let blue = parseInt(digits[4]);
        let rgb = blue | (green << 8) | (red << 16);
        return digits[1] + '#' + rgb.toString(16);
    };

    changeColor(from, to) {
        let elements = document.getElementsByTagName('*');
        for (let i=0;i<elements.length;i++) {
            let color = window.getComputedStyle(elements[i]).color;
            let hex = this.colorToHex(color);
            if (hex == from) {
                elements[i].style.color=to;
            }
            let backgroundColor = window.getComputedStyle(elements[i]).backgroundColor;
            console.log(backgroundColor);
            if (backgroundColor.indexOf('rgba')<0) {
                let hex = this.colorToHex(backgroundColor);
                if (hex == from) {
                    elements[i].style.backgroundColor=to;
                }
            }

        }
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
