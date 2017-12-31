package net.openaudiomc.jclient.utils.config;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import java.util.ArrayList;
import java.util.List;

@Getter @Setter @ToString
public class ConfigMessages {

    private String header;

    private String provideUrl;
    private String connected;
    private String disconnected;
    private String setvolumefail;
    private String setvolume;

    public List<String> serialize() {
        List<String> list = new ArrayList<>();
        list.add(header);
        list.add("messages:");
        list.add("  provide_url: '" + provideUrl + "'");
        list.add("  connected: '" + connected + "'");
        list.add("  disconnected: '" + disconnected + "'");
        list.add("  setvolumefail: '" + setvolumefail + "'");
        list.add("  setvolume: '" + setvolume + "'");
        return list;
    }
}