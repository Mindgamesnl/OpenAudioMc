package com.craftmend.openaudiomc.bungee.modules.commands.subcommand;

import com.craftmend.openaudiomc.OpenAudioMc;
import com.craftmend.openaudiomc.bungee.modules.player.objects.BungeePlayerSelector;

import com.craftmend.openaudiomc.generic.commands.CommandService;

import com.craftmend.openaudiomc.generic.logging.OpenAudioLogger;
import com.craftmend.openaudiomc.generic.media.objects.OptionalError;
import com.craftmend.openaudiomc.generic.networking.client.objects.player.ClientConnection;
import com.craftmend.openaudiomc.generic.commands.interfaces.SubCommand;
import com.craftmend.openaudiomc.generic.commands.objects.Argument;
import com.craftmend.openaudiomc.generic.media.objects.Media;
import com.craftmend.openaudiomc.generic.media.objects.MediaOptions;

import com.craftmend.openaudiomc.generic.networking.interfaces.NetworkingService;
import com.craftmend.openaudiomc.generic.player.User;
import net.md_5.bungee.api.ChatColor;
import net.md_5.bungee.api.CommandSender;
import net.md_5.bungee.api.connection.ProxiedPlayer;

public class BungeePlayCommand extends SubCommand {

    private OpenAudioMc openAudioMc;

    public BungeePlayCommand(OpenAudioMc openAudioMc) {
        super("play", "p");
        registerArguments(
                new Argument("<selector> <source>",
                        "Plays a sound for all the players in a selection"),
                new Argument("<selector> <source> <options>",
                        "Plays a sound with configuration (like fade time, sync etc) for all players in a selection")
        );
        this.openAudioMc = openAudioMc;
    }

    @Override
    public void onExecute(User sender, String[] args) {
        if (args.length == 0) {
            sendHelp(sender);
            return;
        }

        if (args.length == 2) {
            Media media = new Media(args[1]);
            int affected = 0;
            for (ProxiedPlayer player : new BungeePlayerSelector(args[0]).getPlayers((CommandSender) sender.getOriginal())) {
                ClientConnection clientConnection = OpenAudioMc.getService(NetworkingService.class).getClient(player.getUniqueId());
                if (clientConnection.isConnected()) affected++;
                clientConnection.sendMedia(media);
            }
            message(sender, ChatColor.GREEN + "Media created and requested to be played for " + affected + " clients");
            return;
        }

        if (args.length == 3) {
            try {
                MediaOptions mediaOptions = OpenAudioMc.getGson().fromJson(args[2], MediaOptions.class);

                OptionalError parsingError = mediaOptions.validate();
                if (parsingError.isError()) {
                    message(sender, ChatColor.RED + "Error! " + parsingError.getMessage());
                    return;
                }

                Media media = new Media(args[1]).applySettings(mediaOptions);
                for (ProxiedPlayer player : new BungeePlayerSelector(args[0]).getPlayers((CommandSender) sender.getOriginal())) {
                    ClientConnection clientConnection = OpenAudioMc.getService(NetworkingService.class).getClient(player.getUniqueId());
                    clientConnection.sendMedia(media);
                }
                message(sender, ChatColor.GREEN + "Media (with arguments) created and requested to be played.");
            } catch (Exception e) {
                OpenAudioLogger.handleException(e);
                message(sender, ChatColor.RED + "Error. Invalid options. Please refer to the command guide.");
            }
            return;
        }
        sendHelp(sender);
    }

    private void sendHelp(User genericExecutor) {
        OpenAudioMc.getService(CommandService.class).getSubCommand("help").onExecute(genericExecutor, new String[] {
                getCommand()
        });
    }
}
