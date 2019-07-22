package com.craftmend.openaudiomc.spigot.modules.players.commands;

import com.craftmend.openaudiomc.OpenAudioMcCore;
import com.craftmend.openaudiomc.spigot.modules.players.objects.SpigotPlayerSelector;
import lombok.AllArgsConstructor;
import org.bukkit.ChatColor;
import org.bukkit.command.Command;
import org.bukkit.command.CommandExecutor;
import org.bukkit.command.CommandSender;
import org.bukkit.entity.Player;

@AllArgsConstructor
public class ConnectCommand implements CommandExecutor {

    @Override
    public boolean onCommand(CommandSender commandSender, Command command, String s, String[] args) {
        if (!OpenAudioMcCore.getInstance().getAuthenticationService().getIsSuccesfull()) {
            commandSender.sendMessage(OpenAudioMcCore.getInstance().getCommandModule().getCommandPrefix() +
                    OpenAudioMcCore.getInstance().getAuthenticationService().getFailureMessage());
            return true;
        }

        if (commandSender instanceof Player) {
            Player sender = (Player) commandSender;
            OpenAudioMcCore.getInstance().getNetworkingService().getClient(sender.getUniqueId()).publishUrl();
        } else {
            if (args.length == 0) {
                commandSender.sendMessage(OpenAudioMcCore.getInstance().getCommandModule().getCommandPrefix() + ChatColor.RED + "You must provide a player name OR selector to send trigger the URL");
                return true;
            }

            for (Player player : new SpigotPlayerSelector(args[0]).getPlayers(commandSender)) {
                OpenAudioMcCore.getInstance().getNetworkingService().getClient(player.getUniqueId()).publishUrl();
            }
        }
        return true;
    }
}
