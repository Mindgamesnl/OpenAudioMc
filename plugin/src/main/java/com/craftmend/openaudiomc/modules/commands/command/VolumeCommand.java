package com.craftmend.openaudiomc.modules.commands.command;

import com.craftmend.openaudiomc.OpenAudioMc;
import com.craftmend.openaudiomc.modules.players.objects.Client;
import org.bukkit.ChatColor;
import org.bukkit.command.Command;
import org.bukkit.command.CommandExecutor;
import org.bukkit.command.CommandSender;
import org.bukkit.entity.Player;

public class VolumeCommand implements CommandExecutor {

    @Override
    public boolean onCommand(CommandSender sender, Command command, String s, String[] args) {
        if (sender instanceof Player) {
            Client client = OpenAudioMc.getInstance().getPlayerModule().getClient(((Player) sender).getUniqueId());

            if (!client.isConnected()) {
                sender.sendMessage(ChatColor.translateAlternateColorCodes('&', OpenAudioMc.getInstance().getConfig().getString("client-not-connected")));
                return true;
            }

            if (args.length == 0) {
                sender.sendMessage(ChatColor.translateAlternateColorCodes('&', OpenAudioMc.getInstance().getConfig().getString("client-volume-invalid")));
                return true;
            }

            try {
                int volume = Integer.parseInt(args[0]);
                //check if in range
                if (volume < 0 || volume > 100) {
                    sender.sendMessage(ChatColor.translateAlternateColorCodes('&', OpenAudioMc.getInstance().getConfig().getString("client-volume-invalid")));
                    return true;
                } else {
                    client.setVolume(volume);
                }
            } catch (Exception e) {
                sender.sendMessage(ChatColor.translateAlternateColorCodes('&', OpenAudioMc.getInstance().getConfig().getString("client-volume-invalid")));
                return true;
            }
        } else {
            sender.sendMessage(OpenAudioMc.getLOG_PREFIX() + "This command can only be used by players");
        }
        return true;
    }

}
