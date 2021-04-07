package com.craftmend.openaudiomc.generic.commands.subcommands;

import com.craftmend.openaudiomc.OpenAudioMc;
import com.craftmend.openaudiomc.generic.commands.interfaces.GenericExecutor;
import com.craftmend.openaudiomc.generic.platform.Platform;
import net.md_5.bungee.api.CommandSender;
import net.md_5.bungee.api.chat.ClickEvent;
import net.md_5.bungee.api.chat.TextComponent;
import net.md_5.bungee.api.connection.ProxiedPlayer;
import org.bukkit.entity.Player;

class HelperMd5 {
    static void goldClickableMessage(GenericExecutor s, String message, String command) {

        // decide based on platform
        if (OpenAudioMc.getInstance().getPlatform() == Platform.SPIGOT) {
            TextComponent component = new TextComponent(" " + Platform.makeColor("YELLOW") + "> " + Platform.makeColor("GOLD") + message);
            component.setClickEvent(new ClickEvent(ClickEvent.Action.RUN_COMMAND, "/" + command));

            if (s.getOriginal() instanceof Player) {
                Player player = (Player) s.getOriginal();
                player.spigot().sendMessage(component);
            } else {
                s.sendMessage(component.getText());
            }
        } else {
            TextComponent component = new TextComponent(" " + Platform.makeColor("YELLOW") + "> " + Platform.makeColor("GOLD") + message);
            component.setClickEvent(new ClickEvent(ClickEvent.Action.RUN_COMMAND, "/" + command));
            CommandSender player = (CommandSender) s.getOriginal();
            player.sendMessage(component);
        }
    }
}
