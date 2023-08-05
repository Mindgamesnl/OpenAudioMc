package com.craftmend.openaudiomc.spigot.modules.commands.command;

import com.craftmend.openaudiomc.OpenAudioMc;
import com.craftmend.openaudiomc.api.impl.event.events.SpigotAudioCommandEvent;
import com.craftmend.openaudiomc.api.interfaces.AudioApi;
import com.craftmend.openaudiomc.generic.commands.helpers.CommandMiddewareExecutor;
import com.craftmend.openaudiomc.generic.commands.interfaces.CommandMiddleware;
import com.craftmend.openaudiomc.generic.commands.middleware.CatchCrashMiddleware;
import com.craftmend.openaudiomc.generic.commands.middleware.CatchLegalBindingMiddleware;
import com.craftmend.openaudiomc.generic.commands.middleware.CleanStateCheckMiddleware;
import com.craftmend.openaudiomc.generic.environment.MagicValue;
import com.craftmend.openaudiomc.generic.networking.interfaces.NetworkingService;
import com.craftmend.openaudiomc.generic.node.packets.ClientRunAudioPacket;
import com.craftmend.openaudiomc.generic.platform.Platform;
import com.craftmend.openaudiomc.generic.proxy.interfaces.UserHooks;
import com.craftmend.openaudiomc.generic.state.StateService;
import com.craftmend.openaudiomc.generic.state.interfaces.State;
import com.craftmend.openaudiomc.generic.state.states.WorkerState;
import com.craftmend.openaudiomc.generic.user.User;
import com.craftmend.openaudiomc.spigot.modules.players.objects.SpigotPlayerSelector;
import lombok.NoArgsConstructor;
import org.bukkit.ChatColor;
import org.bukkit.command.Command;
import org.bukkit.command.CommandExecutor;
import org.bukkit.command.CommandSender;
import org.bukkit.entity.Player;


@NoArgsConstructor
public class SpigotAudioCommand implements CommandExecutor {

    private final CommandMiddleware[] commandMiddleware = new CommandMiddleware[]{
            new CatchLegalBindingMiddleware(),
            new CatchCrashMiddleware(),
            new CleanStateCheckMiddleware()
    };

    @Override
    public boolean onCommand(CommandSender commandSender, Command command, String s, String[] args) {
        SpigotAudioCommandEvent event = AudioApi.getInstance().getEventDriver().fire(new SpigotAudioCommandEvent(commandSender, args));
        if (event.isCanceled()) {
            return true;
        }



        User sua = OpenAudioMc.resolveDependency(UserHooks.class).fromCommandSender(commandSender);

        if (CommandMiddewareExecutor.shouldBeCanceled(sua, null, commandMiddleware))
            return true;

        State state = OpenAudioMc.getService(StateService.class).getCurrentState();

        if (state instanceof WorkerState) {
            // velocity work around
            if (commandSender instanceof Player && MagicValue.PARENT_PLATFORM.get(Platform.class) == Platform.VELOCITY) {
                UserHooks hooks = OpenAudioMc.resolveDependency(UserHooks.class);
                Player sender = (Player) commandSender;
                User user = hooks.byUuid(sender.getUniqueId());

                String enteredToken = null;
                if (args.length == 1) {
                    enteredToken = args[0];
                }

                OpenAudioMc.resolveDependency(UserHooks.class).sendPacket(user, new ClientRunAudioPacket(user.getUniqueId(), enteredToken));
            } else {
                // its on a sub-server without an activated proxy, so completely ignore it
                commandSender.sendMessage(MagicValue.COMMAND_PREFIX.get(String.class) +
                        state.getDescription());
            }
            return true;
        }

        if (commandSender instanceof Player) {
            // do we have an argument called "token",  "bedrock" or "key"?
            if (args.length == 1) {
                OpenAudioMc.getService(NetworkingService.class).getClient(sua.getUniqueId()).getAuth().activateToken(
                        sua,
                        args[0]
                );
                return true;
            }

            Player sender = (Player) commandSender;
            OpenAudioMc.getService(NetworkingService.class).getClient(sender.getUniqueId()).getAuth().publishSessionUrl();
        } else {
            if (args.length == 0) {
                commandSender.sendMessage(MagicValue.COMMAND_PREFIX.get(String.class) + ChatColor.RED + "You must provide a player name OR selector to send trigger the URL");
                return true;
            }

            for (Player player : new SpigotPlayerSelector(args[0]).getPlayers(commandSender)) {
                OpenAudioMc.getService(NetworkingService.class).getClient(player.getUniqueId()).getAuth().publishSessionUrl();
            }
        }
        return true;
    }
}
