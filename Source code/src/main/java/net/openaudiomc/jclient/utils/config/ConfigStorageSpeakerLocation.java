package net.openaudiomc.jclient.utils.config;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

@Getter @Setter @ToString
public class ConfigStorageSpeakerLocation {

    private UUID id;
    private String world;
    private Double x;
    private Double y;
    private Double z;
    private String sound;

    public List<String> serialize() {
        List<String> list = new ArrayList<>();
        list.add("    " + id + ":");
        list.add("      world: '" + world + "'");
        list.add("      x: '" + x + "'");
        list.add("      y: '" + y + "'");
        list.add("      z: '" + z + "'");
        list.add("      sound: '" + sound + "'");
        return list;
    }
}