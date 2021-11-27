package com.craftmend.openaudiomc.generic.player.adapters;

import com.craftmend.openaudiomc.generic.player.User;
import lombok.AllArgsConstructor;
import lombok.Getter;
import net.md_5.bungee.api.ChatMessageType;
import net.md_5.bungee.api.chat.ClickEvent;
import net.md_5.bungee.api.chat.HoverEvent;
import net.md_5.bungee.api.chat.TextComponent;
import org.bukkit.Bukkit;
import org.bukkit.command.CommandSender;
import org.bukkit.entity.Player;

import java.util.Objects;
import java.util.UUID;

import static com.craftmend.openaudiomc.generic.platform.Platform.translateColors;

@AllArgsConstructor
public class SpigotUserAdapter implements User {

    private CommandSender player;

    @Override
    public void sendMessage(String string) {
        player.sendMessage(string);
    }

    @Override
    public void sendMessage(TextComponent textComponent) {
        player.spigot().sendMessage(textComponent);
    }

    @Override
    public void sendClickableCommandMessage(String message, String hoverMessage, String command) {

    }

    @Override
    public void sendClickableUrlMessage(String msgText, String hoverMessage, String url) {
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
        return player.isOp() || player.hasPermission("openaudiomc.tips");
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
    public void sendActionbarMessage(String text) {
        Player sp = (Player) player;
        sp.spigot().sendMessage(ChatMessageType.ACTION_BAR, new TextComponent(text));
    }

    @Override
    public Object getOriginal() {
        return player;
    }

    @Override
    public String getName() {
        return player.getName();
    }

}
