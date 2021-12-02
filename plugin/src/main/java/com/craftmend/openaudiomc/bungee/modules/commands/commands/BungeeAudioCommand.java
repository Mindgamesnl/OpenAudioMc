package com.craftmend.openaudiomc.bungee.modules.commands.commands;

import com.craftmend.openaudiomc.OpenAudioMc;
import com.craftmend.openaudiomc.bungee.modules.player.objects.BungeePlayerSelector;

import com.craftmend.openaudiomc.generic.commands.helpers.CommandMiddewareExecutor;
import com.craftmend.openaudiomc.generic.commands.interfaces.CommandMiddleware;
import com.craftmend.openaudiomc.generic.commands.middleware.CatchCrashMiddleware;
import com.craftmend.openaudiomc.generic.commands.middleware.CatchLegalBindingMiddleware;
import com.craftmend.openaudiomc.generic.commands.middleware.CleanStateCheckMiddleware;
import com.craftmend.openaudiomc.generic.enviroment.MagicValue;
import com.craftmend.openaudiomc.generic.networking.interfaces.NetworkingService;
import com.craftmend.openaudiomc.generic.user.adapters.BungeeUserAdapter;
import net.md_5.bungee.api.CommandSender;
import net.md_5.bungee.api.connection.ProxiedPlayer;
import net.md_5.bungee.api.plugin.Command;

public class BungeeAudioCommand extends Command {

    /**
     * A set of middleware that to catch commands when the plugin isn't in a running state
     */
    private final CommandMiddleware[] commandMiddleware = new CommandMiddleware[] {
            new CatchLegalBindingMiddleware(),
            new CatchCrashMiddleware(),
            new CleanStateCheckMiddleware()
    };

    public BungeeAudioCommand() {
        super("audio", null, "sound", "connect", "muziek", "mcaudio", "mcconnect", "mconnect", "geluid", "voice", "voicechat", "media");
    }

    @Override
    public void execute(CommandSender sender, String[] args) {
        if (CommandMiddewareExecutor.shouldBeCanceled(new BungeeUserAdapter(sender), null, commandMiddleware)) return;

        if (sender instanceof ProxiedPlayer) {
            ProxiedPlayer player = (ProxiedPlayer) sender;
            OpenAudioMc.getService(NetworkingService.class).getClient(player.getUniqueId()).getAuth().publishSessionUrl();
        } else {
            if (args.length == 0) {
                sender.sendMessage(MagicValue.COMMAND_PREFIX.get(String.class) + "You must provide a player name OR selector to send trigger the URL");
                return;
            }

            for (ProxiedPlayer player : new BungeePlayerSelector(args[0]).getPlayers(sender)) {
                OpenAudioMc.getService(NetworkingService.class).getClient(player.getUniqueId()).getAuth().publishSessionUrl();
            }
        }
    }
}
