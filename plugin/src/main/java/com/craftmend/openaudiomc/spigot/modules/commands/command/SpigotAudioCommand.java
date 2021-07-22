package com.craftmend.openaudiomc.spigot.modules.commands.command;

import com.craftmend.openaudiomc.OpenAudioMc;
import com.craftmend.openaudiomc.generic.commands.CommandService;
import com.craftmend.openaudiomc.generic.commands.adapters.SpigotCommandSenderAdapter;
import com.craftmend.openaudiomc.generic.commands.helpers.CommandMiddewareExecutor;
import com.craftmend.openaudiomc.generic.commands.interfaces.CommandMiddleware;
import com.craftmend.openaudiomc.generic.commands.middleware.CatchCrashMiddleware;
import com.craftmend.openaudiomc.generic.commands.middleware.CatchLegalBindingMiddleware;
import com.craftmend.openaudiomc.generic.commands.middleware.CleanStateCheckMiddleware;
import com.craftmend.openaudiomc.generic.networking.client.objects.player.ClientConnection;
import com.craftmend.openaudiomc.generic.networking.interfaces.NetworkingService;
import com.craftmend.openaudiomc.generic.state.StateService;
import com.craftmend.openaudiomc.generic.state.interfaces.State;
import com.craftmend.openaudiomc.generic.state.states.WorkerState;
import com.craftmend.openaudiomc.spigot.modules.players.objects.SpigotPlayerSelector;
import lombok.NoArgsConstructor;
import org.bukkit.ChatColor;
import org.bukkit.command.Command;
import org.bukkit.command.CommandExecutor;
import org.bukkit.command.CommandSender;
import org.bukkit.entity.Player;

@NoArgsConstructor
public class SpigotAudioCommand implements CommandExecutor {

    private CommandMiddleware[] commandMiddleware = new CommandMiddleware[]{
            new CatchLegalBindingMiddleware(),
            new CatchCrashMiddleware(),
            new CleanStateCheckMiddleware()
    };

    @Override
    public boolean onCommand(CommandSender commandSender, Command command, String s, String[] args) {
        if (CommandMiddewareExecutor.shouldBeCanceled(new SpigotCommandSenderAdapter(commandSender), null, commandMiddleware))
            return true;

        State state = OpenAudioMc.getService(StateService.class).getCurrentState();
        if (state instanceof WorkerState) {

            // check if the player state is overwritten
            if (commandSender instanceof Player) {
                Player sender = (Player) commandSender;
                ClientConnection clientConnection = OpenAudioMc.getService(NetworkingService.class).getClient(sender.getUniqueId());
                if (clientConnection.getSession().isForced()) {
                    // the session got overwritten by the proxy, so we can safely adapt the static base64 token
                    clientConnection.publishUrl();
                    return true;
                }
            }

            // its on a sub-server without an activated proxy, so completely ignore it
            commandSender.sendMessage(OpenAudioMc.getService(CommandService.class).getCommandPrefix() +
                    state.getDescription());
            return true;
        }

        if (commandSender instanceof Player) {
            Player sender = (Player) commandSender;
            OpenAudioMc.getService(NetworkingService.class).getClient(sender.getUniqueId()).publishUrl();
        } else {
            if (args.length == 0) {
                commandSender.sendMessage(OpenAudioMc.getService(CommandService.class).getCommandPrefix() + ChatColor.RED + "You must provide a player name OR selector to send trigger the URL");
                return true;
            }

            for (Player player : new SpigotPlayerSelector(args[0]).getPlayers(commandSender)) {
                OpenAudioMc.getService(NetworkingService.class).getClient(player.getUniqueId()).publishUrl();
            }
        }
        return true;
    }
}
