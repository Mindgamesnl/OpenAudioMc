package com.craftmend.openaudiomc.spigot.modules.commands.command;

import com.craftmend.openaudiomc.OpenAudioMc;
import com.craftmend.openaudiomc.generic.commands.adapters.SpigotCommandSenderAdapter;
import com.craftmend.openaudiomc.generic.commands.helpers.CommandMiddewareExecutor;
import com.craftmend.openaudiomc.generic.commands.interfaces.CommandMiddleware;
import com.craftmend.openaudiomc.generic.commands.middleware.CatchCrashMiddleware;
import com.craftmend.openaudiomc.generic.commands.middleware.CatchLegalBindingMiddleware;
import com.craftmend.openaudiomc.generic.commands.middleware.CleanStateCheckMiddleware;
import com.craftmend.openaudiomc.generic.storage.enums.StorageKey;
import com.craftmend.openaudiomc.generic.platform.Platform;
import com.craftmend.openaudiomc.spigot.OpenAudioMcSpigot;
import com.craftmend.openaudiomc.spigot.modules.players.objects.SpigotConnection;

import lombok.NoArgsConstructor;
import org.bukkit.command.Command;
import org.bukkit.command.CommandExecutor;
import org.bukkit.command.CommandSender;
import org.bukkit.entity.Player;

@NoArgsConstructor
public class VolumeCommand implements CommandExecutor {

    private CommandMiddleware[] commandMiddleware = new CommandMiddleware[] {
            new CatchLegalBindingMiddleware(),
            new CatchCrashMiddleware(),
            new CleanStateCheckMiddleware()
    };

    @Override
    public boolean onCommand(CommandSender sender, Command command, String s, String[] args) {
        if (CommandMiddewareExecutor.shouldBeCanceled(new SpigotCommandSenderAdapter(sender), null, commandMiddleware)) return true;

        if (sender instanceof Player) {
            SpigotConnection spigotConnection = OpenAudioMcSpigot.getInstance().getPlayerModule().getClient(((Player) sender).getUniqueId());

            if (!spigotConnection.getClientConnection().isConnected()) {
                String message = Platform.translateColors(OpenAudioMc.getInstance().getConfiguration().getString(StorageKey.MESSAGE_CLIENT_NOT_CONNECTED));
                sender.sendMessage(message);
                return true;
            }

            if (args.length == 0) {
                String message = Platform.translateColors(OpenAudioMc.getInstance().getConfiguration().getString(StorageKey.MESSAGE_CLIENT_VOLUME_INVALID));
                sender.sendMessage(message);
                return true;
            }

            try {
                int volume = Integer.parseInt(args[0]);
                //check if in range
                if (volume < 0 || volume > 100) {
                    String message = Platform.translateColors(OpenAudioMc.getInstance().getConfiguration().getString(StorageKey.MESSAGE_CLIENT_VOLUME_INVALID));
                    sender.sendMessage(message);
                    return true;
                } else {
                    spigotConnection.getClientConnection().setVolume(volume);
                }
            } catch (Exception e) {
                String message = Platform.translateColors(OpenAudioMc.getInstance().getConfiguration().getString(StorageKey.MESSAGE_CLIENT_VOLUME_INVALID));
                sender.sendMessage(message);
                return true;
            }
        } else {
            sender.sendMessage("This command can only be used by players");
        }
        return true;
    }

}
