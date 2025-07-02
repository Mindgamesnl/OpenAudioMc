package com.craftmend.openaudiomc.generic.commands.objects;

public class CommandError extends Exception {
    public CommandError(String err) {
        super(err);
    }
}
