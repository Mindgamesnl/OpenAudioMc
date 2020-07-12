package com.craftmend.openaudiomc.generic.commands.interfaces;

import net.md_5.bungee.api.chat.TextComponent;

import java.util.UUID;

public interface GenericExecutor {

    void sendMessage(String message);
    boolean hasPermission(String permission);
    void sendMessage(TextComponent message);
    UUID getUuid();
    String getName();
    Object getOriginal();

}
