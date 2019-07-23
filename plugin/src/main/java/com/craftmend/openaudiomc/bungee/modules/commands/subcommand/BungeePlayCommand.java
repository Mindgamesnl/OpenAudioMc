package com.craftmend.openaudiomc.bungee.modules.commands.subcommand;

import com.craftmend.openaudiomc.OpenAudioMcCore;
import com.craftmend.openaudiomc.bungee.modules.player.objects.BungeePlayerSelector;

import com.craftmend.openaudiomc.generic.commands.interfaces.GenericExecutor;
import com.craftmend.openaudiomc.generic.networking.client.objects.ClientConnection;
import com.craftmend.openaudiomc.generic.commands.interfaces.SubCommand;
import com.craftmend.openaudiomc.generic.commands.objects.Argument;
import com.craftmend.openaudiomc.generic.media.objects.Media;
import com.craftmend.openaudiomc.generic.media.objects.MediaOptions;

import com.google.gson.Gson;
import net.md_5.bungee.api.CommandSender;
import net.md_5.bungee.api.connection.ProxiedPlayer;

public class BungeePlayCommand extends SubCommand {

    private OpenAudioMcCore openAudioMcCore;

    public BungeePlayCommand(OpenAudioMcCore openAudioMcCore) {
        super("play");
        registerArguments(
                new Argument("<selector> <source>",
                        "Plays a sound for all the players in a selection"),
                new Argument("<selector> <source> <options>",
                        "Plays a sound with configuration (like fade time, sync etc) for all players in a selection")
        );
        this.openAudioMcCore = openAudioMcCore;
    }

    @Override
    public void onExecute(GenericExecutor sender, String[] args) {
        if (args.length == 0) {
            sendHelp(sender);
            return;
        }

        if (args.length == 2) {
            Media media = new Media(args[1]);
            for (ProxiedPlayer player : new BungeePlayerSelector(args[0]).getPlayers((CommandSender) sender.getOriginal())) {
                ClientConnection clientConnection = openAudioMcCore.getNetworkingService().getClient(player.getUniqueId());
                clientConnection.sendMedia(media);
            }
            message(sender, "Media created.");
            return;
        }

        if (args.length == 3) {
            try {
                MediaOptions mediaOptions = new Gson().fromJson(args[2], MediaOptions.class);
                Media media = new Media(args[1]).applySettings(mediaOptions);
                for (ProxiedPlayer player : new BungeePlayerSelector(args[0]).getPlayers((CommandSender) sender.getOriginal())) {
                    ClientConnection clientConnection = openAudioMcCore.getNetworkingService().getClient(player.getUniqueId());
                    clientConnection.sendMedia(media);
                }
                message(sender, "Media and options created.");
            } catch (Exception e) {
                message(sender, "Error. Invalid options. Please refer to the command guide.");
            }
            return;
        }
        sendHelp(sender);
    }

    private void sendHelp(GenericExecutor genericExecutor) {
        OpenAudioMcCore.getInstance().getCommandModule().getSubCommand("help").onExecute(genericExecutor, new String[] {
                getCommand()
        });;
    }
}
