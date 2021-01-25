package com.craftmend.openaudiomc.generic.commands.adapters;

import com.craftmend.openaudiomc.generic.commands.interfaces.GenericExecutor;
import lombok.AllArgsConstructor;
import net.md_5.bungee.api.CommandSender;
import net.md_5.bungee.api.chat.TextComponent;
import net.md_5.bungee.api.connection.ProxiedPlayer;

import java.util.UUID;

@AllArgsConstructor
public class BungeeCommandSenderAdapter implements GenericExecutor {

    private CommandSender commandSender;

    @Override
    public void sendMessage(String message) {
        commandSender.sendMessage(new TextComponent(message));
    }

    @Override
    public boolean hasPermission(String permission) {
        return commandSender.hasPermission(permission);
    }

    @Override
    public void sendMessage(TextComponent message) {
        commandSender.sendMessage(message);
    }

    @Override
    public UUID getUuid() {
        if (commandSender instanceof ProxiedPlayer) {
            return ((ProxiedPlayer) commandSender).getUniqueId();
        }
        return null;
    }

    @Override
    public String getName() {
        return commandSender.getName();
    }

    @Override
    public Object getOriginal() {
        return commandSender;
    }
}
