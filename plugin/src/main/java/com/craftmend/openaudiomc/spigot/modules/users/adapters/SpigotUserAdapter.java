package com.craftmend.openaudiomc.spigot.modules.users.adapters;

import com.craftmend.openaudiomc.generic.environment.MagicValue;
import com.craftmend.openaudiomc.generic.storage.enums.StorageKey;
import com.craftmend.openaudiomc.generic.user.User;
import lombok.AllArgsConstructor;
import net.md_5.bungee.api.ChatMessageType;
import net.md_5.bungee.api.chat.ClickEvent;
import net.md_5.bungee.api.chat.HoverEvent;
import net.md_5.bungee.api.chat.TextComponent;
import org.bukkit.Bukkit;
import org.bukkit.ChatColor;
import org.bukkit.command.CommandSender;
import org.bukkit.entity.Player;
import org.jetbrains.annotations.Nullable;

import java.util.Objects;
import java.util.UUID;

import static com.craftmend.openaudiomc.generic.platform.Platform.translateColors;

@AllArgsConstructor
public class SpigotUserAdapter implements User<CommandSender> {

    private CommandSender player;

    @Override
    public void sendMessage(String string) {
        for (String s : string.split("\\\\n")) {
            player.sendMessage(s);
        }
    }

    @Override
    public void sendTitle(String title, String subtitle, int fadeIn, int stay, int fadeOut) {
        if (player instanceof Player) {
            ((Player) player).sendTitle(title, subtitle, fadeIn, stay, fadeOut);
        }
    }

    @Override
    public void sendMessage(TextComponent textComponent) {
        player.spigot().sendMessage(textComponent);
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

        TextComponent message = new TextComponent(translateColors(Objects.requireNonNull(
                msgText
        )));

        TextComponent[] hover = new TextComponent[]{
                new TextComponent(translateColors(
                        hoverMessage
                ))
        };
        message.setClickEvent(new ClickEvent(ClickEvent.Action.RUN_COMMAND, "/" + command));
        message.setHoverEvent(new HoverEvent(HoverEvent.Action.SHOW_TEXT, hover));

        sendMessage(message);
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

        // are we a console? then add the url to the message
        if (player instanceof org.bukkit.command.ConsoleCommandSender) {
            msgText = msgText + " " + ChatColor.GRAY + "(" + url + " for console users)";
        }

        TextComponent message = new TextComponent(translateColors(Objects.requireNonNull(
                msgText
        )));

        TextComponent[] hover = new TextComponent[]{
                new TextComponent(translateColors(
                        hoverMessage
                ))
        };

        message.setClickEvent(new ClickEvent(ClickEvent.Action.OPEN_URL, url));
        message.setHoverEvent(new HoverEvent(HoverEvent.Action.SHOW_TEXT, hover));

        sendMessage(message);
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
            if (!StorageKey.SETTINGS_TOKEN_AUTO_LOGIN.getBoolean() && !MagicValue.FORCE_DISABLE_CLIENT_NET_LOOKUP.get(Boolean.class)) {
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

        return StorageKey.SETTINGS_DEFAULT_WORLD_NAME.getString();
    }

}
