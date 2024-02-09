package com.craftmend.openaudiomc.generic.commands.objects;

import lombok.Data;

@Data
public class Argument {

    /**
     * The usage of the command,
     * example if your command name is select and your usage is select name,
     * you would just enter "<name>"
     * description is the text that will be added in the help menu
     */
    private String syntax;
    private String description;
    private int playerArgumentIndex = -1;

    public Argument(String syntax, String description) {
        this.syntax = syntax;
        this.description = description;
    }

    public Argument(String syntax, String description, int playerArgumentIndex) {
        this.syntax = syntax;
        this.description = description;
        this.playerArgumentIndex = playerArgumentIndex;
    }

    public boolean isPlayerArgument(int index) {
        return index == playerArgumentIndex;
    }

    public String getBase() {
        String base = syntax.split(" ")[0];
        if (base.contains("<")) {
            return base.replace("<", "").replace(">", "");
        }
        return base;
    }

}
