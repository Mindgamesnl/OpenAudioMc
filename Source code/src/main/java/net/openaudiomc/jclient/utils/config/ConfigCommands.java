package net.openaudiomc.jclient.utils.config;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import java.util.ArrayList;
import java.util.List;

@Getter @Setter @ToString
public class ConfigCommands {

    private String header;

    private List<String> commands;

    public List<String> serialize() {
        List<String> list = new ArrayList<>();
        list.add(header);
        list.add("commands:");
        for(String command : commands) {
            list.add("  - \"" + command + "\"");
        }
        return list;
    }
}