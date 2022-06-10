package com.craftmend.openaudiomc.vistas.client.users;

import com.craftmend.openaudiomc.generic.user.User;
import net.md_5.bungee.api.chat.TextComponent;

import java.util.UUID;

public class SystemUser implements User {
    @Override
    public Object getOriginal() {
        return null;
    }

    @Override
    public String getName() {
        return "Console";
    }

    @Override
    public UUID getUniqueId() {
        return UUID.randomUUID();
    }

    @Override
    public boolean isAdministrator() {
        return true;
    }

    @Override
    public boolean hasPermission(String permission) {
        return true;
    }

    @Override
    public void makeExecuteCommand(String command) {

    }

    @Override
    public void sendMessage(String message) {
        System.out.println(message);
    }

    @Override
    public void sendMessage(TextComponent textComponent) {
        System.out.println(textComponent);
    }

    @Override
    public void sendClickableCommandMessage(String message, String hoverMessage, String command) {

    }

    @Override
    public void sendClickableUrlMessage(String message, String hoverMessage, String url) {

    }
}
