package com.craftmend.openaudiomc.bungee.modules.commands.commands;

import com.craftmend.openaudiomc.OpenAudioMcCore;
import com.craftmend.openaudiomc.bungee.modules.player.objects.BungeePlayerSelector;
import com.craftmend.openaudiomc.generic.commands.CommandModule;
import com.craftmend.openaudiomc.generic.configuration.enums.StorageKey;
import com.craftmend.openaudiomc.generic.networking.client.objects.ClientConnection;
import com.craftmend.openaudiomc.generic.platform.Platform;
import net.md_5.bungee.api.CommandSender;
import net.md_5.bungee.api.connection.ProxiedPlayer;
import net.md_5.bungee.api.plugin.Command;

public class BungeeAudioCommand extends Command {

    private CommandModule commandModule = OpenAudioMcCore.getInstance().getCommandModule();

    public BungeeAudioCommand() {
        super("audio", null, "sound", "connect", "muziek", "mcaudio", "mcconnect", "mconnect");
    }

    @Override
    public void execute(CommandSender sender, String[] args) {
        if (!OpenAudioMcCore.getInstance().getAuthenticationService().getIsSuccesfull()) {
            sender.sendMessage(OpenAudioMcCore.getInstance().getCommandModule().getCommandPrefix() +
                    OpenAudioMcCore.getInstance().getAuthenticationService().getFailureMessage());
            return;
        }

        if (sender instanceof ProxiedPlayer) {
            ProxiedPlayer player = (ProxiedPlayer) sender;
            OpenAudioMcCore.getInstance().getNetworkingService().getClient(player.getUniqueId()).publishUrl();
        } else {
            if (args.length == 0) {
                sender.sendMessage(OpenAudioMcCore.getInstance().getCommandModule().getCommandPrefix() + "You must provide a player name OR selector to send trigger the URL");
                return;
            }

            for (ProxiedPlayer player : new BungeePlayerSelector(args[0]).getPlayers(sender)) {
                OpenAudioMcCore.getInstance().getNetworkingService().getClient(player.getUniqueId()).publishUrl();
            }
        }
    }
}
