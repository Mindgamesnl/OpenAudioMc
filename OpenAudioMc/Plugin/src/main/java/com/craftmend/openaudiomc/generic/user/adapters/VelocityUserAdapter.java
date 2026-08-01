package com.craftmend.openaudiomc.generic.user.adapters;

import com.craftmend.openaudiomc.api.basic.ActorCategory;
import com.craftmend.openaudiomc.api.user.User;
import com.craftmend.openaudiomc.generic.text.RichText;
import com.craftmend.openaudiomc.velocity.utils.VelocityComponents;
import com.velocitypowered.api.command.CommandSource;
import com.velocitypowered.api.proxy.Player;
import lombok.AllArgsConstructor;
import net.kyori.adventure.text.Component;
import net.kyori.adventure.text.event.ClickEvent;
import net.kyori.adventure.text.event.HoverEvent;

import java.util.UUID;

@AllArgsConstructor
public class VelocityUserAdapter implements User<CommandSource> {

    private CommandSource sender;

    @Override
    public void sendMessage(String string) {
        for (String s : string.split("\\\\n")) {
            if (RichText.isRich(s)) {
                VelocityComponents.send(sender, RichText.parse(s));
            } else {
                VelocityComponents.sendPlain(sender, s);
            }
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
        String[] lines = t.split("\\\\n");
        if (lines.length > 1) {
            for (String line : lines) {
                sendClickableCommandMessage(line, hoverMessage, command);
            }
            return;
        }

        sendClickable(t, hoverMessage, ClickEvent.clickEvent(ClickEvent.Action.RUN_COMMAND, "/" + command));
    }

    @Override
    public void sendClickableUrlMessage(String t, String hoverMessage, String url) {
        String[] lines = t.split("\\\\n");
        if (lines.length > 1) {
            for (String line : lines) {
                sendClickableUrlMessage(line, hoverMessage, url);
            }
            return;
        }

        sendClickable(t, hoverMessage, ClickEvent.clickEvent(ClickEvent.Action.OPEN_URL, url));
    }

    private void sendClickable(String text, String hoverMessage, ClickEvent clickEvent) {
        Component message = toComponent(text)
                .clickEvent(clickEvent)
                .hoverEvent(HoverEvent.hoverEvent(HoverEvent.Action.SHOW_TEXT, toComponent(hoverMessage)));

        VelocityComponents.send(sender, message);
    }

    private Component toComponent(String text) {
        return RichText.isRich(text) ? RichText.parse(text) : RichText.asLegacy(text);
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
        if (sender instanceof Player) {
            return ((Player) sender).getUniqueId();
        }
        return null;
    }

    @Override
    public String getIpAddress() {
        if (sender instanceof Player) {
            Player player = (Player) sender;
            if (player.getRemoteAddress() == null) return "unknown";
            if (player.getRemoteAddress().getAddress() == null) return "unknown";
            String ip = player.getRemoteAddress().getAddress().getHostName();
            if (ip != null) {
                return ip;
            }
        }
        return "unknown";
    }

    @Override
    public String getWorld() {
        return "world"; // Velocity does not have a world concept like Bukkit, so we return a placeholder
    }

    @Override
    public CommandSource getOriginal() {
        return sender;
    }

    @Override
    public String getName() {
        if (sender instanceof Player) {
            return ((Player) sender).getUsername();
        }
        return "VelocityConsole";
    }
}
