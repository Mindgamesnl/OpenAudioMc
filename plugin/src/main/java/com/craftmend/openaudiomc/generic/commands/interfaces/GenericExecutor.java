package com.craftmend.openaudiomc.generic.commands.interfaces;

public interface GenericExecutor {

    void sendMessage(String message);
    boolean hasPermission(String permission);
    Object getOriginal();

}
