package com.craftmend.openaudiomc.generic.commands.helpers;

import com.craftmend.openaudiomc.OpenAudioMc;
import com.craftmend.openaudiomc.generic.commands.interfaces.CommandMiddleware;

import com.craftmend.openaudiomc.generic.commands.interfaces.SubCommand;
import com.craftmend.openaudiomc.generic.player.User;
import com.craftmend.openaudiomc.generic.player.PlayerService;
import com.craftmend.openaudiomc.generic.player.adapters.SpigotUserAdapter;
import org.bukkit.command.CommandSender;
import org.bukkit.entity.Player;

public class CommandMiddewareExecutor {

    public static boolean shouldBeCanceled(User executor, SubCommand subCommand, CommandMiddleware... middlewares) {
        for (CommandMiddleware middleware : middlewares) {
            if (!middleware.continueCommand(executor, subCommand)) return true;
        }
        return false;
    }

    public static boolean shouldBeCanceled(CommandSender commandSender, SubCommand o, CommandMiddleware[] commandMiddleware) {
        if (commandSender instanceof Player) {
            User user = OpenAudioMc.resolveDependency(PlayerService.class).getPlayerByUUID(((Player) commandSender).getUniqueId());
            return shouldBeCanceled(user, o, commandMiddleware);
        } else {
            return shouldBeCanceled(new SpigotUserAdapter(commandSender), o, commandMiddleware);
        }
    }
}
