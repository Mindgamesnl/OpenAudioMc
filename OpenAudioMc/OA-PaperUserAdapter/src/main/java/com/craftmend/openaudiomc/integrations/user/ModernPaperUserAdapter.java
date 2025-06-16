package com.craftmend.openaudiomc.integrations.user;

import com.craftmend.openaudiomc.api.user.User;
import net.md_5.bungee.api.ChatMessageType;
import net.md_5.bungee.api.chat.TextComponent;
import org.bukkit.Bukkit;
import org.bukkit.command.CommandSender;
import org.bukkit.entity.Player;

import java.util.UUID;

public class ModernPaperUserAdapter implements User<CommandSender> {

    private PaperUserOptions paperUserOptions;
    private CommandSender player;

    public ModernPaperUserAdapter(CommandSender player, PaperUserOptions paperUserOptions) {
        this.player = player;
        this.paperUserOptions = paperUserOptions;
    }

    @Override
    public void sendMessage(String string) {
        for (String s : string.split("\\\\n")) {
            player.sendMessage(s);
        }
    }

    @Override
    public void sendClickableCommandMessage(String msgText, String hoverMessage, String command) {
        String[] lines = msgText.split("\\\\n");
        if (lines.length > 1) {
            for (String line : lines) {
                sendClickableCommandMessage(line, hoverMessage, command);
            }
            return;
        }
    }

    @Override
    public void sendClickableUrlMessage(String msgText, String hoverMessage, String url) {
        // break up in multiple lines if needed, by splitting on \n
        String[] lines = msgText.split("\\\\n");
        if (lines.length > 1) {
            for (String line : lines) {
                sendClickableUrlMessage(line, hoverMessage, url);
            }
            return;
        }
    }

    @Override
    public boolean isAdministrator() {
        return player.isOp() || player.hasPermission("openaudiomc.*") || player.hasPermission("openaudiomc.tips");
    }

    @Override
    public boolean hasPermission(String permission) {
        return player.isOp() || player.hasPermission(permission);
    }

    @Override
    public void makeExecuteCommand(String command) {
        Bukkit.dispatchCommand(player, command);
    }

    @Override
    public UUID getUniqueId() {
        if (player instanceof Player) {
            return ((Player) player).getUniqueId();
        }
        return null;
    }

    @Override
    public String getIpAddress() {
        if (player instanceof Player) {
            if (!paperUserOptions.isAutoLoginEnabled() || paperUserOptions.isClientNetLookupDisabled()) {
                return "unknown";
            }

            Player p = (Player) player;
            if (p.getAddress() == null) return "unknown";
            String ip = p.getAddress().getHostName();
            if (ip != null) {
                return ip;
            }
        }
        return "unknown";
    }

    @Override
    public void sendActionbarMessage(String text) {
        Player sp = (Player) player;
        sp.spigot().sendMessage(ChatMessageType.ACTION_BAR, new TextComponent(text));
    }

    @Override
    public CommandSender getOriginal() {
        return player;
    }

    @Override
    public String getName() {
        return player.getName();
    }

    @Override
    public String getWorld() {
        // player
        if (player instanceof Player) {
            return ((Player) player).getWorld().getName();
        }

        // entity
        if (player instanceof org.bukkit.entity.Entity) {
            return ((org.bukkit.entity.Entity) player).getWorld().getName();
        }

        // commandblock
        if (player instanceof org.bukkit.command.BlockCommandSender) {
            return ((org.bukkit.command.BlockCommandSender) player).getBlock().getWorld().getName();
        }

        throw new IllegalStateException("Cannot determine world for " + player.getClass().getSimpleName() + " type. This is a bug, please report it to the OpenAudioMc team.");
    }

}
