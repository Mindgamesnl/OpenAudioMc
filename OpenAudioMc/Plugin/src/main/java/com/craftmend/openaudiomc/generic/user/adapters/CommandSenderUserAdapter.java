package com.craftmend.openaudiomc.generic.user.adapters;

import com.craftmend.openaudiomc.generic.storage.enums.StorageKey;
import com.craftmend.openaudiomc.api.user.User;
import lombok.AllArgsConstructor;
import org.bukkit.Bukkit;
import org.bukkit.command.CommandSender;
import org.bukkit.entity.Player;

import java.util.UUID;

@AllArgsConstructor
public class CommandSenderUserAdapter implements User<CommandSender> {

    private CommandSender sender;

    @Override
    public void sendMessage(String string) {
        for (String s : string.split("\\\\n")) {
            sender.sendMessage(s);
        }
    }

    @Override
    public void sendClickableCommandMessage(String t, String hoverMessage, String command) {
        sender.sendMessage(t);
    }

    @Override
    public void sendClickableUrlMessage(String t, String hoverMessage, String url) {
        sender.sendMessage(t);
    }

    @Override
    public boolean isAdministrator() {
        return sender.isOp();
    }

    @Override
    public boolean hasPermission(String permission) {
        return sender.hasPermission(permission);
    }

    @Override
    public void makeExecuteCommand(String command) {
        Bukkit.dispatchCommand(sender, command);
    }

    @Override
    public UUID getUniqueId() {
        return null;
    }

    @Override
    public String getIpAddress() {
        return "commandsender";
    }

    @Override
    public CommandSender getOriginal() {
        return sender;
    }

    @Override
    public String getName() {
        return sender.getName();
    }

    @Override
    public String getWorld() {
        // player
        if (sender instanceof Player) {
            return ((Player) sender).getWorld().getName();
        }

        // entity
        if (sender instanceof org.bukkit.entity.Entity) {
            return ((org.bukkit.entity.Entity) sender).getWorld().getName();
        }

        // commandblock
        if (sender instanceof org.bukkit.command.BlockCommandSender) {
            return ((org.bukkit.command.BlockCommandSender) sender).getBlock().getWorld().getName();
        }

        return StorageKey.SETTINGS_DEFAULT_WORLD_NAME.getString();
    }
}
