package com.craftmend.openaudiomc.generic.commands.enums;

public enum CommandContext {

    OPENAUDIOMC,
    VOICE;

    private String baseCommand;

    CommandContext() {
        this.baseCommand = name().toLowerCase();
    }

    public String getBaseCommand() {
        return baseCommand;
    }

}
