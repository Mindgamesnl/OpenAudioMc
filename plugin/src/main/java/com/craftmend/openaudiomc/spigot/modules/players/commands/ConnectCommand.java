package com.craftmend.openaudiomc.spigot.modules.players.commands;

import com.craftmend.openaudiomc.spigot.OpenAudioMcSpigot;
import com.craftmend.openaudiomc.spigot.modules.players.objects.PlayerSelector;
import lombok.AllArgsConstructor;
import org.bukkit.ChatColor;
import org.bukkit.command.Command;
import org.bukkit.command.CommandExecutor;
import org.bukkit.command.CommandSender;
import org.bukkit.entity.Player;

@AllArgsConstructor
public class ConnectCommand implements CommandExecutor {

    private OpenAudioMcSpigot main;

    @Override
    public boolean onCommand(CommandSender commandSender, Command command, String s, String[] args) {

        if (!main.getAuthenticationService().getIsSuccesfull()) {
            commandSender.sendMessage(main.getCommandModule().getCommandPrefix() + main.getAuthenticationService().getFailureMessage());
            return true;
        }

        if (commandSender instanceof Player) {
            Player sender = (Player) commandSender;
            OpenAudioMcSpigot.getInstance().getPlayerModule().getClient(sender).publishUrl();
        } else {
            if (args.length == 0) {
                commandSender.sendMessage(OpenAudioMcSpigot.getInstance().getCommandModule().getCommandPrefix() + ChatColor.RED + "You must provide a player name OR selector to send trigger the URL");
                return true;
            }

            for (Player player : new PlayerSelector(args[0]).getPlayers(commandSender)) {
                OpenAudioMcSpigot.getInstance().getPlayerModule().getClient(player).publishUrl();
            }
        }

        return true;
    }
}
