package com.craftmend.openaudiomc.generic.user.adapters;

import com.craftmend.openaudiomc.generic.user.User;
import lombok.AllArgsConstructor;
import net.md_5.bungee.api.CommandSender;
import net.md_5.bungee.api.ProxyServer;
import net.md_5.bungee.api.Title;
import net.md_5.bungee.api.chat.ClickEvent;
import net.md_5.bungee.api.chat.HoverEvent;
import net.md_5.bungee.api.chat.TextComponent;
import net.md_5.bungee.api.connection.ProxiedPlayer;
import org.jetbrains.annotations.Nullable;

import java.util.Objects;
import java.util.UUID;

import static com.craftmend.openaudiomc.generic.platform.Platform.translateColors;

@AllArgsConstructor
public class BungeeUserAdapter implements User<CommandSender> {

    private CommandSender sender;

    @Override
    public void sendMessage(String string) {
        for (String s : string.split("\\\\n")) {
            sender.sendMessage(s);
        }
    }

    @Override
    public void sendTitle(String title, String subtitle, int fadeIn, int stay, int fadeOut) {
        if (sender instanceof ProxiedPlayer) {
            // wtf?
            Title bgTitle = ProxyServer.getInstance().createTitle();

            bgTitle.title(new TextComponent(translateColors(title)));
            bgTitle.subTitle(new TextComponent(translateColors(subtitle)));

            bgTitle.fadeIn(fadeIn);
            bgTitle.stay(stay);
            bgTitle.fadeOut(fadeOut);

            bgTitle.send(((ProxiedPlayer) sender));
        }
    }

    @Override
    public void sendMessage(TextComponent textComponent) {
        sender.sendMessage(textComponent);
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
        String[] lines = msgText.split("\\\\n");
        if (lines.length > 1) {
            for (String line : lines) {
                sendClickableUrlMessage(line, hoverMessage, url);
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
        message.setClickEvent(new ClickEvent(ClickEvent.Action.OPEN_URL, url));
        message.setHoverEvent(new HoverEvent(HoverEvent.Action.SHOW_TEXT, hover));

        sendMessage(message);
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
        if (sender instanceof ProxiedPlayer) {
            return ((ProxiedPlayer) sender).getUniqueId();
        }
        return null;
    }

    @Override
    public String getIpAddress() {
        if (sender instanceof ProxiedPlayer) {
            if (((ProxiedPlayer) sender).getAddress() == null) return "unknown";
            String ip = ((ProxiedPlayer) sender).getAddress().getHostName();
            if (ip != null) return ip;
        }
        return "unknown";
    }

    @Override
    public CommandSender getOriginal() {
        return sender;
    }

    @Override
    public String getName() {
        return sender.getName();
    }
}
