package com.craftmend.openaudiomc.spigot.modules.commands.middleware;

import com.craftmend.openaudiomc.OpenAudioMc;
import com.craftmend.openaudiomc.generic.commands.CommandService;
import com.craftmend.openaudiomc.generic.commands.enums.CommandContext;
import com.craftmend.openaudiomc.generic.commands.interfaces.SubCommand;
import com.craftmend.openaudiomc.generic.environment.MagicValue;
import com.craftmend.openaudiomc.generic.user.User;
import com.craftmend.openaudiomc.spigot.modules.users.adapters.SpigotUserAdapter;
import com.craftmend.openaudiomc.spigot.modules.players.objects.SpigotPlayerSelector;
import lombok.AllArgsConstructor;
import org.bukkit.Bukkit;
import org.bukkit.event.EventHandler;
import org.bukkit.event.Listener;
import org.bukkit.event.server.ServerCommandEvent;

import java.util.regex.Pattern;

@AllArgsConstructor
public class CommandTranslationMiddleware implements Listener {

    @EventHandler
    public void onCommand(ServerCommandEvent event) {
        String[] parts = event.getCommand().split(" ");

        // if first char is /, remove it
        if (parts.length == 0) return;
        if (parts[0].charAt(0) == '/') parts[0] = parts[0].replace("/", "");

        // check if the command is a openaudiomc command
        parts[0] = parts[0].toLowerCase();

        if (parts.length < 2) return;
        if (!OpenAudioMc.getService(CommandService.class).getAliases().contains(parts[0])) return;

        // get the command
        SubCommand subCommand = OpenAudioMc.getService(CommandService.class).getSubCommand(CommandContext.OPENAUDIOMC, parts[1].toLowerCase());
        if (subCommand == null) return;

        String selector = null;
        for (String part : parts) {
            if (part.startsWith("@")) selector = part;
        }

        // check if the selector is valid
        if (selector == null) return;

        // prepare the command with %%player%% as placeholder
        String commandPreset = event.getCommand();
        if (commandPreset.charAt(0) == '/') commandPreset = commandPreset.replace("/", "");
        commandPreset = commandPreset.replaceAll(Pattern.quote(selector), "%%player%%");

        SpigotPlayerSelector spigotPlayerSelector = new SpigotPlayerSelector();
        spigotPlayerSelector.setSender(new SpigotUserAdapter(event.getSender()));
        spigotPlayerSelector.setString(selector);

        if (spigotPlayerSelector.getResults().isEmpty()) {
            event.getSender().sendMessage(MagicValue.COMMAND_PREFIX.get(String.class) + "No players found for selector " + selector);
            event.setCancelled(true);
            return;
        }

        // process the selector, build a new command and re-run
        for (User<?> target : spigotPlayerSelector.getResults()) {
            String playerCommand = commandPreset.replaceAll("%%player%%", target.getName());
            Bukkit.getServer().dispatchCommand(event.getSender(), playerCommand);
            event.getSender().sendMessage(MagicValue.COMMAND_PREFIX.get(String.class) + "Changed selector to execute for " + target.getName());
        }

        event.setCancelled(true);
    }

}
