package com.craftmend.openaudiomc.velocity.modules.commands.commands;

import com.craftmend.openaudiomc.OpenAudioMc;
import com.craftmend.openaudiomc.generic.commands.CommandModule;
import com.craftmend.openaudiomc.generic.commands.helpers.CommandMiddewareExecutor;
import com.craftmend.openaudiomc.generic.commands.interfaces.CommandMiddleware;
import com.craftmend.openaudiomc.generic.commands.middleware.CatchCrashMiddleware;
import com.craftmend.openaudiomc.generic.commands.middleware.CatchLegalBindingMiddleware;
import com.craftmend.openaudiomc.generic.commands.middleware.CleanStateCheckMiddleware;
import com.craftmend.openaudiomc.generic.networking.client.objects.player.ClientConnection;
import com.craftmend.openaudiomc.generic.platform.Platform;
import com.craftmend.openaudiomc.generic.storage.enums.StorageKey;
import com.craftmend.openaudiomc.velocity.generic.commands.adapters.VelocityCommandSenderAdapter;
import com.velocitypowered.api.command.CommandSource;
import com.velocitypowered.api.command.SimpleCommand;
import com.velocitypowered.api.proxy.Player;

public class VelocityVolumeCommand implements SimpleCommand {

    private final CommandModule commandModule = OpenAudioMc.getInstance().getCommandModule();
    private final CommandMiddleware[] commandMiddleware = new CommandMiddleware[]{
            new CatchLegalBindingMiddleware(),
            new CatchCrashMiddleware(),
            new CleanStateCheckMiddleware()
    };

    @Override
    public void execute(Invocation invocation) {
        CommandSource source = invocation.source();
        VelocityCommandSenderAdapter sender = new VelocityCommandSenderAdapter(source);
        if (CommandMiddewareExecutor.shouldBeCanceled(sender, null, commandMiddleware))
            return;

        if (!(source instanceof Player)) {
            sender.sendMessage("This command can only be used by players");
            return;
        }

        ClientConnection clientConnection = OpenAudioMc.getInstance().getNetworkingService().getClient(sender.getUuid());

        if (!clientConnection.isConnected()) {
            sender.sendMessage(Platform.translateColors(
                    StorageKey.MESSAGE_CLIENT_VOLUME_CHANGED.getString())
                    .replaceAll("__amount__", clientConnection.getVolume() + ""
                    ));
            return;
        }

        String[] args = invocation.arguments();

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
