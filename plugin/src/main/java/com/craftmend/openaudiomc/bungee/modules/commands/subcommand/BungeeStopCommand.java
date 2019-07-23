package com.craftmend.openaudiomc.bungee.modules.commands.subcommand;

import com.craftmend.openaudiomc.OpenAudioMcCore;
import com.craftmend.openaudiomc.bungee.modules.player.objects.BungeePlayerSelector;
import com.craftmend.openaudiomc.generic.commands.interfaces.GenericExecutor;
import com.craftmend.openaudiomc.generic.commands.interfaces.SubCommand;
import com.craftmend.openaudiomc.generic.commands.objects.Argument;
import com.craftmend.openaudiomc.generic.networking.client.objects.ClientConnection;
import com.craftmend.openaudiomc.generic.networking.packets.PacketClientDestroyMedia;

import net.md_5.bungee.api.CommandSender;
import net.md_5.bungee.api.connection.ProxiedPlayer;

public class BungeeStopCommand extends SubCommand {

    private OpenAudioMcCore openAudioMcCore;

    public BungeeStopCommand(OpenAudioMcCore openAudioMcCore) {
        super("stop");
        registerArguments(
                new Argument("<selector>",
                        "Stops all manual sounds for all players in a selection"),
                new Argument("<selector> <sound-ID>",
                        "Only stops one specified sound for all players in the selection with a selected ID")
        );
        this.openAudioMcCore = openAudioMcCore;
    }

    @Override
    public void onExecute(GenericExecutor sender, String[] args) {
        if (args.length == 0) {
            sendHelp(sender);
            return;
        }

        if (args.length == 1) {
            for (ProxiedPlayer player : new BungeePlayerSelector(args[0]).getPlayers((CommandSender) sender.getOriginal())) {
                ClientConnection clientConnection = openAudioMcCore.getNetworkingService().getClient(player.getUniqueId());
                OpenAudioMcCore.getInstance().getNetworkingService().send(clientConnection, new PacketClientDestroyMedia(null));
            }
            message(sender, "Destroyed all normal sounds for the clients in selection");
            return;
        }

        if (args.length == 2) {
            for (ProxiedPlayer player : new BungeePlayerSelector(args[0]).getPlayers((CommandSender) sender.getOriginal())) {
                ClientConnection clientConnection = openAudioMcCore.getNetworkingService().getClient(player.getUniqueId());
                OpenAudioMcCore.getInstance().getNetworkingService().send(clientConnection, new PacketClientDestroyMedia(args[1]));
            }
            message(sender, "Destroyed all sounds for the clients in selection with id " + args[1]);
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