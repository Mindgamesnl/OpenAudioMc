package com.craftmend.openaudiomc.generic.user.adapters;

import com.craftmend.openaudiomc.generic.user.User;
import lombok.AllArgsConstructor;
import net.md_5.bungee.api.CommandSender;
import net.md_5.bungee.api.chat.TextComponent;
import net.md_5.bungee.api.connection.ProxiedPlayer;

import java.util.UUID;

@AllArgsConstructor
public class BungeeUserAdapter implements User {

    private CommandSender sender;

    @Override
    public void sendMessage(String string) {
        sender.sendMessage(string);
    }

    @Override
    public void sendMessage(TextComponent textComponent) {
        sender.sendMessage(textComponent);
    }

    @Override
    public void sendClickableCommandMessage(String message, String hoverMessage, String command) {

    }

    @Override
    public void sendClickableUrlMessage(String message, String hoverMessage, String url) {

    }

    @Override
    public boolean isAdministrator() {
        return sender.hasPermission("openaudiomc.*") || sender.hasPermission("openaudiomc.tips");
    }

    @Override
    public boolean hasPermission(String permission) {
        return sender.hasPermission("openaudiomc.*") || sender.hasPermission(permission);
    }

    @Override
    public void makeExecuteCommand(String command) {
        // TODO: Possible?
    }

    @Override
    public UUID getUniqueId() {
        if (sender instanceof ProxiedPlayer) {
            return ((ProxiedPlayer) sender).getUniqueId();
        }
        return null;
    }

    @Override
    public Object getOriginal() {
        return sender;
    }

    @Override
    public String getName() {
        return sender.getName();
    }
}
