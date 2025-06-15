package com.craftmend.openaudiomc.generic.commands.subcommands;

import com.craftmend.openaudiomc.OpenAudioMc;

import com.craftmend.openaudiomc.api.clients.Client;
import com.craftmend.openaudiomc.generic.client.objects.ClientConnection;
import com.craftmend.openaudiomc.generic.networking.interfaces.NetworkingService;
import com.craftmend.openaudiomc.generic.platform.OaColor;
import com.craftmend.openaudiomc.generic.user.User;
import com.craftmend.openaudiomc.generic.commands.interfaces.SubCommand;
import com.craftmend.openaudiomc.generic.commands.objects.Argument;
import com.craftmend.openaudiomc.generic.networking.packets.client.media.PacketClientDestroyMedia;

import java.util.Optional;


public class StopSubCommand extends SubCommand {

    public StopSubCommand() {
        super("stop");
        registerArguments(
                new Argument("<selector>",
                        "Stops all manual sounds for all players in a selection", 0),
                new Argument("<selector> <sound-ID>",
                        "Only stops one specified sound for all players in the selection with a selected ID", 0)
        );
    }

    @Override
    public void onExecute(User sender, String[] args) {
        if (args.length == 0) {
            sender.makeExecuteCommand("oa help " + getCommand());
            return;
        }

        if (args.length == 1) {
            int affected = 0;

            for (User<?> user : resolveSelector(sender, args[0])) {
                Optional<Client> client = user.findClient();
                if (client.isPresent()) {
                    if (client.get().isConnected()) affected++;
                    ClientConnection clientConnection = (ClientConnection) client.get();
                    clientConnection.getSession().getOngoingMedia().clear();
                    OpenAudioMc.getService(NetworkingService.class).send(clientConnection, new PacketClientDestroyMedia(null));
                }
            }

            message(sender, OaColor.GREEN + "Destroyed all normal sounds for " + affected + " clients");
            return;
        }

        if (args.length == 2) {
            int affected = 0;

            for (User<?> user : resolveSelector(sender, args[0])) {
                Optional<Client> client = user.findClient();
                if (client.isPresent()) {
                    if (client.get().isConnected()) affected++;
                    ClientConnection clientConnection = (ClientConnection) client.get();
                    OpenAudioMc.getService(NetworkingService.class).send(clientConnection, new PacketClientDestroyMedia(args[1]));
                }
            }

            message(sender, OaColor.GREEN + "Destroyed the sound" + args[1] + " for " + affected + " clients");
            return;
        }

        sender.makeExecuteCommand("oa help " + getCommand());
    }
}
