package com.craftmend.openaudiomc.bungee.modules.commands.commands;

import com.craftmend.openaudiomc.OpenAudioMc;
import com.craftmend.openaudiomc.bungee.modules.player.objects.BungeePlayerSelector;

import com.craftmend.openaudiomc.generic.client.TitleSessionService;
import com.craftmend.openaudiomc.generic.commands.helpers.CommandMiddewareExecutor;
import com.craftmend.openaudiomc.generic.commands.interfaces.CommandMiddleware;
import com.craftmend.openaudiomc.generic.commands.middleware.CatchCrashMiddleware;
import com.craftmend.openaudiomc.generic.commands.middleware.CatchLegalBindingMiddleware;
import com.craftmend.openaudiomc.generic.commands.middleware.CleanStateCheckMiddleware;
import com.craftmend.openaudiomc.generic.environment.MagicValue;
import com.craftmend.openaudiomc.generic.networking.interfaces.NetworkingService;
import com.craftmend.openaudiomc.generic.proxy.interfaces.UserHooks;
import com.craftmend.openaudiomc.generic.user.User;
import com.craftmend.openaudiomc.generic.user.adapters.BungeeUserAdapter;
import com.craftmend.openaudiomc.generic.utils.system.CommonArgUtil;
import net.md_5.bungee.api.CommandSender;
import net.md_5.bungee.api.connection.ProxiedPlayer;
import net.md_5.bungee.api.plugin.Command;
import org.bukkit.ChatColor;

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
        super("audio", null, "sound", "connect", "media", "muziek", "geluid", "voice", "vc", "voicechat");
    }

    @Override
    public void execute(CommandSender sender, String[] args) {
        if (CommandMiddewareExecutor.shouldBeCanceled(new BungeeUserAdapter(sender), null, commandMiddleware)) return;

        if (sender instanceof ProxiedPlayer) {
            ProxiedPlayer player = (ProxiedPlayer) sender;

            if (CommonArgUtil.asTitle(args)) {
                User user = OpenAudioMc.resolveDependency(UserHooks.class).byUuid(player.getUniqueId());

                if (user == null) {
                    player.sendMessage(MagicValue.COMMAND_PREFIX.get(String.class) + ChatColor.RED + "You must be logged in to use this command");
                    return;
                }

                OpenAudioMc.getService(TitleSessionService.class).startTokenDisplay(user);
                return;
            }

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
