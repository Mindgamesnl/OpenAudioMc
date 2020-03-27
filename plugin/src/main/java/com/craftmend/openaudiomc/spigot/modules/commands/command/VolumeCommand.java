package com.craftmend.openaudiomc.spigot.modules.commands.command;

import com.craftmend.openaudiomc.OpenAudioMc;
import com.craftmend.openaudiomc.generic.storage.enums.StorageKey;
import com.craftmend.openaudiomc.generic.platform.Platform;
import com.craftmend.openaudiomc.spigot.OpenAudioMcSpigot;
import com.craftmend.openaudiomc.spigot.modules.players.objects.SpigotConnection;
import lombok.AllArgsConstructor;

import org.bukkit.command.Command;
import org.bukkit.command.CommandExecutor;
import org.bukkit.command.CommandSender;
import org.bukkit.entity.Player;

@AllArgsConstructor
public class VolumeCommand implements CommandExecutor {

    @Override
    public boolean onCommand(CommandSender sender, Command command, String s, String[] args) {
        if (!OpenAudioMc.getInstance().getAuthenticationService().isSuccesfull()) {
            sender.sendMessage(OpenAudioMc.getInstance().getCommandModule().getCommandPrefix() + OpenAudioMc.getInstance().getAuthenticationService().getFailureMessage());
            return true;
        }

        if (sender instanceof Player) {
            SpigotConnection spigotConnection = OpenAudioMcSpigot.getInstance().getPlayerModule().getClient(((Player) sender).getUniqueId());

            if (!spigotConnection.getClientConnection().isConnected()) {
                String message = Platform.translateColors(OpenAudioMc.getInstance().getOAConfiguration().getString(StorageKey.MESSAGE_CLIENT_NOT_CONNECTED));
                sender.sendMessage(message);
                return true;
            }

            if (args.length == 0) {
                String message = Platform.translateColors(OpenAudioMc.getInstance().getOAConfiguration().getString(StorageKey.MESSAGE_CLIENT_VOLUME_INVALID));
                sender.sendMessage(message);
                return true;
            }

            try {
                int volume = Integer.parseInt(args[0]);
                //check if in range
                if (volume < 0 || volume > 100) {
                    String message = Platform.translateColors(OpenAudioMc.getInstance().getOAConfiguration().getString(StorageKey.MESSAGE_CLIENT_VOLUME_INVALID));
                    sender.sendMessage(message);
                    return true;
                } else {
                    spigotConnection.getClientConnection().setVolume(volume);
                }
            } catch (Exception e) {
                String message = Platform.translateColors(OpenAudioMc.getInstance().getOAConfiguration().getString(StorageKey.MESSAGE_CLIENT_VOLUME_INVALID));
                sender.sendMessage(message);
                return true;
            }
        } else {
            sender.sendMessage("This command can only be used by players");
        }
        return true;
    }

}
