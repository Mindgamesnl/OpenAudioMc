package com.craftmend.openaudiomc.modules.commands.subcommands;

import com.craftmend.openaudiomc.OpenAudioMc;
import com.craftmend.openaudiomc.modules.commands.interfaces.SubCommand;
import com.craftmend.openaudiomc.modules.commands.objects.Argument;
import com.craftmend.openaudiomc.services.networking.packets.PacketClientDestroyMedia;
import com.craftmend.openaudiomc.modules.players.objects.Client;
import com.craftmend.openaudiomc.modules.players.objects.PlayerSelector;
import org.bukkit.Bukkit;
import org.bukkit.command.CommandSender;
import org.bukkit.entity.Player;

public class StopSubCommand extends SubCommand {

    private OpenAudioMc openAudioMc;

    public StopSubCommand(OpenAudioMc openAudioMc) {
        super("stop");
        registerArguments(
                new Argument("<selector>",
                        "Stops all manual sounds for all players in a selection",
                        0),
                new Argument("<selector> <sound-ID>",
                        "Only stops one specified sound for all players in the selection with a selected ID",
                        0)
        );
        this.openAudioMc = openAudioMc;
    }

    @Override
    public void onExecute(CommandSender sender, String[] args) {
        if (args.length == 0) {
            Bukkit.getServer().dispatchCommand(sender, "oa help " + getCommand());
            return;
        }

        if (args.length == 1) {
            for (Player player : new PlayerSelector(args[0]).getPlayers(sender)) {
                Client client = openAudioMc.getPlayerModule().getClient(player);
                openAudioMc.getNetworkingService().send(client, new PacketClientDestroyMedia(null));
            }
            message(sender, "Destroyed all normal sounds for the clients in selection");
            return;
        }

        if (args.length == 2) {
            for (Player player : new PlayerSelector(args[0]).getPlayers(sender)) {
                Client client = openAudioMc.getPlayerModule().getClient(player);
                openAudioMc.getNetworkingService().send(client, new PacketClientDestroyMedia(args[1]));
            }
            message(sender, "Destroyed all sounds for the clients in selection with id " + args[1]);
            return;
        }

        Bukkit.getServer().dispatchCommand(sender, "oa help " + getCommand());
    }
}
