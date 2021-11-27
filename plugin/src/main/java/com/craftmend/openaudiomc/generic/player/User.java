package com.craftmend.openaudiomc.generic.player;

import net.md_5.bungee.api.chat.TextComponent;

import java.util.UUID;

public interface User {

    String getName();
    UUID getUniqueId();

    @Deprecated Object getOriginal();

    boolean isAdministrator();
    boolean hasPermission(String permission);

    void makeExecuteCommand(String command);

    void sendMessage(String message);

    default void sendActionbarMessage(String message) {
        sendMessage(message);
    };

    void sendMessage(TextComponent textComponent);
    void sendClickableCommandMessage(String message, String hoverMessage, String command);
    void sendClickableUrlMessage(String message, String hoverMessage, String url);

}
