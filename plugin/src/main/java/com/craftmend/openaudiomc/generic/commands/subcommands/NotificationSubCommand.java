package com.craftmend.openaudiomc.generic.commands.subcommands;

import com.craftmend.openaudiomc.OpenAudioMc;
import com.craftmend.openaudiomc.bungee.modules.player.objects.BungeePlayerSelector;
import com.craftmend.openaudiomc.generic.commands.CommandModule;
import com.craftmend.openaudiomc.generic.commands.interfaces.GenericExecutor;
import com.craftmend.openaudiomc.generic.commands.interfaces.SubCommand;
import com.craftmend.openaudiomc.generic.commands.objects.Argument;
import com.craftmend.openaudiomc.generic.networking.client.objects.ClientConnection;
import com.craftmend.openaudiomc.generic.networking.client.objects.Notification;
import com.craftmend.openaudiomc.generic.platform.Platform;
import com.craftmend.openaudiomc.spigot.modules.players.objects.SpigotPlayerSelector;
import net.md_5.bungee.api.connection.ProxiedPlayer;
import org.bukkit.command.CommandSender;
import org.bukkit.entity.Player;

import java.util.ArrayList;
import java.util.List;

public class NotificationSubCommand extends SubCommand {

    private CommandModule commandModule;

    public NotificationSubCommand(CommandModule commandModule) {
        super("notification");
        registerArguments(
                new Argument("<selector> <message>",
                        "Push a notification to a group of players")
        );
        this.commandModule = commandModule;
    }

    @Override
    public void onExecute(GenericExecutor sender, String[] args) {
        if (args.length == 0) {
            sendHelp(sender);
            return;
        }

        if (args.length >= 2) {
            // collect the ClientConnection bullcrap mistery
            String[] subArgs = new String[args.length - 1];
            System.arraycopy(args, 1, subArgs, 0, args.length - 1);

            List<ClientConnection> players = new ArrayList<>();
            // handle differently based on if im bungee or spigot
            if (OpenAudioMc.getInstance().getPlatform() == Platform.SPIGOT) {
                List<Player> spigotPlayers = new SpigotPlayerSelector(args[0]).getPlayers((CommandSender) sender.getOriginal());
                for (Player spigotPlayer : spigotPlayers) {
                    players.add(OpenAudioMc.getInstance().getNetworkingService().getClient(spigotPlayer.getUniqueId()));
                }
            } else {
                List<ProxiedPlayer> proxiedPlayers = new BungeePlayerSelector(args[0]).getPlayers((net.md_5.bungee.api.CommandSender) sender.getOriginal());
                for (ProxiedPlayer proxiedPlayer : proxiedPlayers) {
                    players.add(OpenAudioMc.getInstance().getNetworkingService().getClient(proxiedPlayer.getUniqueId()));
                }
            }

            StringBuilder message = new StringBuilder();
            for (String subArg : subArgs) {
                message.append(subArg).append(" ");
            }

            // send packet to everyone
            Notification notification = new Notification()
                    .setTitle("Server Message")
                    .setMessage(message.toString());
            players.forEach(notification::send);

            sender.sendMessage(commandModule.getCommandPrefix() + "Message send");
        }
    }

    private void sendHelp(GenericExecutor genericExecutor) {
        OpenAudioMc.getInstance().getCommandModule().getSubCommand("help").onExecute(genericExecutor, new String[]{
                getCommand()
        });
    }
}
