import ClientTokenSet from "../libs/ClientTokenSet";

const API_ENDPOINTS = {
    PROXY: "https://media.openaudiomc.net/proxy?apiurl=",
    YOUTUBE: "https://media.openaudiomc.net/youtube?id=",
    SOUNDCLOUD: "https://media.openaudiomc.net/soundcloud?u=",
    DRIVE: "https://media.openaudiomc.net/googledrive?id="
};

export class AudioSourceProcessor {

    translate(source) {
        // work around for the old google docs system, for those who didn't update yet
        if (source.includes("http://docs.google.com/uc?export=open&id=")) {
            source = source.replace("http://docs.google.com/uc?export=open&id=", API_ENDPOINTS.DRIVE);
        }
        if (source.includes("https://docs.google.com/uc?export=open&id=")) {
            source = source.replace("https://docs.google.com/uc?export=open&id=", API_ENDPOINTS.DRIVE);
        }

        // handle youtube proxy, if peeps are interested in that but don't know how to
        // basically for those who can't or wont read documentatino lmao
        this.isYoutube = false;
        if (source.includes("youtube") || source.includes("youtu.be")) {
            let ytId = source.split("v=")[1];
            source = API_ENDPOINTS.YOUTUBE + ytId;
            this.isYoutube = true;
        }

        // strip old endpoint
        if (source.includes("https://weathered-dust-0281.craftmend.workers.dev/")) {
            source = source.replace("https://weathered-dust-0281.craftmend.workers.dev/", "");
        }

        // handle soundcloud
        if (source.includes("soundcloud.com")) {
            source = API_ENDPOINTS.SOUNDCLOUD + source;
        }

        // if the page is SSL, but source is http, then proxy it, but only if it is http at all
        if (location.protocol === 'https:') {
            if (source.includes("http") && !source.includes("https://")) {
                source = API_ENDPOINTS.PROXY + source;
            }
        }

        let tokenSet = new ClientTokenSet().fromUrl(window.location.href);

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

}