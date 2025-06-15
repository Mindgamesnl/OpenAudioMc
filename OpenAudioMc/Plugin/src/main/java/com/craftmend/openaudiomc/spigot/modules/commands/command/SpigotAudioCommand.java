package com.craftmend.openaudiomc.spigot.modules.commands.command;

import com.craftmend.openaudiomc.OpenAudioMc;
import com.craftmend.openaudiomc.api.EventApi;
import com.craftmend.openaudiomc.api.clients.Client;
import com.craftmend.openaudiomc.generic.client.objects.ClientConnection;
import com.craftmend.openaudiomc.generic.commands.helpers.CommandMiddewareExecutor;
import com.craftmend.openaudiomc.generic.commands.helpers.PromptProxyError;
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
import com.craftmend.openaudiomc.spigot.modules.users.adapters.SpigotUserAdapter;
import com.craftmend.openaudiomc.spigot.modules.events.SpigotAudioCommandEvent;
import com.craftmend.openaudiomc.spigot.modules.players.objects.SpigotPlayerSelector;

import lombok.NoArgsConstructor;
import org.bukkit.ChatColor;
import org.bukkit.command.Command;
import org.bukkit.command.CommandExecutor;
import org.bukkit.command.CommandSender;
import org.bukkit.entity.Player;

import java.util.Optional;


@NoArgsConstructor
public class SpigotAudioCommand implements CommandExecutor {

    private final CommandMiddleware[] commandMiddleware = new CommandMiddleware[]{
            new CatchLegalBindingMiddleware(),
            new CatchCrashMiddleware(),
            new CleanStateCheckMiddleware()
    };

    @Override
    public boolean onCommand(CommandSender commandSender, Command command, String s, String[] args) {
        SpigotAudioCommandEvent event = (SpigotAudioCommandEvent) EventApi.getInstance().callEvent(new SpigotAudioCommandEvent(commandSender, args));
        if (event.isCancelled()) {
            return true;
        }

        User<CommandSender> sua = new SpigotUserAdapter(commandSender);

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
                PromptProxyError.sendTo(sua);
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

            SpigotPlayerSelector selector = new SpigotPlayerSelector();
            selector.setSender(sua);
            selector.setString(args[0]);

            for (User<CommandSender> result : selector.getResults()) {
                Optional<Client> client = result.findClient();
                client.ifPresent(value -> ((ClientConnection) value).getAuth().publishSessionUrl());
            }
        }
        return true;
    }
}
