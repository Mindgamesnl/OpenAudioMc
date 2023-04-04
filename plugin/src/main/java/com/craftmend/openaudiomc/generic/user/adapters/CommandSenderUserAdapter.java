package com.craftmend.openaudiomc.generic.user.adapters;

import com.craftmend.openaudiomc.generic.user.User;
import lombok.AllArgsConstructor;
import net.md_5.bungee.api.chat.TextComponent;
import org.bukkit.Bukkit;
import org.bukkit.command.CommandSender;
import org.jetbrains.annotations.Nullable;

import java.util.UUID;

@AllArgsConstructor
public class CommandSenderUserAdapter implements User {

    private CommandSender sender;

    @Override
    public void sendMessage(String string) {
        sender.sendMessage(string);
    }

    @Override
    public void sendMessage(TextComponent textComponent) {
        return;
    }

    @Override
    public void sendClickableCommandMessage(String t, String hoverMessage, String command) {
        sender.sendMessage(t);
    }

    @Override
    public void sendClickableUrlMessage(String t, String hoverMessage, String url) {
        sender.sendMessage(t);
    }

    @Nullable
    @Override
    public String getWorldName() {
        if (sender instanceof org.bukkit.entity.Player) {
            return ((org.bukkit.entity.Player) sender).getWorld().getName();
        }
        return null;
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
    public Object getOriginal() {
        return sender;
    }

    @Override
    public String getName() {
        return sender.getName();
    }
}
