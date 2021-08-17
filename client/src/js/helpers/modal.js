import {replaceGlobalText} from "./domhelper";

export function OpenModal(message, options = {}) {
    let body = message;
    let title = "";
    let primary = "";
    let secondary = "";
    let timeout = 0;

    if (options.title) {
        title = options.title;
    }

    if (options.primary) {
        primary = options.primary;
    }

    if (options.secondary) {
        secondary = options.secondary;
    }

    if (options.wait) {
        timeout = options.wait;
    }

    setModalTexts(body, primary, secondary)
    document.getElementById("my-modal-2").checked = true
    onPrimary(CloseModal)

    if (timeout === 0) return null;
    return new Promise((accept, reject) => {
        if (timeout === 0) {
            accept();
        } else {
            setTimeout(accept, timeout)
        }
    });
}

export function CloseModal() {
    document.getElementById("my-modal-2").checked = false
}

function onPrimary(call) {
    document.getElementById("modal-primary").onclick = call;
}

function onSecondary(call) {
    document.getElementById("modal-secondary").onclick = call;
}

function setModalTexts(text, primary = "", secondary = "") {
    replaceGlobalText("{{ modal.content }}", text, true)
    replaceGlobalText("{{ modal.primary }}", primary, true)
    replaceGlobalText("{{ modal.secondary }}", secondary, true)

    if (primary === "") {
        document.getElementById("modal-primary").style.display = "none";
    } else {
        document.getElementById("modal-primary").style.display = "";
    }

    if (secondary === "") {
        document.getElementById("modal-secondary").style.display = "none";
    } else {
        document.getElementById("modal-secondary").style.display = "";
    }
}