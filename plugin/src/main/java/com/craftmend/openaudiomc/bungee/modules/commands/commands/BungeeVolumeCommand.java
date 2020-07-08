package com.craftmend.openaudiomc.bungee.modules.commands.commands;

import com.craftmend.openaudiomc.OpenAudioMc;
import com.craftmend.openaudiomc.generic.commands.CommandModule;
import com.craftmend.openaudiomc.generic.commands.adapters.BungeeCommandSenderAdapter;
import com.craftmend.openaudiomc.generic.commands.helpers.CommandMiddewareExecutor;
import com.craftmend.openaudiomc.generic.commands.interfaces.CommandMiddleware;
import com.craftmend.openaudiomc.generic.commands.middleware.CatchCrashMiddleware;
import com.craftmend.openaudiomc.generic.commands.middleware.CatchLegalBindingMiddleware;
import com.craftmend.openaudiomc.generic.commands.middleware.CleanStateCheckMiddleware;
import com.craftmend.openaudiomc.generic.core.storage.enums.StorageKey;
import com.craftmend.openaudiomc.generic.networking.client.objects.player.ClientConnection;
import com.craftmend.openaudiomc.generic.platform.Platform;
import net.md_5.bungee.api.CommandSender;
import net.md_5.bungee.api.connection.ProxiedPlayer;
import net.md_5.bungee.api.plugin.Command;

public class BungeeVolumeCommand extends Command {

    private CommandModule commandModule = OpenAudioMc.getInstance().getCommandModule();
    private CommandMiddleware[] commandMiddleware = new CommandMiddleware[] {
            new CatchLegalBindingMiddleware(),
            new CatchCrashMiddleware(),
            new CleanStateCheckMiddleware()
    };

    public BungeeVolumeCommand() {
        super("vol", null, "vol");
    }

    @Override
    public void execute(CommandSender sender, String[] args) {
        if (CommandMiddewareExecutor.shouldBeCanceled(new BungeeCommandSenderAdapter(sender), null, commandMiddleware)) return;

        if (!(sender instanceof ProxiedPlayer)) {
            sender.sendMessage("This command can only be used by players");
            return;
        }

        ClientConnection clientConnection = OpenAudioMc.getInstance().getNetworkingService().getClient(((ProxiedPlayer) sender).getUniqueId());

        if (!clientConnection.isConnected()) {
            String message = Platform.translateColors(OpenAudioMc.getInstance().getConfiguration().getString(StorageKey.MESSAGE_CLIENT_NOT_CONNECTED));
            sender.sendMessage(message);
            return;
        }

        if (args.length == 0) {
            String message = Platform.translateColors(OpenAudioMc.getInstance().getConfiguration().getString(StorageKey.MESSAGE_CLIENT_VOLUME_INVALID));
            sender.sendMessage(message);
            return;
        }

        try {
            int volume = Integer.parseInt(args[0]);
            //check if in range
            if (volume < 0 || volume > 100) {
                String message = Platform.translateColors(OpenAudioMc.getInstance().getConfiguration().getString(StorageKey.MESSAGE_CLIENT_VOLUME_INVALID));
                sender.sendMessage(message);
                return;
            } else {
                clientConnection.setVolume(volume);
            }
        } catch (Exception e) {
            String message = Platform.translateColors(OpenAudioMc.getInstance().getConfiguration().getString(StorageKey.MESSAGE_CLIENT_VOLUME_INVALID));
            sender.sendMessage(message);
            return;
        }

    }
}
