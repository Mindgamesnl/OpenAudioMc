package com.craftmend.openaudiomc.generic.commands.subcommands;

import com.craftmend.openaudiomc.OpenAudioMc;
import com.craftmend.openaudiomc.bungee.modules.player.objects.BungeePlayerSelector;
import com.craftmend.openaudiomc.generic.commands.CommandModule;
import com.craftmend.openaudiomc.generic.commands.interfaces.GenericExecutor;
import com.craftmend.openaudiomc.generic.commands.interfaces.SubCommand;
import com.craftmend.openaudiomc.generic.commands.objects.Argument;
import com.craftmend.openaudiomc.generic.networking.client.objects.player.ClientConnection;
import com.craftmend.openaudiomc.generic.platform.Platform;
import com.craftmend.openaudiomc.generic.voice.exception.InvalidCallParameterException;
import com.craftmend.openaudiomc.generic.voice.exception.RequestPendingException;
import com.craftmend.openaudiomc.spigot.modules.players.objects.SpigotPlayerSelector;
import net.md_5.bungee.api.connection.ProxiedPlayer;
import org.bukkit.command.CommandSender;
import org.bukkit.entity.Player;

import java.util.ArrayList;
import java.util.List;

public class CallSubCommand extends SubCommand {

    private CommandModule commandModule;

    public CallSubCommand(CommandModule commandModule) {
        super("call");
        registerArguments(
                new Argument("create player1 player2 player3..",
                        "Create a group call with a group of players"),
                new Argument("create <selector>",
                        "Create a group call with a group of players")
        );
        this.commandModule = commandModule;
    }

    @Override
    public void onExecute(GenericExecutor sender, String[] args) {
        if (args.length == 0) {
            sendHelp(sender);
            return;
        }

        if (OpenAudioMc.getInstance().getVoiceRoomManager().getMaxRoomSize() == -1) {
            sender.sendMessage(getColor("RED") + "Voice call's are only for partnered servers. Please see https://blog.openaudiomc.net/voice-and-partners for more information.");
            return;
        }

        if (args[0].equalsIgnoreCase("create") && args.length >= 2) {
            // collect the ClientConnection bullcrap mistery
            String[] subArgs = new String[args.length - 1];
            System.arraycopy(args, 1, subArgs, 0, args.length - 1);
            List<ClientConnection> players = new ArrayList<>();
            for (String subArg : subArgs) {
                // handle differently based on if im bungee or spigot
                if (OpenAudioMc.getInstance().getPlatform() == Platform.SPIGOT) {
                    List<Player> spigotPlayers = new SpigotPlayerSelector(subArg).getPlayers((CommandSender) sender.getOriginal());
                    for (Player spigotPlayer : spigotPlayers) {
                        players.add(OpenAudioMc.getInstance().getNetworkingService().getClient(spigotPlayer.getUniqueId()));
                    }
                } else {
                    List<ProxiedPlayer> proxiedPlayers = new BungeePlayerSelector(subArg).getPlayers((net.md_5.bungee.api.CommandSender) sender.getOriginal());
                    for (ProxiedPlayer proxiedPlayer : proxiedPlayers) {
                        players.add(OpenAudioMc.getInstance().getNetworkingService().getClient(proxiedPlayer.getUniqueId()));
                    }
                }
            }

            // now that we have that bullshit figured out, let's create the call! becasue FUCK we've been waiting for that
            try {
                OpenAudioMc.getInstance().getVoiceRoomManager().createCall(players);
                sender.sendMessage(commandModule.getCommandPrefix() + "Request send to create a room. The clients will receive a invite in a short while.");
            } catch (InvalidCallParameterException | RequestPendingException e) {
                sender.sendMessage(commandModule.getCommandPrefix() + "Failed to create room! error: " + e.getMessage());
            }
            return;
        }
    }

    private void sendHelp(GenericExecutor genericExecutor) {
        OpenAudioMc.getInstance().getCommandModule().getSubCommand("help").onExecute(genericExecutor, new String[] {
                getCommand()
        });
    }
}
