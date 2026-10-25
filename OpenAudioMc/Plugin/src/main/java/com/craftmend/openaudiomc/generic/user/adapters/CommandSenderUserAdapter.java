package com.craftmend.openaudiomc.generic.user.adapters;

import com.craftmend.openaudiomc.api.basic.ActorCategory;
import com.craftmend.openaudiomc.generic.platform.HexColors;
import com.craftmend.openaudiomc.generic.storage.enums.StorageKey;
import com.craftmend.openaudiomc.api.user.User;
import lombok.AllArgsConstructor;
import net.md_5.bungee.api.chat.TextComponent;
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
            sendLegacyText(s);
        }
    }

    /**
     * Players get the message as a component, because §x§r§r§g§g§b§b hex colors only work
     * there. Everything else renders raw section codes, so hex collapses to its closest
     * legacy color first.
     */
    private void sendLegacyText(String legacyText) {
        if (sender instanceof Player) {
            ((Player) sender).spigot().sendMessage(TextComponent.fromLegacyText(legacyText));
        } else {
            sender.sendMessage(HexColors.sectionHexToLegacy(legacyText));
        }
    }

    @Override
    public ActorCategory getCategory() {
        if (sender instanceof Player) {
            return ActorCategory.PLAYER;
        }
        return ActorCategory.CONSOLE;
    }

    @Override
    public void sendClickableCommandMessage(String t, String hoverMessage, String command) {
        sendLegacyText(t);
    }

    @Override
    public void sendClickableUrlMessage(String t, String hoverMessage, String url) {
        sendLegacyText(t);
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
