import ClientTokenSet from "../libs/ClientTokenSet";
import {API_ENDPOINT} from "./ApiEndpoints";
import {oalog} from "../log";

export const AUDIO_ENDPOINTS = {
    PROXY: API_ENDPOINT.CONTENT_PROXY,
    YOUTUBE: API_ENDPOINT.YOUTUBE_PROXY,
    SOUNDCLOUD: API_ENDPOINT.SOUNDCLOUD_PROXY,
    DRIVE: API_ENDPOINT.DRIVE_PROXY
};

export class AudioSourceProcessor {

    constructor() {
        this.startedRandomly = false;
        this.lastIndex = 0;
    }

    translate(sourceOg) {
        let source = this.handleRandomizedPlaylist(sourceOg);

        // filter old
        try {
            if (source.includes("media.openaudiomc.net")) return sourceOg
            source = source.replace("https://api.openaudiomc.net/stream.php?u=", "");

            // validate invalid urls if its the default domain
            if (window.location.href.includes("client.openaudiomc.net") && !source.includes("http")) {
                return null;
            }

            // work around for the old google docs system, for those who didn't update yet
            if (source.includes("http://docs.google.com/uc?export=open&id=")) {
                source = source.replace("http://docs.google.com/uc?export=open&id=", AUDIO_ENDPOINTS.DRIVE);
            }
            if (source.includes("https://docs.google.com/uc?export=open&id=")) {
                source = source.replace("https://docs.google.com/uc?export=open&id=", AUDIO_ENDPOINTS.DRIVE);
            }
            if (source.includes("https://drive.google.com/")) {
                source = source.split("file/d/")[1];
                source = AUDIO_ENDPOINTS.DRIVE + source.split("/view")[0];
            }

            // handle youtube proxy, if peeps are interested in that but don't know how to
            // basically for those who can't or wont read documentatino lmao
            this.isYoutube = false;
            if (source.includes("youtube.")) {
                let ytId = source.split("v=")[1];

                if (ytId.includes("&")) {
                    ytId = ytId.split("&")[0];
                }

                source = AUDIO_ENDPOINTS.YOUTUBE + ytId;
                this.isYoutube = true;
            } else if (source.includes("youtu.be")) {
                let ytId = source.split(".be/")[1];
                source = AUDIO_ENDPOINTS.YOUTUBE + ytId;
                this.isYoutube = true;
            }

            // strip old endpoint
            if (source.includes("https://weathered-dust-0281.craftmend.workers.dev/")) {
                source = source.replace("https://weathered-dust-0281.craftmend.workers.dev/", "");
            }

            // handle soundcloud
            if (source.includes("soundcloud.com")) {
                // update now playing too
                fetch("https://media.openaudiomc.net/2/soundcloud?u=" + source)
                    .then(response => response.json())
                    .then(body => {
                        document.getElementById("sc-cover").style.display = "";
                        document.getElementById("sc-title").style.display = "";
                        document.getElementById("sc-title").innerText = body.artist + " - " + body.title;
                        document.getElementById("sc-title").onclick = () => {
                            window.open(body.link);
                        };
                        document.getElementById("sc-cover").src = body.photo;
                    })
                source = AUDIO_ENDPOINTS.SOUNDCLOUD + source;
            }

            // if the page is SSL, but source is http, then proxy it, but only if it is http at all
            if (location.protocol === 'https:') {
                if (source.includes("http") && !source.includes("https://")) {
                    source = AUDIO_ENDPOINTS.PROXY + source;
                }
            }
        } catch (e) {
            console.log("Middleware error")
            console.log(e)
            return sourceOg
        }

        let tokenSet = new ClientTokenSet().fromCache();

        // append possible authentication, just good to send along
        // first one might be special
        if (source.includes("?")) {
            source += "&openAudioPlayerName=" + tokenSet.name;
        } else {
            source += "?openAudioPlayerName=" + tokenSet.name;
        }

        source += "&openAudioToken=" + tokenSet.token;
        source += "&openAudioPublicServerKey=" + tokenSet.publicServerKey;

        return source;
    }

    handleRandomizedPlaylist(input) {
        if (input.startsWith("[") && input.endsWith("]")) {
            let sources = JSON.parse(input);
            if (!this.startedRandomly) {
                let randomIndex = Math.floor(Math.random() * sources.length);
                this.lastIndex = randomIndex;
                this.startedRandomly = true;
                return sources[randomIndex];
            } else {
                // bump index
                this.lastIndex++;
                if ((this.lastIndex) > sources.length - 1) {
                    this.lastIndex = 0;
                }
                return sources[this.lastIndex];
            }
        }
        return input;
    }


}
