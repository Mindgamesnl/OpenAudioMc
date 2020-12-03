package com.craftmend.openaudiomc.generic.commands.subcommands;

import com.craftmend.openaudiomc.generic.commands.interfaces.GenericExecutor;
import com.craftmend.openaudiomc.generic.platform.Platform;
import com.velocitypowered.api.proxy.Player;
import net.kyori.adventure.text.Component;
import net.kyori.adventure.text.TextComponent;
import net.kyori.adventure.text.event.ClickEvent;

class HelperVelocity {
    static void goldClickableMessage(GenericExecutor s, String message, String command) {
        if (s.getOriginal() instanceof Player) {
            TextComponent component = Component.text(" " + Platform.makeColor("YELLOW") + "> " + Platform.makeColor("GOLD") + message);

            component.clickEvent(ClickEvent.clickEvent(ClickEvent.Action.RUN_COMMAND, "/" + command));

            Player player = (Player) s.getOriginal();
            player.sendMessage(component);
        }
    }
}
