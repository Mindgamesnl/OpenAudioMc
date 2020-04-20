package com.craftmend.openaudiomc.bungee.modules.commands.commands;

import com.craftmend.openaudiomc.OpenAudioMc;
import com.craftmend.openaudiomc.generic.commands.CommandModule;
import com.craftmend.openaudiomc.generic.storage.enums.StorageKey;
import com.craftmend.openaudiomc.generic.networking.client.objects.ClientConnection;
import com.craftmend.openaudiomc.generic.platform.Platform;
import net.md_5.bungee.api.CommandSender;
import net.md_5.bungee.api.connection.ProxiedPlayer;
import net.md_5.bungee.api.plugin.Command;

public class BungeeVolumeCommand extends Command {

    private CommandModule commandModule = OpenAudioMc.getInstance().getCommandModule();

    public BungeeVolumeCommand() {
        super("vol", null, "vol");
    }

    @Override
    public void execute(CommandSender sender, String[] args) {
        if (!OpenAudioMc.getInstance().getAuthenticationService().isSuccesfull()) {
            sender.sendMessage(OpenAudioMc.getInstance().getCommandModule().getCommandPrefix() + OpenAudioMc.getInstance().getAuthenticationService().getFailureMessage());
            return;
        }

        if (!(sender instanceof ProxiedPlayer)) {
            sender.sendMessage("This command can only be used by players");
            return;
        }

        ClientConnection clientConnection = OpenAudioMc.getInstance().getNetworkingService().getClient(((ProxiedPlayer) sender).getUniqueId());

        if (!clientConnection.isConnected()) {
            String message = Platform.translateColors(OpenAudioMc.getInstance().getConfigurationImplementation().getString(StorageKey.MESSAGE_CLIENT_NOT_CONNECTED));
            sender.sendMessage(message);
            return;
        }

        if (args.length == 0) {
            String message = Platform.translateColors(OpenAudioMc.getInstance().getConfigurationImplementation().getString(StorageKey.MESSAGE_CLIENT_VOLUME_INVALID));
            sender.sendMessage(message);
            return;
        }

        try {
            int volume = Integer.parseInt(args[0]);
            //check if in range
            if (volume < 0 || volume > 100) {
                String message = Platform.translateColors(OpenAudioMc.getInstance().getConfigurationImplementation().getString(StorageKey.MESSAGE_CLIENT_VOLUME_INVALID));
                sender.sendMessage(message);
                return;
            } else {
                clientConnection.setVolume(volume);
            }
        } catch (Exception e) {
            String message = Platform.translateColors(OpenAudioMc.getInstance().getConfigurationImplementation().getString(StorageKey.MESSAGE_CLIENT_VOLUME_INVALID));
            sender.sendMessage(message);
            return;
        }

    }
}
