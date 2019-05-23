package com.craftmend.openaudiomc.modules.players.commands;

import com.craftmend.openaudiomc.OpenAudioMc;
import com.craftmend.openaudiomc.modules.players.objects.PlayerSelector;
import org.bukkit.ChatColor;
import org.bukkit.command.Command;
import org.bukkit.command.CommandExecutor;
import org.bukkit.command.CommandSender;
import org.bukkit.entity.Player;

public class ConnectCommand implements CommandExecutor {
    @Override
    public boolean onCommand(CommandSender commandSender, Command command, String s, String[] args) {

        if (commandSender instanceof Player) {
            Player sender = (Player) commandSender;
            OpenAudioMc.getInstance().getPlayerModule().getClient(sender).publishUrl();
        } else {
            if (args.length == 0) {
                commandSender.sendMessage(OpenAudioMc.getInstance().getCommandModule().getCommandPrefix() + ChatColor.RED + "You must provide a player name OR selector to send trigger the URL");
                return true;
            }

            for (Player player : new PlayerSelector(args[0]).getPlayers(commandSender)) {
                OpenAudioMc.getInstance().getPlayerModule().getClient(player).publishUrl();
            }
        }

        return true;
    }
}
