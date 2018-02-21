package net.openaudiomc.jclient.utils.config;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import java.util.ArrayList;
import java.util.List;

@Getter @Setter @ToString
public class ConfigWeb {

    private String header;

    private String url;
    private String title;
    private String background;
    private String startSound;
    private String ambianceSound;
    private Long speakerRadius;

    public List<String> serialize() {
        List<String> list = new ArrayList<>();
        list.add(header);
        list.add("web:");
        list.add("  url: '" + url + "'");
        list.add("  title: '" + title + "'");
        list.add("  background: '" + background + "'");
        list.add("  startsound: '" + startSound + "'");
        list.add("  ambiancesound: '" + ambianceSound + "'");
        list.add("  speaker_radius: " + speakerRadius);
        return list;
    }
}