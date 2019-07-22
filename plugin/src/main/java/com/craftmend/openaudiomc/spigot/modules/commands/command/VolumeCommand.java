package com.craftmend.openaudiomc.spigot.modules.commands.command;

import com.craftmend.openaudiomc.spigot.OpenAudioMcSpigot;
import com.craftmend.openaudiomc.spigot.modules.players.objects.Client;
import lombok.AllArgsConstructor;
import org.bukkit.ChatColor;
import org.bukkit.command.Command;
import org.bukkit.command.CommandExecutor;
import org.bukkit.command.CommandSender;
import org.bukkit.entity.Player;

@AllArgsConstructor
public class VolumeCommand implements CommandExecutor {

    private OpenAudioMcSpigot main;

    @Override
    public boolean onCommand(CommandSender sender, Command command, String s, String[] args) {
        if (!main.getAuthenticationService().getIsSuccesfull()) {
            sender.sendMessage(main.getCommandModule().getCommandPrefix() + main.getAuthenticationService().getFailureMessage());
            return true;
        }

        if (sender instanceof Player) {
            Client client = OpenAudioMcSpigot.getInstance().getPlayerModule().getClient(((Player) sender).getUniqueId());

            if (!client.isConnected()) {
                sender.sendMessage(ChatColor.translateAlternateColorCodes('&', OpenAudioMcSpigot.getInstance().getConfig().getString("messages.client-not-connected")));
                return true;
            }

            if (args.length == 0) {
                sender.sendMessage(ChatColor.translateAlternateColorCodes('&', OpenAudioMcSpigot.getInstance().getConfig().getString("messages.client-volume-invalid")));
                return true;
            }

            try {
                int volume = Integer.parseInt(args[0]);
                //check if in range
                if (volume < 0 || volume > 100) {
                    sender.sendMessage(ChatColor.translateAlternateColorCodes('&', OpenAudioMcSpigot.getInstance().getConfig().getString("messages.client-volume-invalid")));
                    return true;
                } else {
                    client.setVolume(volume);
                }
            } catch (Exception e) {
                sender.sendMessage(ChatColor.translateAlternateColorCodes('&', OpenAudioMcSpigot.getInstance().getConfig().getString("messages.client-volume-invalid")));
                return true;
            }
        } else {
            sender.sendMessage(OpenAudioMcSpigot.getLOG_PREFIX() + "This command can only be used by players");
        }
        return true;
    }

}
