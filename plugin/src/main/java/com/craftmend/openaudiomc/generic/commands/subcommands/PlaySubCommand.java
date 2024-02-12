package com.craftmend.openaudiomc.generic.commands.subcommands;

import com.craftmend.openaudiomc.OpenAudioMc;

import com.craftmend.openaudiomc.api.clients.Client;
import com.craftmend.openaudiomc.api.media.Media;
import com.craftmend.openaudiomc.generic.client.objects.ClientConnection;
import com.craftmend.openaudiomc.generic.commands.objects.CommandError;
import com.craftmend.openaudiomc.api.media.OptionalError;
import com.craftmend.openaudiomc.generic.media.tabcomplete.MediaTabcompleteProvider;
import com.craftmend.openaudiomc.generic.media.utils.Validation;
import com.craftmend.openaudiomc.generic.platform.OaColor;
import com.craftmend.openaudiomc.generic.user.User;
import com.craftmend.openaudiomc.generic.commands.interfaces.SubCommand;
import com.craftmend.openaudiomc.generic.commands.objects.Argument;
import com.craftmend.openaudiomc.api.media.MediaOptions;
import lombok.SneakyThrows;

import java.util.Optional;

public class PlaySubCommand extends SubCommand {

    public PlaySubCommand() {
        super("play", "p");
        registerArguments(
                new Argument("<selector> <source>",
                        "Plays a sound for all the players in a selection", 0)
                        .addTabCompleteProvider(1, MediaTabcompleteProvider.getInstance()),

                new Argument("<selector> <source> <options>",
                        "Plays a sound with configuration (like fade time, sync etc) for all players in a selection", 0)
                        .addTabCompleteProvider(1, MediaTabcompleteProvider.getInstance())
        );
    }

    @Override
    @SneakyThrows
    public void onExecute(User sender, String[] args) {
        if (args.length == 0) {
            sender.makeExecuteCommand("oa help " + getCommand());
            return;
        }

        if (args.length == 2) {
            if (Validation.isStringInvalid(args[1])) {
                throw new CommandError("Invalid source url.");
            }

            Media media = new Media(args[1]);
            int affected = 0;

            for (User<?> user : resolveSelector(sender, args[0])) {
                Optional<Client> client = user.findClient();
                if (client.isPresent()) {
                    if (client.get().isConnected()) affected++;
                    ClientConnection clientConnection = (ClientConnection) client.get();
                    clientConnection.sendMedia(media);
                }
            }
            message(sender, OaColor.GREEN + "Media created and requested to be played for " + affected + " clients");
            return;
        }

        if (args.length == 3) {
            try {
                MediaOptions mediaOptions = OpenAudioMc.getGson().fromJson(args[2], MediaOptions.class);

                OptionalError parsingError = mediaOptions.validate();
                if (parsingError.isError()) {
                    message(sender, OaColor.RED + "Error! " + parsingError.getMessage());
                    return;
                }

                if (Validation.isStringInvalid(args[1])) {
                    throw new CommandError("Invalid source url.");
                }

                Media media = new Media(args[1]).applySettings(mediaOptions);

                for (User<?> user : resolveSelector(sender, args[0])) {
                    Optional<Client> client = user.findClient();
                    if (client.isPresent()) {
                        if (client.get().isConnected()) {
                            ClientConnection clientConnection = (ClientConnection) client.get();
                            clientConnection.sendMedia(media);
                        }
                    }
                }

                message(sender, OaColor.GREEN + "Media (with arguments) created and requested to be played.");
            } catch (Exception e) {
                message(sender, "Error. Invalid options. Please refer to the command guide.");
            }
            return;
        }

        sender.makeExecuteCommand("oa help " + getCommand());
    }
}
