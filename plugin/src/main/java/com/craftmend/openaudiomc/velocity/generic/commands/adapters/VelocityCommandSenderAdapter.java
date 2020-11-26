package com.craftmend.openaudiomc.velocity.generic.commands.adapters;

import com.craftmend.openaudiomc.generic.commands.interfaces.GenericExecutor;
import com.velocitypowered.api.command.CommandSource;
import com.velocitypowered.api.proxy.Player;
import lombok.AllArgsConstructor;
import net.kyori.adventure.text.Component;
import net.md_5.bungee.api.chat.TextComponent;

import java.util.UUID;

@AllArgsConstructor
public class VelocityCommandSenderAdapter implements GenericExecutor {
    private final CommandSource commandSource;

    @Override
    public void sendMessage(String message) {
        commandSource.sendMessage(Component.text(message));
    }

    @Override
    public boolean hasPermission(String permission) {
        return commandSource.hasPermission(permission);
    }

    @Override
    public void sendMessage(TextComponent message) {
        sendMessage(message.getText());
    }

    @Override
    public UUID getUuid() {
        if (commandSource instanceof Player) {
            return ((Player) commandSource).getUniqueId();
        }
        return null;
    }

    @Override
    public String getName() {
        if (commandSource instanceof Player) {
            return ((Player) commandSource).getUsername();
        }
        return "Console";
    }

    @Override
    public Object getOriginal() {
        return commandSource;
    }
}
