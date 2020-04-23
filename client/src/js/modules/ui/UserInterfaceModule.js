export class UserInterfaceModule {

    constructor(oa) {
        this.openAudioMc = oa;

        document.getElementById("hue-bridge-menu-button").onclick = () => this.showHue();
        document.getElementById("show-main-button").onclick = () => this.showMain();
        // slider shit
    }

    changeColor(findHexColor, replaceWith) {
        // Convert rgb color strings to hex
        // REF: https://stackoverflow.com/a/3627747/1938889
        function rgb2hex(rgb) {
            if (/^#[0-9A-F]{6}$/i.test(rgb)) return rgb;
            rgb = rgb.match(/^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/);
            function hex(x) {
                return ("0" + parseInt(x).toString(16)).slice(-2);
            }
            return "#" + hex(rgb[1]) + hex(rgb[2]) + hex(rgb[3]);
        }

        function hexToRgb(hex){
            hex = hex.replace('#','');
            let r = parseInt(hex.substring(0,2), 16);
            let g = parseInt(hex.substring(2,4), 16);
            let b = parseInt(hex.substring(4,6), 16);

            return  'rgb('+r+', '+g+', '+b+')';
        }

        let convertedColor = hexToRgb(findHexColor);

        // Select and run a map function on every tag
        document.querySelectorAll('*').forEach(function(el, i) {
            // Get the computed styles of each tag
            let styles = window.getComputedStyle(el);
            // Go through each computed style and search for "color"
            Object.keys(styles).reduce(function(acc, k) {
                let name = styles[k];
                let value = styles.getPropertyValue(name);
                if (value.indexOf(convertedColor) >=0 ) {
                    let newValue = value.replace(convertedColor, replaceWith);
                    // special attributes
                    if (name.indexOf("border-top") >= 0) {
                        el.style.borderTop = '2px solid ' + newValue;
                    } else {
                        el.style[name] = newValue;
                    }
                }
            });
        });
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
