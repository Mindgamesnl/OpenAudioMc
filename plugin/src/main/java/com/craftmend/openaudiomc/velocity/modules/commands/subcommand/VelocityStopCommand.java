package com.craftmend.openaudiomc.velocity.modules.commands.subcommand;

import com.craftmend.openaudiomc.OpenAudioMc;
import com.craftmend.openaudiomc.generic.commands.CommandService;

import com.craftmend.openaudiomc.generic.commands.interfaces.SubCommand;
import com.craftmend.openaudiomc.generic.commands.objects.Argument;
import com.craftmend.openaudiomc.generic.networking.client.objects.player.ClientConnection;
import com.craftmend.openaudiomc.generic.networking.interfaces.NetworkingService;
import com.craftmend.openaudiomc.generic.networking.packets.client.media.PacketClientDestroyMedia;
import com.craftmend.openaudiomc.generic.user.User;
import com.craftmend.openaudiomc.velocity.modules.player.objects.VelocityPlayerSelector;
import com.velocitypowered.api.command.CommandSource;
import com.velocitypowered.api.proxy.Player;

public class VelocityStopCommand extends SubCommand {

    public VelocityStopCommand(OpenAudioMc openAudioMc) {
        super("stop");
        registerArguments(
                new Argument("<selector>",
                        "Stops all manual sounds for all players in a selection"),
                new Argument("<selector> <sound-ID>",
                        "Only stops one specified sound for all players in the selection with a selected ID")
        );
    }

    @Override
    public void onExecute(User sender, String[] args) {
        if (args.length == 0) {
            sendHelp(sender);
            return;
        }

        if (args.length == 1) {
            int affected = 0;
            for (Player player : new VelocityPlayerSelector(args[0]).getPlayers((CommandSource) sender.getOriginal())) {
                ClientConnection clientConnection = OpenAudioMc.getService(NetworkingService.class).getClient(player.getUniqueId());
                if (clientConnection.isConnected()) affected++;
                clientConnection.getOngoingMedia().clear();
                OpenAudioMc.getService(NetworkingService.class).send(clientConnection, new PacketClientDestroyMedia(null));
            }
            message(sender, "§aDestroyed all normal sounds for " + affected + " clients");
            return;
        }

        if (args.length == 2) {
            int affected = 0;
            for (Player player : new VelocityPlayerSelector(args[0]).getPlayers((CommandSource) sender.getOriginal())) {
                ClientConnection clientConnection = OpenAudioMc.getService(NetworkingService.class).getClient(player.getUniqueId());
                if (clientConnection.isConnected()) affected++;
                OpenAudioMc.getService(NetworkingService.class).send(clientConnection, new PacketClientDestroyMedia(args[1]));
            }
            message(sender, "§aDestroyed the sound" + args[1] + " for " + affected + " clients");
            return;
        }

        sendHelp(sender);
    }

    private void sendHelp(User genericExecutor) {
        OpenAudioMc.getService(CommandService.class).getSubCommand("help").onExecute(genericExecutor, new String[]{
                getCommand()
        });
    }
}