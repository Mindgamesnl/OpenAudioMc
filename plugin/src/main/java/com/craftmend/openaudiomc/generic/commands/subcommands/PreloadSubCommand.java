package com.craftmend.openaudiomc.generic.commands.subcommands;

import com.craftmend.openaudiomc.api.interfaces.Client;
import com.craftmend.openaudiomc.generic.client.objects.ClientConnection;
import com.craftmend.openaudiomc.generic.commands.interfaces.SubCommand;
import com.craftmend.openaudiomc.generic.commands.objects.Argument;
import com.craftmend.openaudiomc.generic.networking.packets.client.media.PacketClientPreFetch;
import com.craftmend.openaudiomc.generic.networking.payloads.client.media.ClientPreFetchPayload;
import com.craftmend.openaudiomc.generic.platform.OaColor;
import com.craftmend.openaudiomc.generic.user.User;

import java.util.Optional;

public class PreloadSubCommand extends SubCommand {

    public PreloadSubCommand() {
        super("preload");
        registerArguments(
                new Argument("<selector> <source>", "Attempt to preload a sound for all players in a selection")
        );
    }

    @Override
    public void onExecute(User sender, String[] args) {
        if (args.length == 0) {
            sender.makeExecuteCommand("oa help " + getCommand());
            return;
        }

        if (args.length == 2) {
            int affected = 0;

            ClientPreFetchPayload payload = new ClientPreFetchPayload(args[1], "command", false);

            for (User<?> user : resolveSelector(sender, args[0])) {
                Optional<Client> client = user.findClient();
                if (client.isPresent()) {
                    if (client.get().isConnected()) affected++;
                    ClientConnection clientConnection = (ClientConnection) client.get();
                    clientConnection.sendPacket(new PacketClientPreFetch(payload));
                }
            }
            message(sender, OaColor.GREEN + "Requested " + affected + " web-clients to preload the sound");
            return;
        }
    }
}
