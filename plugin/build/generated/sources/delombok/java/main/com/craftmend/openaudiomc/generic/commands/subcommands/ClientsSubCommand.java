package com.craftmend.openaudiomc.generic.commands.subcommands;

import com.craftmend.openaudiomc.api.interfaces.Client;
import com.craftmend.openaudiomc.generic.commands.interfaces.SubCommand;
import com.craftmend.openaudiomc.generic.commands.objects.Argument;
import com.craftmend.openaudiomc.generic.networking.interfaces.NetworkingService;
import com.craftmend.openaudiomc.generic.platform.OaColor;
import com.craftmend.openaudiomc.generic.user.User;

public class ClientsSubCommand extends SubCommand {

    public ClientsSubCommand() {
        super("clients");
        registerArguments(
                new Argument("", "List all connected clients", 0)
        );
    }

    @Override
    public void onExecute(User sender, String[] args) {
        message(sender, "Connected clients:");
        int count = 0;
        for (Client client : getService(NetworkingService.class).getClients()) {
            if (client.isConnected()) {
                count++;
                String line = OaColor.AQUA + " - " + client.getUser().getName();
                // do they have voicechat?
                if (client.isMicrophoneActive()) {
                    line += OaColor.GRAY + " (Voicechat)";
                }

                // message them
                message(sender, line);
            }
        }

        if (count == 0) {
            message(sender, "No clients connected");
        }
    }
}
