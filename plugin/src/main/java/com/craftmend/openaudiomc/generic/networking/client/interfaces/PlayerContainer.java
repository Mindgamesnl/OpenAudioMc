package com.craftmend.openaudiomc.generic.networking.client.interfaces;

import net.md_5.bungee.api.chat.TextComponent;

import java.util.UUID;

public interface PlayerContainer {

    void sendMessage(String string);
    void sendMessage(TextComponent textComponent);
    boolean isAdministrator();
    UUID getUniqueId();
    String getName();

}
