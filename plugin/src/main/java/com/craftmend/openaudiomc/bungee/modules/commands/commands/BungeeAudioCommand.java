package com.craftmend.openaudiomc.bungee.modules.commands.commands;

import com.craftmend.openaudiomc.OpenAudioMc;
import com.craftmend.openaudiomc.bungee.modules.player.objects.BungeePlayerSelector;
import com.craftmend.openaudiomc.generic.commands.CommandModule;
import net.md_5.bungee.api.CommandSender;
import net.md_5.bungee.api.connection.ProxiedPlayer;
import net.md_5.bungee.api.plugin.Command;

public class BungeeAudioCommand extends Command {

    private CommandModule commandModule = OpenAudioMc.getInstance().getCommandModule();

    public BungeeAudioCommand() {
        super("audio", null, "sound", "connect", "muziek", "mcaudio", "mcconnect", "mconnect");
    }

    @Override
    public void execute(CommandSender sender, String[] args) {
        if (!OpenAudioMc.getInstance().getAuthenticationService().getIsSuccesfull()) {
            sender.sendMessage(OpenAudioMc.getInstance().getCommandModule().getCommandPrefix() +
                    OpenAudioMc.getInstance().getAuthenticationService().getFailureMessage());
            return;
        }

        if (sender instanceof ProxiedPlayer) {
            ProxiedPlayer player = (ProxiedPlayer) sender;
            OpenAudioMc.getInstance().getNetworkingService().getClient(player.getUniqueId()).publishUrl();
        } else {
            if (args.length == 0) {
                sender.sendMessage(OpenAudioMc.getInstance().getCommandModule().getCommandPrefix() + "You must provide a player name OR selector to send trigger the URL");
                return;
            }

            for (ProxiedPlayer player : new BungeePlayerSelector(args[0]).getPlayers(sender)) {
                OpenAudioMc.getInstance().getNetworkingService().getClient(player.getUniqueId()).publishUrl();
            }
        }
    }
}
