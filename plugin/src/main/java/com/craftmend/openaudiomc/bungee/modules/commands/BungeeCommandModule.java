package com.craftmend.openaudiomc.bungee.modules.commands;

import com.craftmend.openaudiomc.OpenAudioMc;
import com.craftmend.openaudiomc.bungee.OpenAudioMcBungee;
import com.craftmend.openaudiomc.bungee.modules.commands.commands.BungeeAudioCommand;
import com.craftmend.openaudiomc.bungee.modules.commands.commands.BungeeVolumeCommand;
import com.craftmend.openaudiomc.bungee.modules.commands.commands.OpenAudioMcBungeeCommand;
import com.craftmend.openaudiomc.bungee.modules.commands.subcommand.*;
import com.craftmend.openaudiomc.generic.commands.CommandService;
import com.craftmend.openaudiomc.generic.commands.enums.CommandContext;
import com.craftmend.openaudiomc.generic.commands.subcommands.AcceptSubCommand;
import com.craftmend.openaudiomc.generic.commands.subcommands.HelpSubCommand;
import com.craftmend.openaudiomc.generic.proxy.interfaces.UserHooks;
import com.craftmend.openaudiomc.generic.service.Inject;
import com.craftmend.openaudiomc.generic.service.Service;
import com.craftmend.openaudiomc.generic.storage.enums.StorageKey;
import com.craftmend.openaudiomc.generic.user.User;
import com.craftmend.openaudiomc.generic.user.adapters.BungeeUserAdapter;
import lombok.NoArgsConstructor;
import net.md_5.bungee.api.CommandSender;
import net.md_5.bungee.api.connection.ProxiedPlayer;
import net.md_5.bungee.api.event.TabCompleteEvent;
import net.md_5.bungee.api.plugin.Listener;
import net.md_5.bungee.event.EventHandler;

import java.util.Arrays;
import java.util.List;

@NoArgsConstructor
public class BungeeCommandModule extends Service implements Listener {

    @Inject
    private OpenAudioMcBungee openAudioMcBungee;

    @Inject
    private CommandService commandService;

    private final OpenAudioMcBungeeCommand openAudioMcBungeeCommand = new OpenAudioMcBungeeCommand();

    @Override
    public void onEnable() {
        openAudioMcBungee.getProxy().getPluginManager().registerCommand(openAudioMcBungee, openAudioMcBungeeCommand);

        openAudioMcBungee.getProxy().getPluginManager().registerListener(openAudioMcBungee, this);

                openAudioMcBungee.getProxy().getPluginManager().registerCommand(openAudioMcBungee, new BungeeVolumeCommand());
        openAudioMcBungee.getProxy().getPluginManager().registerCommand(openAudioMcBungee, new BungeeAudioCommand());

        commandService.registerSubCommands(
                CommandContext.OPENAUDIOMC,
                new BungeeRegionCommand(),
                new BungeeSpeakerCommand(),
                new BungeeShowCommand(),
                new BungeeAliasCommand(),
                new BungeeVoiceCommand(),
                new BungeePlaylistCommand()
        );
    }

    @EventHandler
    public void onTabComplete(TabCompleteEvent event) {
        // is this a player?
        if (!(event.getSender() instanceof ProxiedPlayer)) return;
        User<?> user = new BungeeUserAdapter((CommandSender) event.getSender());

        String message = event.getCursor();
        if (message.startsWith("/")) message = message.substring(1);

        // is ti an openaudiomc command?
        String[] parts = message.split(" ");

        // did it end with a space? then we should add an empty string to the array
        if (message.endsWith(" ")) {
            String[] newParts = new String[parts.length + 1];
            System.arraycopy(parts, 0, newParts, 0, parts.length);
            newParts[parts.length] = "";
            parts = newParts;
        }

        if (parts.length == 0) return;
        boolean isOa = false;
        for (String alias : openAudioMcBungeeCommand.getAliases()) {
            if (parts[0].equalsIgnoreCase(alias)) {
                isOa = true;
                break;
            }
        }
        if (openAudioMcBungeeCommand.getName().equalsIgnoreCase(parts[0])) isOa = true;
        if (!isOa) return;

        // use arraycopy to remove the first element and shrink the array
        String[] args = new String[parts.length - 1];
        System.arraycopy(parts, 1, args, 0, args.length);

        event.getSuggestions().addAll(commandService.getTabCompletions(CommandContext.OPENAUDIOMC, args, user));
    }
}
