package com.craftmend.openaudiomc.velocity.modules.commands.commands;

import com.craftmend.openaudiomc.OpenAudioMc;
import com.craftmend.openaudiomc.generic.commands.CommandService;
import com.craftmend.openaudiomc.generic.commands.helpers.CommandMiddewareExecutor;
import com.craftmend.openaudiomc.generic.commands.interfaces.CommandMiddleware;
import com.craftmend.openaudiomc.generic.commands.middleware.CatchCrashMiddleware;
import com.craftmend.openaudiomc.generic.commands.middleware.CatchLegalBindingMiddleware;
import com.craftmend.openaudiomc.generic.commands.middleware.CleanStateCheckMiddleware;
import com.craftmend.openaudiomc.generic.networking.client.objects.player.ClientConnection;
import com.craftmend.openaudiomc.generic.networking.interfaces.NetworkingService;
import com.craftmend.openaudiomc.generic.platform.Platform;
import com.craftmend.openaudiomc.generic.player.User;
import com.craftmend.openaudiomc.generic.player.adapters.VelocityUserAdapter;
import com.craftmend.openaudiomc.generic.storage.enums.StorageKey;
import com.velocitypowered.api.command.CommandSource;
import com.velocitypowered.api.command.SimpleCommand;
import com.velocitypowered.api.proxy.Player;

public class VelocityVolumeCommand implements SimpleCommand {

    private final CommandService commandService = OpenAudioMc.getService(CommandService.class);
    private final CommandMiddleware[] commandMiddleware = new CommandMiddleware[]{
            new CatchLegalBindingMiddleware(),
            new CatchCrashMiddleware(),
            new CleanStateCheckMiddleware()
    };

    @Override
    public void execute(Invocation invocation) {
        CommandSource source = invocation.source();
        User user = new VelocityUserAdapter(source);
        if (CommandMiddewareExecutor.shouldBeCanceled(user, null, commandMiddleware))
            return;

        if (!(source instanceof Player)) {
            user.sendMessage("This command can only be used by players");
            return;
        }

        ClientConnection clientConnection = OpenAudioMc.getService(NetworkingService.class).getClient(user.getUniqueId());

        if (!clientConnection.isConnected()) {
            user.sendMessage(Platform.translateColors(
                    StorageKey.MESSAGE_CLIENT_VOLUME_CHANGED.getString())
                    .replaceAll("__amount__", clientConnection.getVolume() + ""
                    ));
            return;
        }

        String[] args = invocation.arguments();

        if (args.length == 0) {
            String message = Platform.translateColors(OpenAudioMc.getInstance().getConfiguration().getString(StorageKey.MESSAGE_CLIENT_VOLUME_INVALID));
            user.sendMessage(message);
            return;
        }

        try {
            int volume = Integer.parseInt(args[0]);
            //check if in range
            if (volume < 0 || volume > 100) {
                String message = Platform.translateColors(OpenAudioMc.getInstance().getConfiguration().getString(StorageKey.MESSAGE_CLIENT_VOLUME_INVALID));
                user.sendMessage(message);
                return;
            } else {
                clientConnection.setVolume(volume);
            }
        } catch (Exception e) {
            String message = Platform.translateColors(OpenAudioMc.getInstance().getConfiguration().getString(StorageKey.MESSAGE_CLIENT_VOLUME_INVALID));
            user.sendMessage(message);
            return;
        }

    }
}
