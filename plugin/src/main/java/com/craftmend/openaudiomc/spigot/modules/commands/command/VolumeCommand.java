package com.craftmend.openaudiomc.generic.commands.command;

import com.craftmend.openaudiomc.OpenAudioMcCore;
import com.craftmend.openaudiomc.spigot.OpenAudioMcSpigot;
import com.craftmend.openaudiomc.spigot.modules.players.objects.SpigotConnection;
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
        if (!OpenAudioMcCore.getInstance().getAuthenticationService().getIsSuccesfull()) {
            sender.sendMessage(main.getCommandModule().getCommandPrefix() + OpenAudioMcCore.getInstance().getAuthenticationService().getFailureMessage());
            return true;
        }

        if (sender instanceof Player) {
            SpigotConnection spigotConnection = OpenAudioMcSpigot.getInstance().getPlayerModule().getClient(((Player) sender).getUniqueId());

            if (!spigotConnection.getClientConnection().isConnected()) {
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
                    spigotConnection.getClientConnection().setVolume(volume);
                }
            } catch (Exception e) {
                sender.sendMessage(ChatColor.translateAlternateColorCodes('&', OpenAudioMcSpigot.getInstance().getConfig().getString("messages.client-volume-invalid")));
                return true;
            }
        } else {
            sender.sendMessage(OpenAudioMcCore.getLOG_PREFIX() + "This command can only be used by players");
        }
        return true;
    }

}
