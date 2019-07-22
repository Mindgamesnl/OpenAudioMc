package com.craftmend.openaudiomc.spigot.modules.commands.middleware;

import com.craftmend.openaudiomc.OpenAudioMc;
import com.craftmend.openaudiomc.spigot.modules.commands.interfaces.SubCommand;
import com.craftmend.openaudiomc.spigot.modules.players.objects.PlayerSelector;
import lombok.AllArgsConstructor;
import org.bukkit.Bukkit;
import org.bukkit.entity.Player;
import org.bukkit.event.EventHandler;
import org.bukkit.event.Listener;
import org.bukkit.event.server.ServerCommandEvent;

@AllArgsConstructor
public class CommandTranslationMiddleware implements Listener {

    private OpenAudioMc openAudioMc;

    @EventHandler
    public void onCommand(ServerCommandEvent event) {
        String[] parts = event.getCommand().split(" ");

        // if first char is /, remove it
        if (parts[0].charAt(0) == '/') parts[0] = parts[0].replace("/", "");

        // check if the command is a openaudiomc command
        parts[0] = parts[0].toLowerCase();

        if (!openAudioMc.getCommandModule().getAliases().contains(parts[0])) return;

        // get the command
        SubCommand subCommand = OpenAudioMc.getInstance().getCommandModule().getSubCommand(parts[1].toLowerCase());
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
        commandPreset = commandPreset.replaceAll(selector, "%%player%%");

        // process the selector, build a new command and re-run
        for (Player player : new PlayerSelector(selector).getPlayers(event.getSender())) {
            String playerCommand = commandPreset.replaceAll("%%player%%", player.getName());
            Bukkit.getServer().dispatchCommand(event.getSender(), playerCommand);
            event.getSender().sendMessage(openAudioMc.getCommandModule().getCommandPrefix() + "Changed selector to execute for " + player.getName());
        }

        event.setCancelled(true);
    }

}
