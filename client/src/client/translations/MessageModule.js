import {API_ENDPOINT} from "../config/ApiEndpoints";
import {setGlobalState, store} from "../../state/store";
import Cookies from "js-cookie";
import {VERSION} from "../../index";

export class MessageModule {

    constructor() {
        this.messages = {};
        this.seeded = false;
        this.seededValues = [];
        this.currentLangFile = "";

        this.languageMappings = {
            "gb": "en.lang",
            "us": "en.lang",
            "nl": "nl.lang", // dutch
            "be": "nl.lang", // belgium
            "sp": "es.lang", // spanish
            "es": "es.lang", // spanish
            "fr": "fr.lang", // frensh
            "de": "de.lang", // german
            "ja": "jp.lang", // japanese
            "ko": "kr.lang", // korean

            // One of these can probably go, but i wasn't provided
            // enough info and am unable to find the correct region code
            // but these are both croatian
            "hr": "hr.lang",
            "scr": "hr.lang"

        }

        this.load = this.load.bind(this);
        this.getString = this.getString.bind(this);
        this.handleCountry = this.handleCountry.bind(this);
        this.updateBanner = this.updateBanner.bind(this);
        this.fetchWithFailover = this.fetchWithFailover.bind(this);
        this.loadDefault = this.loadDefault.bind(this);
    }

    async loadDefault() {
        await this.load("en.lang")
    }

    async handleCountry(countryCode) {
        countryCode = countryCode.toLowerCase();
        let bestLangFile = this.languageMappings[countryCode]
        if (bestLangFile != null) {
            console.log("Switching to " + countryCode + " > " + bestLangFile)
            await this.load(bestLangFile)
        }
    }

    updateBanner() {
        if (this.currentLangFile === "en.lang") {
            setGlobalState({translationBanner: null})
            return
        }

        // is this language the preferred language? keep it!
        if (this.currentLangFile === Cookies.get('lang')) {
            return;
        }

        let reset = function () {
            this.load("en.lang").then(r => console.log)
        }.bind(this);

        let placeholders = [["%langName", this.getString("lang.name")]]

        setGlobalState({
            translationBanner: {
                toEn: this.getString("lang.toEn", placeholders),
                detectedAs: this.getString("lang.detectedAs", placeholders),
                keep: this.getString("lang.keep", placeholders),
                reset: reset
            }
        })
    }

    getString(key, variables = []) {
        let v = this.messages[key];
        if (v == null) {
            console.error("Couldn't find message key " + key)
            return "?? " + key + " ??"
        }

        for (let i = 0; i < variables.length; i++) {
            v = v.replace(variables[i][0], variables[i][1])
        }

        return v;
    }

    async fetchWithFailover(file, isFailover = false) {
        let link = (window.location.pathname + window.location.search).split("?")[0]
        if (link.indexOf(".html") !== -1) {
            link = link.substring(0, link.lastIndexOf("/") + 1);
        }
        let prefix = (isFailover ? API_ENDPOINT.CONTENT_PROXY + "https://session.openaudiomc.net/" : link)
        let request = await fetch(prefix + file + "?v=" + VERSION.revision);
        if (request.status !== 200 && !isFailover) {
            console.error("Using fetch fail over for lang")
            return await this.fetchWithFailover(file, true)
        }
        let body = await request.text();
        return body.split("\n");
    }

    async load(file) {
        if (this.currentLangFile === file) return
        // is this language the preferred language? keep it!
        if (this.currentLangFile === Cookies.get('lang')) {
            return;
        }
        let lines = []

        // fetch
        lines = await this.fetchWithFailover(file)

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
                let payload = {
                    key: key,
                    value: value
                }
                store.dispatch({type: 'SET_LANG_MESSAGE', payload});
            }
        }

        this.currentLangFile = file;
        setGlobalState({langFile: file})
        this.updateBanner()
    }
}
