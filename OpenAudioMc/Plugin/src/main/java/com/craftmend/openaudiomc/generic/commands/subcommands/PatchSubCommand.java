package com.craftmend.openaudiomc.generic.commands.subcommands;

import com.craftmend.openaudiomc.OpenAudioMc;
import com.craftmend.openaudiomc.api.MediaApi;
import com.craftmend.openaudiomc.api.clients.Client;
import com.craftmend.openaudiomc.api.media.Media;
import com.craftmend.openaudiomc.api.media.MediaOptions;
import com.craftmend.openaudiomc.api.media.MediaPatchOptions;
import com.craftmend.openaudiomc.api.media.OptionalError;
import com.craftmend.openaudiomc.api.user.User;
import com.craftmend.openaudiomc.generic.client.objects.ClientConnection;
import com.craftmend.openaudiomc.generic.commands.interfaces.SubCommand;
import com.craftmend.openaudiomc.generic.commands.objects.Argument;
import com.craftmend.openaudiomc.generic.commands.objects.CommandError;
import com.craftmend.openaudiomc.generic.media.tabcomplete.MediaTabcompleteProvider;
import com.craftmend.openaudiomc.generic.media.utils.Validation;
import com.craftmend.openaudiomc.generic.platform.OaColor;
import lombok.SneakyThrows;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

public class PatchSubCommand extends SubCommand {

    public PatchSubCommand() {
        super("patch", "update");
        registerArguments(
                new Argument("<selector> <id> <options>",
                        "Target all players in a selector, and update their media with a given id", 0),

                new Argument("<selector> <source> <options>",
                        "Plays a sound with configuration (like fade time, sync etc) for all players in a selection", 0)
        );
    }

    @Override
    @SneakyThrows
    public void onExecute(User sender, String[] args) {
        if (args.length == 0) {
            sender.makeExecuteCommand("oa help " + getCommand());
            return;
        }

        List<Client> clients = new ArrayList<>();
        MediaPatchOptions patchOptions = OpenAudioMc.getGson().fromJson(args[2], MediaPatchOptions.class);


        for (User<?> user : resolveSelector(sender, args[0])) {
            Optional<Client> client = user.findClient();
            if (client.isPresent()) {
                if (client.get().isConnected()) {
                    clients.add(client.get());
                }
            }
        }

        MediaApi.getInstance().pathMedia(args[1], patchOptions, clients.toArray(new Client[0]));
        message(sender, OaColor.GREEN + "Patched media for " + clients.size() + " clients");
    }
}
