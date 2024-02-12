package com.craftmend.openaudiomc.generic.commands.enums;

public enum CommandContext {

    OPENAUDIOMC,
    CHANNEL;

    private String baseCommand;

    CommandContext() {
        this.baseCommand = name().toLowerCase();
    }

    public String getBaseCommand() {
        return baseCommand;
    }

}
