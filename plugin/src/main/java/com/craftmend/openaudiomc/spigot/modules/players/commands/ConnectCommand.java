package com.craftmend.openaudiomc.spigot.modules.players.commands;

import com.craftmend.openaudiomc.OpenAudioMc;
import com.craftmend.openaudiomc.generic.commands.adapters.SpigotCommandSenderAdapter;
import com.craftmend.openaudiomc.generic.commands.helpers.CommandMiddewareExecutor;
import com.craftmend.openaudiomc.generic.commands.interfaces.CommandMiddleware;
import com.craftmend.openaudiomc.generic.commands.middleware.CatchCrashMiddleware;
import com.craftmend.openaudiomc.generic.commands.middleware.CatchLegalBindingMiddleware;
import com.craftmend.openaudiomc.generic.commands.middleware.CleanStateCheckMiddleware;
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
public class ConnectCommand implements CommandExecutor {

    private CommandMiddleware[] commandMiddleware = new CommandMiddleware[] {
            new CatchLegalBindingMiddleware(),
            new CatchCrashMiddleware(),
            new CleanStateCheckMiddleware()
    };

    @Override
    public boolean onCommand(CommandSender commandSender, Command command, String s, String[] args) {
        State state = OpenAudioMc.getInstance().getStateService().getCurrentState();
        if (state instanceof WorkerState) {
            commandSender.sendMessage(OpenAudioMc.getInstance().getCommandModule().getCommandPrefix() +
                    state.getDescription());
            return true;
        }

        if (CommandMiddewareExecutor.shouldBeCanceled(new SpigotCommandSenderAdapter(commandSender), null, commandMiddleware)) return true;

        if (commandSender instanceof Player) {
            Player sender = (Player) commandSender;
            OpenAudioMc.getInstance().getNetworkingService().getClient(sender.getUniqueId()).publishUrl();
        } else {
            if (args.length == 0) {
                commandSender.sendMessage(OpenAudioMc.getInstance().getCommandModule().getCommandPrefix() + ChatColor.RED + "You must provide a player name OR selector to send trigger the URL");
                return true;
            }

            for (Player player : new SpigotPlayerSelector(args[0]).getPlayers(commandSender)) {
                OpenAudioMc.getInstance().getNetworkingService().getClient(player.getUniqueId()).publishUrl();
            }
        }
        return true;
    }
}
