package com.craftmend.openaudiomc.velocity.modules.commands.commands;

import com.craftmend.openaudiomc.OpenAudioMc;
import com.craftmend.openaudiomc.api.clients.Client;
import com.craftmend.openaudiomc.generic.client.objects.ClientConnection;
import com.craftmend.openaudiomc.generic.commands.helpers.CommandMiddewareExecutor;
import com.craftmend.openaudiomc.generic.commands.interfaces.CommandMiddleware;

import com.craftmend.openaudiomc.generic.commands.middleware.CatchCrashMiddleware;
import com.craftmend.openaudiomc.generic.commands.middleware.CatchLegalBindingMiddleware;
import com.craftmend.openaudiomc.generic.commands.middleware.CleanStateCheckMiddleware;
import com.craftmend.openaudiomc.generic.environment.MagicValue;
import com.craftmend.openaudiomc.generic.networking.interfaces.NetworkingService;
import com.craftmend.openaudiomc.generic.user.User;
import com.craftmend.openaudiomc.generic.user.adapters.VelocityUserAdapter;
import com.craftmend.openaudiomc.velocity.modules.player.objects.VelocityPlayerSelector;
import com.velocitypowered.api.command.CommandSource;
import com.velocitypowered.api.command.SimpleCommand;
import com.velocitypowered.api.proxy.Player;

import java.util.Optional;

public class VelocityAudioCommand implements SimpleCommand {

    private final CommandMiddleware[] commandMiddleware = new CommandMiddleware[]{
            new CatchLegalBindingMiddleware(),
            new CatchCrashMiddleware(),
            new CleanStateCheckMiddleware()
    };

    @Override
    public void execute(Invocation invocation) {
        CommandSource source = invocation.source();
        User<CommandSource> user = new VelocityUserAdapter(source);
        if (CommandMiddewareExecutor.shouldBeCanceled(user, null, commandMiddleware)) return;

        if (source instanceof Player) {
            Player player = (Player) source;

            // do we have an argument called "token",  "bedrock" or "key"?
            if (invocation.arguments().length == 1) {
                OpenAudioMc.getService(NetworkingService.class).getClient(user.getUniqueId()).getAuth().activateToken(
                        user,
                        invocation.arguments()[0]
                );
                return;
            }

            OpenAudioMc.getService(NetworkingService.class).getClient(player.getUniqueId()).getAuth().publishSessionUrl();
        } else {
            String[] args = invocation.arguments();

            if (args.length == 0) {
                user.sendMessage(MagicValue.COMMAND_PREFIX.get(String.class) + "You must provide a player name OR selector to send trigger the URL");
                return;
            }

            VelocityPlayerSelector velocityPlayerSelector = new VelocityPlayerSelector();
            velocityPlayerSelector.setSender(user);
            velocityPlayerSelector.setString(args[0]);

            for (User<CommandSource> result : velocityPlayerSelector.getResults()) {
                Optional<Client> client = result.findClient ();
                client.ifPresent(value -> ((ClientConnection) value).getAuth().publishSessionUrl());
            }
        }
    }
}
