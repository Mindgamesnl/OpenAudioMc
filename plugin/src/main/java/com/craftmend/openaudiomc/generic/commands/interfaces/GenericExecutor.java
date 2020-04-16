package com.craftmend.openaudiomc.generic.commands.interfaces;

import java.util.UUID;

public interface GenericExecutor {

    void sendMessage(String message);
    boolean hasPermission(String permission);
    UUID getUuid();
    String getName();
    Object getOriginal();

}
