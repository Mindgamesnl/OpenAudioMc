package net.openaudiomc.jclient.modules.socket.objects;

import com.google.gson.Gson;
import lombok.Getter;
import net.openaudiomc.jclient.OpenAudioMc;
import net.openaudiomc.jclient.utils.UrlFetcher;
import net.openaudiomc.jclient.utils.adapters.SnowYt;

public class ApiEndpoints {

    private String snowEndpoint = "";

    public ApiEndpoints() {
        snowEndpoint = new Gson().fromJson(new UrlFetcher().run("https://cdn.snowdns.de/oa.json"), SnowYt.class).getFullEndpoint();
    }

    public String youtubeEndpoint(String url, String name) {
        if (url.contains("youtu.be")) {
            String[] parts = url.split(".be/");
            String id = parts[1];
            String r = snowEndpoint;
            r = r.replace("%ytid%", id);
            r = r.replace("%serverid:clientid%", OpenAudioMc.getInstance().getSocketModule().getKeyHolder().getPublickey() + ":secret");
            r = r.replace("%playername%", name);
            return r;
        } else if (url.contains("youtube.com/")) {
            String[] parts = url.split("/?v=");
            String id = parts[1];
            String r = snowEndpoint;
            r = r.replace("%ytid%", id);
            r = r.replace("%serverid:clientid%", OpenAudioMc.getInstance().getSocketModule().getKeyHolder().getPublickey() + ":secret");
            r = r.replace("%playername%", name);
            return r;
        }
        return url;
    }

    //local server from testing
    private String root = "https://craftmendserver.eu";
    @Getter  private int port = 6969;

    public String getSocket() {
        return root + ":" + port;
    }

    public String getRESTServer() {
        return root + ":" + port + "/genid";
    }

}
