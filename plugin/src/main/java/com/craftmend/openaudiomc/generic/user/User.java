package com.craftmend.openaudiomc.generic.user;

import net.md_5.bungee.api.chat.TextComponent;

import java.util.UUID;

public interface User {

    @Deprecated Object getOriginal();

    String getName();
    UUID getUniqueId();

    boolean isAdministrator();
    boolean hasPermission(String permission);

    void makeExecuteCommand(String command);

    void sendMessage(String message);
    void sendMessage(TextComponent textComponent);
    void sendClickableCommandMessage(String message, String hoverMessage, String command);
    void sendClickableUrlMessage(String message, String hoverMessage, String url);
    default void sendActionbarMessage(String message) {
        sendMessage(message);
    }

}
