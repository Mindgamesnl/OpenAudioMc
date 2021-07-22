package com.craftmend.openaudiomc.velocity.modules.commands.subcommand;

import com.craftmend.openaudiomc.OpenAudioMc;
import com.craftmend.openaudiomc.generic.commands.CommandService;
import com.craftmend.openaudiomc.generic.commands.interfaces.GenericExecutor;
import com.craftmend.openaudiomc.generic.commands.interfaces.SubCommand;
import com.craftmend.openaudiomc.generic.commands.objects.Argument;
import com.craftmend.openaudiomc.generic.media.objects.Media;
import com.craftmend.openaudiomc.generic.media.objects.MediaOptions;
import com.craftmend.openaudiomc.generic.media.objects.OptionalError;
import com.craftmend.openaudiomc.generic.networking.client.objects.player.ClientConnection;
import com.craftmend.openaudiomc.generic.networking.interfaces.NetworkingService;
import com.craftmend.openaudiomc.velocity.modules.player.objects.VelocityPlayerSelector;
import com.velocitypowered.api.command.CommandSource;
import com.velocitypowered.api.proxy.Player;

public class VelocityPlayCommand extends SubCommand {

    private final OpenAudioMc openAudioMc;

    public VelocityPlayCommand(OpenAudioMc openAudioMc) {
        super("play");
        registerArguments(
                new Argument("<selector> <source>",
                        "Plays a sound for all the players in a selection"),
                new Argument("<selector> <source> <options>",
                        "Plays a sound with configuration (like fade time, sync etc) for all players in a selection")
        );
        this.openAudioMc = openAudioMc;
    }

    @Override
    public void onExecute(GenericExecutor sender, String[] args) {
        if (args.length == 0) {
            sendHelp(sender);
            return;
        }

        if (args.length == 2) {
            Media media = new Media(args[1]);
            int affected = 0;
            for (Player player : new VelocityPlayerSelector(args[0]).getPlayers((CommandSource) sender.getOriginal())) {
                ClientConnection clientConnection = OpenAudioMc.getService(NetworkingService.class).getClient(player.getUniqueId());
                if (clientConnection.isConnected()) affected++;
                clientConnection.sendMedia(media);
            }
            message(sender, "§aMedia created and requested to be played for " + affected + " clients");
            return;
        }

        if (args.length == 3) {
            try {
                MediaOptions mediaOptions = OpenAudioMc.getGson().fromJson(args[2], MediaOptions.class);

                OptionalError parsingError = mediaOptions.validate();
                if (parsingError.isError()) {
                    message(sender, "§cError! " + parsingError.getMessage());
                    return;
                }

                Media media = new Media(args[1]).applySettings(mediaOptions);
                for (Player player : new VelocityPlayerSelector(args[0]).getPlayers((CommandSource) sender.getOriginal())) {
                    ClientConnection clientConnection = OpenAudioMc.getService(NetworkingService.class).getClient(player.getUniqueId());
                    clientConnection.sendMedia(media);
                }
                message(sender, "§aMedia (with arguments) created and requested to be played.");
            } catch (Exception e) {
                message(sender, "§cError. Invalid options. Please refer to the command guide.");
            }
            return;
        }
        sendHelp(sender);
    }

    private void sendHelp(GenericExecutor genericExecutor) {
        OpenAudioMc.getService(CommandService.class).getSubCommand("help").onExecute(genericExecutor, new String[]{
                getCommand()
        });
    }
}
