package com.craftmend.openaudiomc.spigot.modules.commands.subcommands;

import com.craftmend.openaudiomc.OpenAudioMc;

import com.craftmend.openaudiomc.generic.networking.interfaces.NetworkingService;
import com.craftmend.openaudiomc.generic.user.User;
import com.craftmend.openaudiomc.spigot.OpenAudioMcSpigot;
import com.craftmend.openaudiomc.generic.commands.interfaces.SubCommand;
import com.craftmend.openaudiomc.generic.commands.objects.Argument;
import com.craftmend.openaudiomc.generic.networking.packets.client.media.PacketClientDestroyMedia;
import com.craftmend.openaudiomc.spigot.modules.players.SpigotPlayerService;
import com.craftmend.openaudiomc.spigot.modules.players.objects.SpigotConnection;
import com.craftmend.openaudiomc.spigot.modules.players.objects.SpigotPlayerSelector;
import org.bukkit.ChatColor;
import org.bukkit.command.CommandSender;
import org.bukkit.entity.Player;

public class StopSubCommand extends SubCommand {

    private final OpenAudioMcSpigot openAudioMcSpigot;

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
    public void onExecute(User sender, String[] args) {
        if (args.length == 0) {
            sender.makeExecuteCommand("oa help " + getCommand());
            return;
        }

        if (args.length == 1) {
            int affected = 0;
            for (Player player : new SpigotPlayerSelector(args[0]).getPlayers((CommandSender) sender.getOriginal())) {
                SpigotConnection spigotConnection = OpenAudioMc.getService(SpigotPlayerService.class).getClient(player);
                if (spigotConnection.getClientConnection().isConnected()) affected++;
                spigotConnection.getClientConnection().getSession().getOngoingMedia().clear();
                OpenAudioMc.getService(NetworkingService.class).send(spigotConnection.getClientConnection(), new PacketClientDestroyMedia(null));
            }
            message(sender, ChatColor.GREEN + "Destroyed all normal sounds for " + affected + " clients");
            return;
        }

        if (args.length == 2) {
            int affected = 0;
            for (Player player : new SpigotPlayerSelector(args[0]).getPlayers((CommandSender) sender.getOriginal())) {
                SpigotConnection spigotConnection = OpenAudioMc.getService(SpigotPlayerService.class).getClient(player);
                if (spigotConnection.getClientConnection().isConnected()) affected++;
                OpenAudioMc.getService(NetworkingService.class).send(spigotConnection.getClientConnection(), new PacketClientDestroyMedia(args[1]));
            }
            message(sender, net.md_5.bungee.api.ChatColor.GREEN + "Destroyed the sound" + args[1] + " for " + affected + " clients");
            return;
        }

        sender.makeExecuteCommand("oa help " + getCommand());
    }
}
