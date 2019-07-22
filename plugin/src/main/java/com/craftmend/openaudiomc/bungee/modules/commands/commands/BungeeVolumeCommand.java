package com.craftmend.openaudiomc.bungee.modules.commands.commands;

import com.craftmend.openaudiomc.OpenAudioMcCore;
import com.craftmend.openaudiomc.generic.commands.CommandModule;
import com.craftmend.openaudiomc.generic.configuration.enums.StorageKey;
import com.craftmend.openaudiomc.generic.networking.client.objects.ClientConnection;
import com.craftmend.openaudiomc.generic.platform.Platform;
import net.md_5.bungee.api.CommandSender;
import net.md_5.bungee.api.connection.ProxiedPlayer;
import net.md_5.bungee.api.plugin.Command;

public class BungeeVolumeCommand extends Command {

    private CommandModule commandModule = OpenAudioMcCore.getInstance().getCommandModule();

    public BungeeVolumeCommand() {
        super("vol", null, "vol");
    }

    @Override
    public void execute(CommandSender sender, String[] args) {
        if (!OpenAudioMcCore.getInstance().getAuthenticationService().getIsSuccesfull()) {
            sender.sendMessage(OpenAudioMcCore.getInstance().getCommandModule().getCommandPrefix() + OpenAudioMcCore.getInstance().getAuthenticationService().getFailureMessage());
            return;
        }

        if (!(sender instanceof ProxiedPlayer)) {
            sender.sendMessage(OpenAudioMcCore.getLOG_PREFIX() + "This command can only be used by players");
            return;
        }

        ClientConnection clientConnection = OpenAudioMcCore.getInstance().getNetworkingService().getClient(((ProxiedPlayer) sender).getUniqueId());

        if (!clientConnection.isConnected()) {
            String message = Platform.translateColors(OpenAudioMcCore.getInstance().getConfigurationInterface().getString(StorageKey.MESSAGE_CLIENT_NOT_CONNECTED));
            sender.sendMessage(message);
            return;
        }

        if (args.length == 0) {
            String message = Platform.translateColors(OpenAudioMcCore.getInstance().getConfigurationInterface().getString(StorageKey.MESSAGE_CLIENT_VOLUME_INVALID));
            sender.sendMessage(message);
            return;
        }

        try {
            int volume = Integer.parseInt(args[0]);
            //check if in range
            if (volume < 0 || volume > 100) {
                String message = Platform.translateColors(OpenAudioMcCore.getInstance().getConfigurationInterface().getString(StorageKey.MESSAGE_CLIENT_VOLUME_INVALID));
                sender.sendMessage(message);
                return;
            } else {
                clientConnection.setVolume(volume);
            }
        } catch (Exception e) {
            String message = Platform.translateColors(OpenAudioMcCore.getInstance().getConfigurationInterface().getString(StorageKey.MESSAGE_CLIENT_VOLUME_INVALID));
            sender.sendMessage(message);
            return;
        }

    }
}
