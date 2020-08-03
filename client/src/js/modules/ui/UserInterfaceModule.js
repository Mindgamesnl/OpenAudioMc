export class UserInterfaceModule {

    constructor(oa) {
        this.openAudioMc = oa;
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

    openApp() {
        strictlyShowCard(UiCards.MAIN_UI)
        this.openAudioMc.userInterfaceModule.setMessage(this.openAudioMc.messages.welcomeMessage);
    }

    kickScreen(message) {
        strictlyShowCard(UiCards.KICKED)
        document.getElementById("kick-message").innerHTML = message;
    }

}

export function strictlyShowCard(id) {
    let elements = document.querySelectorAll('[data-type=card]');

    for (let element of elements) {
        element.style.display = "none";
    }

    document.getElementById(id).style.display = "";
}

export const UiCards = {
    BAD_AUTH: "bad-auth-card",
    WELCOME: "welcome-card",
    KICKED: "kicked-card",
    MAIN_UI: "main-card",
}