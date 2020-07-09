import ClientTokenSet from "../libs/ClientTokenSet";

export class AudioSourceProcessor {

    translate(source) {
        // work around for the old google docs system, for those who didn't update yet
        if (source.includes("http://docs.google.com/uc?export=open&id=")) {
            let craftmendProxy = source.replace("http://docs.google.com/uc?export=open&id=", "https://openaudio-google-proxy.craftmend.workers.dev/?id=");
            source = craftmendProxy;
        }
        if (source.includes("https://docs.google.com/uc?export=open&id=")) {
            let craftmendProxy = source.replace("https://docs.google.com/uc?export=open&id=", "https://openaudio-google-proxy.craftmend.workers.dev/?id=");
            source = craftmendProxy;
        }

        // handle youtube proxy, if peeps are interested in that but don't know how to
        // basically for those who can't or wont read documentatino lmao
        this.isYoutube = false;
        if (source.includes("youtube") || source.includes("youtu.be")) {
            let ytId = source.split("v=")[1];
            source = "https://fetch-yt.craftmend.workers.dev/?v=" + ytId;
            this.isYoutube = true;
        }

        // if the page is SSL, but source is http, then proxy it, but only if it is http at all
        if (location.protocol === 'https:') {
            if (source.includes("http") && !source.includes("https://")) {
                source = "https://dark-mouse-53ea.craftmend.workers.dev/corsproxy/?apiurl=" + source;
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