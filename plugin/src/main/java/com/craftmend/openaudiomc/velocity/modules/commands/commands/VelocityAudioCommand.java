package com.craftmend.openaudiomc.velocity.modules.commands.commands;

import com.craftmend.openaudiomc.OpenAudioMc;
import com.craftmend.openaudiomc.generic.commands.CommandService;
import com.craftmend.openaudiomc.generic.commands.helpers.CommandMiddewareExecutor;
import com.craftmend.openaudiomc.generic.commands.interfaces.CommandMiddleware;
import com.craftmend.openaudiomc.generic.commands.interfaces.GenericExecutor;
import com.craftmend.openaudiomc.generic.commands.middleware.CatchCrashMiddleware;
import com.craftmend.openaudiomc.generic.commands.middleware.CatchLegalBindingMiddleware;
import com.craftmend.openaudiomc.generic.commands.middleware.CleanStateCheckMiddleware;
import com.craftmend.openaudiomc.generic.networking.interfaces.NetworkingService;
import com.craftmend.openaudiomc.velocity.generic.commands.adapters.VelocityCommandSenderAdapter;
import com.craftmend.openaudiomc.velocity.modules.player.objects.VelocityPlayerSelector;
import com.velocitypowered.api.command.CommandSource;
import com.velocitypowered.api.command.SimpleCommand;
import com.velocitypowered.api.proxy.Player;

public class VelocityAudioCommand implements SimpleCommand {

    private final CommandMiddleware[] commandMiddleware = new CommandMiddleware[]{
            new CatchLegalBindingMiddleware(),
            new CatchCrashMiddleware(),
            new CleanStateCheckMiddleware()
    };

    @Override
    public void execute(Invocation invocation) {
        CommandSource source = invocation.source();
        GenericExecutor sender = new VelocityCommandSenderAdapter(source);
        if (CommandMiddewareExecutor.shouldBeCanceled(sender, null, commandMiddleware)) return;

        if (source instanceof Player) {
            Player player = (Player) source;
            OpenAudioMc.getService(NetworkingService.class).getClient(player.getUniqueId()).publishUrl();
        } else {
            String[] args = invocation.arguments();

            if (args.length == 0) {
                sender.sendMessage(OpenAudioMc.getService(CommandService.class).getCommandPrefix() + "You must provide a player name OR selector to send trigger the URL");
                return;
            }

            for (Player player : new VelocityPlayerSelector(args[0]).getPlayers(source)) {
                OpenAudioMc.getService(NetworkingService.class).getClient(player.getUniqueId()).publishUrl();
            }
        }
    }
}
