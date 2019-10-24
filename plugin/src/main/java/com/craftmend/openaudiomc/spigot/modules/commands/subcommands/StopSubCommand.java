package com.craftmend.openaudiomc.spigot.modules.commands.subcommands;

import com.craftmend.openaudiomc.OpenAudioMc;
import com.craftmend.openaudiomc.generic.commands.interfaces.GenericExecutor;
import com.craftmend.openaudiomc.spigot.OpenAudioMcSpigot;
import com.craftmend.openaudiomc.generic.commands.interfaces.SubCommand;
import com.craftmend.openaudiomc.generic.commands.objects.Argument;
import com.craftmend.openaudiomc.generic.networking.packets.PacketClientDestroyMedia;
import com.craftmend.openaudiomc.spigot.modules.players.objects.SpigotConnection;
import com.craftmend.openaudiomc.spigot.modules.players.objects.SpigotPlayerSelector;
import org.bukkit.Bukkit;
import org.bukkit.command.CommandSender;
import org.bukkit.entity.Player;

public class StopSubCommand extends SubCommand {

    private OpenAudioMcSpigot openAudioMcSpigot;

    public StopSubCommand(OpenAudioMcSpigot openAudioMcSpigot) {
        super("stop");
        registerArguments(
                new Argument("<selector>",
                        "Stops all manual sounds for all players in a selection"),
                new Argument("<selector> <sound-ID>",
                        "Only stops one specified sound for all players in the selection with a selected ID")
        );
        this.openAudioMcSpigot = openAudioMcSpigot;
    }

    @Override
    public void onExecute(GenericExecutor sender, String[] args) {
        if (args.length == 0) {
            Bukkit.getServer().dispatchCommand((CommandSender) sender.getOriginal(), "oa help " + getCommand());
            return;
        }

        if (args.length == 1) {
            for (Player player : new SpigotPlayerSelector(args[0]).getPlayers((CommandSender) sender.getOriginal())) {
                SpigotConnection spigotConnection = openAudioMcSpigot.getPlayerModule().getClient(player);
                spigotConnection.getClientConnection().getOngoingMedia().clear();
                OpenAudioMc.getInstance().getNetworkingService().send(spigotConnection.getClientConnection(), new PacketClientDestroyMedia(null));
            }
            message(sender, "Destroyed all normal sounds for the clients in selection");
            return;
        }

        if (args.length == 2) {
            for (Player player : new SpigotPlayerSelector(args[0]).getPlayers((CommandSender) sender.getOriginal())) {
                SpigotConnection spigotConnection = openAudioMcSpigot.getPlayerModule().getClient(player);
                OpenAudioMc.getInstance().getNetworkingService().send(spigotConnection.getClientConnection(), new PacketClientDestroyMedia(args[1]));
            }
            message(sender, "Destroyed all sounds for the clients in selection with id " + args[1]);
            return;
        }

        Bukkit.getServer().dispatchCommand((CommandSender) sender.getOriginal(), "oa help " + getCommand());
    }
}
