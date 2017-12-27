package net.openaudiomc.jclient.modules.media.objects;

import lombok.Getter;
import net.openaudiomc.jclient.OpenAudioMc;

public class FlatMedia {

    @Getter  private String url;

    public FlatMedia(String src) {
        this.url = src;

        if (this.url.contains("youtu")) {
            String s = this.url.split("v=")[1];
            this.url = "https://oa-yt.snowdns.de/?v=" + s + "&oat=" + OpenAudioMc.getInstance().getSocketModule().getKeyHolder().getPublickey() + "&name=%name%";
        }
    }


}
