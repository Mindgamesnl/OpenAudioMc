package com.craftmend.rinaorc.implementation;

import com.craftmend.openaudiomc.generic.user.User;
import lombok.AllArgsConstructor;
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

@Deprecated
@AllArgsConstructor
public class LegacySpigotUserAdapter implements User {

    private CommandSender sender;

    @Override
    public void sendMessage(String string) {
        sender.sendMessage(string);
    }

    @Override
    public void sendMessage(TextComponent textComponent) {
        if (sender instanceof Player) {
            Player p = (Player) sender;
            p.spigot().sendMessage(textComponent);
        } else {
            sender.sendMessage(textComponent.getText());
        }
    }

    @Override
    public void sendClickableCommandMessage(String msgText, String hoverMessage, String command) {
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
        return sender.isOp() || sender.hasPermission("openaudiomc.tips");
    }

    @Override
    public boolean hasPermission(String permission) {
        return sender.isOp() || sender.hasPermission(permission);
    }

    @Override
    public void makeExecuteCommand(String command) {
        Bukkit.dispatchCommand(sender, command);
    }

    @Override
    public UUID getUniqueId() {
        if (sender instanceof Player) {
            return ((Player) sender).getUniqueId();
        }
        return null;
    }

    @Override
    public void sendActionbarMessage(String text) {
        Player sp = (Player) sender;
        sendActionbar(new TextComponent(text));
    }

    @Override
    public Object getOriginal() {
        return sender;
    }

    @Override
    public String getName() {
        return sender.getName();
    }

    private void sendActionbar(TextComponent tc) {
        try {
            Player player = (Player) sender;
            Class<?> clsIChatBaseComponent = ServerPackage.MINECRAFT.getClass("IChatBaseComponent");
            Class<?> clsChatMessageType = ServerPackage.MINECRAFT.getClass("ChatMessageType");
            Object entityPlayer = player.getClass().getMethod("getHandle").invoke(player);
            Object playerConnection = entityPlayer.getClass().getField("playerConnection").get(entityPlayer);
            Object chatBaseComponent = ServerPackage.MINECRAFT.getClass("IChatBaseComponent$ChatSerializer").getMethod("a", String.class).invoke(null, tc.toLegacyText());
            Object chatMessageType = clsChatMessageType.getMethod("valueOf", String.class).invoke(null, "GAME_INFO");
            Object packetPlayOutChat = ServerPackage.MINECRAFT.getClass("PacketPlayOutChat").getConstructor(clsIChatBaseComponent, clsChatMessageType).newInstance(chatBaseComponent, chatMessageType);
            playerConnection.getClass().getMethod("sendPacket", ServerPackage.MINECRAFT.getClass("Packet")).invoke(playerConnection, packetPlayOutChat);
        } catch (Throwable e) {
            throw new RuntimeException(e);
        }
    }

}
