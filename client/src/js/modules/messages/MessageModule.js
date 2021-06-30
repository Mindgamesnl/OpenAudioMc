import {oalog} from "../../helpers/log";
import {deepScanStartingWith, replaceGlobalText} from "../../helpers/domhelper";

export class MessageModule {

    constructor(openAudioMc) {
        this.messages = {};

        window.getMessageString = this.getString;
    }

    getString(key, variables = []) {
        let v = window.openAudioMc.messageModule.messages[key];
        if (v == null) {
            oalog("Couldn't find message key " + key)
            return "?? " + key + " ??"
        }

        for (let i = 0; i < variables.length; i++) {
            v = v.replace(variables[i][0], variables[i][1])
        }

        return v;
    }

    renderKeyToDom(domKey, messageKey, variables = []) {
        let message = this.getString(messageKey, variables);
        replaceGlobalText(domKey, message, true)
    }

    seedStatic(staticPlaceholders) {
        let staticVariables = deepScanStartingWith("{%")
        let translations = {};

        for (let i = 0; i < staticVariables.length; i++) {
            var a = staticVariables[i];
            let temp = "";
            let fs = false
            for(let t of a)
                if (fs) {
                    temp += t;
                } else {
                    if (t !== " " && t !== "\n") {
                        fs = true;
                        temp += t;
                    }
                }
            a = temp;
            translations[a] = a.split(" ")[1];
        }

        for (let translationsKey in translations) {
            this.renderKeyToDom(translationsKey, translations[translationsKey], staticPlaceholders)
        }
    }

    async load(file) {
        // fetch
        let request = await fetch(window.location.pathname + window.location.search + file);
        let body = await request.text();
        let lines = body.split("\n");

        // parse format:
        // # comment
        // key=value with text, no matter what, just don't use new lines
        for (let i = 0; i < lines.length; i++) {
            let line = lines[i];
            if (line.startsWith("#") || line.length < 5) continue;
            let finishedKey = false;
            let key = "";
            let value = "";
            for (let j = 0; j < line.length; j++) {
                let char = line[j];
                if (!finishedKey) {
                    if (char !== "=") {
                        key += char;
                    } else {
                        finishedKey = true;
                    }
                } else {
                    value += char;
                }
            }

            if (value !== "") {
                // complete set
                this.messages[key] = value;
            }
        }
    }

}