package net.openaudiomc.jclient.utils.config;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import java.util.ArrayList;
import java.util.List;

@Getter @Setter @ToString
public class ConfigStorageMedia {

    private String name;
    private Long length;

    public List<String> serialize() {
        List<String> list = new ArrayList<>();
        list.add("    " + name + ":");
        list.add("      length: '" + length + "'");
        return list;
    }
}