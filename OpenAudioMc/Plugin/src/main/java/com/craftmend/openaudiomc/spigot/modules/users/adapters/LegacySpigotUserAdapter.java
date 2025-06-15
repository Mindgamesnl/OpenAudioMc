package com.craftmend.openaudiomc.spigot.modules.users.adapters;

import com.craftmend.openaudiomc.generic.platform.Platform;
import com.craftmend.openaudiomc.generic.storage.enums.StorageKey;
import com.craftmend.openaudiomc.generic.user.User;
import lombok.AllArgsConstructor;
import net.md_5.bungee.api.ChatMessageType;
import net.md_5.bungee.api.chat.ClickEvent;
import net.md_5.bungee.api.chat.HoverEvent;
import net.md_5.bungee.api.chat.TextComponent;
import org.bukkit.Bukkit;
import org.bukkit.command.CommandSender;
import org.bukkit.entity.Player;

import java.lang.reflect.Field;
import java.lang.reflect.Method;
import java.util.Objects;
import java.util.UUID;

import static com.craftmend.openaudiomc.generic.platform.Platform.translateColors;

@Deprecated
@AllArgsConstructor
public class LegacySpigotUserAdapter implements User<CommandSender> {

    private CommandSender sender;

    @Override
    public void sendMessage(String string) {
        String[] lines = string.split("\\\\n");
        for (String line : lines) {
            sender.sendMessage(Platform.translateColors(line));
        }
    }

    @Override
    public void sendTitle(String title, String subtitle, int fadeIn, int stay, int fadeOut) {
        if (sender instanceof Player) {
            Player p = (Player) sender;
            // 1.8 DOES support legacy titles
            p.sendTitle(Platform.translateColors(title), Platform.translateColors(subtitle));
        }
    }

    @Override
    public void sendMessage(TextComponent textComponent) {
        if (sender instanceof Player) {
            Player p = (Player) sender;
            p.spigot().sendMessage(textComponent);
        } else {
            sender.sendMessage(Platform.translateColors(textComponent.getText()));
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
        return sender.isOp() || sender.hasPermission("openaudiomc.*") || sender.hasPermission("openaudiomc.tips");
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
    public String getIpAddress() {
        if (sender instanceof Player) {
            Player p = (Player) sender;
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
        Player sp = (Player) sender;
        sendActionbar(new TextComponent(text));
    }

    @Override
    public CommandSender getOriginal() {
        return sender;
    }

    @Override
    public String getName() {
        return sender.getName();
    }

    private void sendActionbar(TextComponent tc) {
        String nmsver = getServerVersion();
        try {
            Class<?> craftPlayerClass = Class.forName("org.bukkit.craftbukkit." + nmsver + ".entity.CraftPlayer");
            Object craftPlayer = craftPlayerClass.cast(sender);
            Object ppoc;
            Class<?> c4 = Class.forName("net.minecraft.server." + nmsver + ".PacketPlayOutChat");
            Class<?> c5 = Class.forName("net.minecraft.server." + nmsver + ".Packet");
            Class<?> c2 = Class.forName("net.minecraft.server." + nmsver + ".ChatComponentText");
            Class<?> c3 = Class.forName("net.minecraft.server." + nmsver + ".IChatBaseComponent");
            Object o = c2.getConstructor(new Class<?>[]{String.class}).newInstance(tc.getText());
            ppoc = c4.getConstructor(new Class<?>[]{c3, byte.class}).newInstance(o, (byte) 2);
            Method m1 = craftPlayerClass.getDeclaredMethod("getHandle");
            Object h = m1.invoke(craftPlayer);
            Field f1 = h.getClass().getDeclaredField("playerConnection");
            Object pc = f1.get(h);
            Method m5 = pc.getClass().getDeclaredMethod("sendPacket", c5);
            m5.invoke(pc, ppoc);
        } catch (Exception exception) {
            exception.printStackTrace();
        }
    }

    public static String getServerVersion() {
        try {
            return Bukkit.getServer().getClass().getPackage().getName().replace(".", ",").split(",")[3];
        } catch (ArrayIndexOutOfBoundsException whatVersionAreYouUsingException) {
            return null;
        }
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
