package com.craftmend.openaudiomc.generic.user.adapters;

import com.craftmend.openaudiomc.generic.user.User;
import com.velocitypowered.api.command.CommandSource;
import com.velocitypowered.api.proxy.Player;
import lombok.AllArgsConstructor;
import net.kyori.adventure.text.Component;
import net.kyori.adventure.text.event.ClickEvent;
import net.kyori.adventure.text.event.HoverEvent;
import net.md_5.bungee.api.chat.TextComponent;
import org.jetbrains.annotations.Nullable;

import java.util.Objects;
import java.util.UUID;

import static com.craftmend.openaudiomc.generic.platform.Platform.translateColors;

@AllArgsConstructor
public class VelocityUserAdapter implements User {

    private CommandSource sender;

    @Override
    public void sendMessage(String string) {
        for (String s : string.split("\n")) {
            sender.sendMessage(Component.text(s));
        }
    }

    @Override
    public void sendMessage(TextComponent textComponent) {
        return;
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

        String msgText = translateColors(t);
        Component message = Component.text(Objects.requireNonNull(msgText));

        message = message.clickEvent(ClickEvent.clickEvent(ClickEvent.Action.RUN_COMMAND, "/" + command));

        String hoverText = translateColors(hoverMessage);
        message = message.hoverEvent(HoverEvent.hoverEvent(HoverEvent.Action.SHOW_TEXT, Component.text(Objects.requireNonNull(hoverText))));

        sender.sendMessage(message);
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

        String msgText = translateColors(t);
        Component message = Component.text(Objects.requireNonNull(msgText));

        message = message.clickEvent(ClickEvent.clickEvent(ClickEvent.Action.OPEN_URL, url));

        String hoverText = translateColors(hoverMessage);
        message = message.hoverEvent(HoverEvent.hoverEvent(HoverEvent.Action.SHOW_TEXT, Component.text(Objects.requireNonNull(hoverText))));

        sender.sendMessage(message);
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
    public Object getOriginal() {
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
