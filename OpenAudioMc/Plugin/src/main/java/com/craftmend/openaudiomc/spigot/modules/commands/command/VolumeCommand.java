package com.craftmend.openaudiomc.spigot.modules.commands.command;

import com.craftmend.openaudiomc.OpenAudioMc;
import com.craftmend.openaudiomc.generic.commands.helpers.CommandMiddewareExecutor;
import com.craftmend.openaudiomc.generic.commands.interfaces.CommandMiddleware;
import com.craftmend.openaudiomc.generic.commands.middleware.CatchCrashMiddleware;
import com.craftmend.openaudiomc.generic.commands.middleware.CatchLegalBindingMiddleware;
import com.craftmend.openaudiomc.generic.commands.middleware.CleanStateCheckMiddleware;
import com.craftmend.openaudiomc.generic.proxy.interfaces.UserHooks;
import com.craftmend.openaudiomc.generic.user.User;
import com.craftmend.openaudiomc.generic.storage.enums.StorageKey;
import com.craftmend.openaudiomc.generic.platform.Platform;
import com.craftmend.openaudiomc.spigot.modules.players.SpigotPlayerService;
import com.craftmend.openaudiomc.spigot.modules.players.objects.SpigotConnection;

import lombok.NoArgsConstructor;
import org.bukkit.command.Command;
import org.bukkit.command.CommandExecutor;
import org.bukkit.command.CommandSender;
import org.bukkit.entity.Player;

@NoArgsConstructor
public class VolumeCommand implements CommandExecutor {

    private final CommandMiddleware[] commandMiddleware = new CommandMiddleware[] {
            new CatchLegalBindingMiddleware(),
            new CatchCrashMiddleware(),
            new CleanStateCheckMiddleware()
    };

    @Override
    public boolean onCommand(CommandSender sender, Command command, String s, String[] args) {
        User sua = OpenAudioMc.resolveDependency(UserHooks.class).fromCommandSender(sender);
        if (CommandMiddewareExecutor.shouldBeCanceled(sua, null, commandMiddleware)) return true;

        if (sender instanceof Player) {
            SpigotConnection spigotConnection = OpenAudioMc.getService(SpigotPlayerService.class).getClient(((Player) sender).getUniqueId());

            if (!spigotConnection.getClientConnection().isConnected()) {
                String message = Platform.translateColors(StorageKey.MESSAGE_CLIENT_NOT_CONNECTED.getString());
                sender.sendMessage(message);
                return true;
            }

            if (args.length == 0) {
                sender.sendMessage(Platform.translateColors(
                        StorageKey.MESSAGE_CLIENT_VOLUME_INVALID.getString())
                );
                return true;
            }

            try {
                int volume = Integer.parseInt(args[0]);
                //check if in range
                if (volume < 0 || volume > 100) {
                    String message = Platform.translateColors(StorageKey.MESSAGE_CLIENT_VOLUME_INVALID.getString());
                    sender.sendMessage(message);
                    return true;
                } else {
                    spigotConnection.getClientConnection().setVolume(volume);
                }
            } catch (Exception e) {
                String message = Platform.translateColors(StorageKey.MESSAGE_CLIENT_VOLUME_INVALID.getString());
                sender.sendMessage(message);
                return true;
            }
        } else {
            sender.sendMessage("This command can only be used by players");
        }
        return true;
    }

}
