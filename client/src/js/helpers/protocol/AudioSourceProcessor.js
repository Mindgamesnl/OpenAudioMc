import ClientTokenSet from "../libs/ClientTokenSet";
import {API_ENDPOINT} from "./ApiEndpoints";

export const AUDIO_ENDPOINTS = {
    PROXY: API_ENDPOINT.CONTENT_PROXY,
    YOUTUBE: API_ENDPOINT.YOUTUBE_PRXY,
    SOUNDCLOUD: API_ENDPOINT.SOUNDCLOUD_PROXY,
    DRIVE: API_ENDPOINT.DRIVE_PROXY
};

export class AudioSourceProcessor {

    translate(source) {
        // work around for the old google docs system, for those who didn't update yet
        if (source.includes("http://docs.google.com/uc?export=open&id=")) {
            source = source.replace("http://docs.google.com/uc?export=open&id=", AUDIO_ENDPOINTS.DRIVE);
        }
        if (source.includes("https://docs.google.com/uc?export=open&id=")) {
            source = source.replace("https://docs.google.com/uc?export=open&id=", AUDIO_ENDPOINTS.DRIVE);
        }
        if (source.includes("https://drive.google.com/")) {
            source = source.split("file/d/")[1];
            source = source.split("/view")[0];
        }

        // handle youtube proxy, if peeps are interested in that but don't know how to
        // basically for those who can't or wont read documentatino lmao
        this.isYoutube = false;
        if (source.includes("youtube") || source.includes("youtu.be")) {
            let ytId = source.split("v=")[1];
            source = AUDIO_ENDPOINTS.YOUTUBE + ytId;
            this.isYoutube = true;
        }

        // strip old endpoint
        if (source.includes("https://weathered-dust-0281.craftmend.workers.dev/")) {
            source = source.replace("https://weathered-dust-0281.craftmend.workers.dev/", "");
        }

        // handle soundcloud
        if (source.includes("soundcloud.com")) {
            source = AUDIO_ENDPOINTS.SOUNDCLOUD + source;
        }

        // if the page is SSL, but source is http, then proxy it, but only if it is http at all
        if (location.protocol === 'https:') {
            if (source.includes("http") && !source.includes("https://")) {
                source = AUDIO_ENDPOINTS.PROXY + source;
            }
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

}