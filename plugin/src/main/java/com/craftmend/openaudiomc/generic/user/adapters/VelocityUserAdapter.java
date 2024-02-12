package com.craftmend.openaudiomc.generic.user.adapters;

import com.craftmend.openaudiomc.generic.user.User;
import com.velocitypowered.api.command.CommandSource;
import com.velocitypowered.api.proxy.Player;
import lombok.AllArgsConstructor;
import net.kyori.adventure.text.Component;
import net.kyori.adventure.text.event.ClickEvent;
import net.kyori.adventure.text.event.HoverEvent;
import net.kyori.adventure.title.Title;
import net.md_5.bungee.api.chat.TextComponent;
import org.jetbrains.annotations.Nullable;

import java.time.Duration;
import java.util.Objects;
import java.util.UUID;

import static com.craftmend.openaudiomc.generic.platform.Platform.translateColors;

@AllArgsConstructor
public class VelocityUserAdapter implements User<CommandSource> {

    private CommandSource sender;

    @Override
    public void sendMessage(String string) {
        for (String s : string.split("\\\\n")) {
            sender.sendMessage(Component.text(s));
        }
    }

    /**
     * Thanks to 4drian3d (https://github.dev/4drian3d/TitleAnnouncer) for this code
     * I wouldn't have been able to figure this out without you, kyori adventure scares me lol
     */
    @Override
    public void sendTitle(String title, String subtitle, int fadeIn, int stay, int fadeOut) {
        // convert ticks to milliseconds
        fadeIn *= 50;
        stay *= 50;
        fadeOut *= 50;

        // Send the title to the specified audience.
        sender.showTitle(Title.title(
                Component.text(translateColors(title)),
                Component.text(translateColors(title)),
                Title.Times.of(
                        Duration.ofMillis(fadeIn),
                        Duration.ofMillis(stay),
                        Duration.ofMillis(fadeOut))));
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
