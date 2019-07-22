package com.craftmend.openaudiomc.spigot.modules.commands.subcommands;

import com.craftmend.openaudiomc.OpenAudioMcCore;
import com.craftmend.openaudiomc.generic.commands.interfaces.GenericExecutor;
import com.craftmend.openaudiomc.spigot.OpenAudioMcSpigot;
import com.craftmend.openaudiomc.generic.commands.interfaces.SubCommand;
import com.craftmend.openaudiomc.generic.commands.objects.Argument;
import com.craftmend.openaudiomc.spigot.modules.players.objects.SpigotConnection;
import org.bukkit.ChatColor;

import java.time.Duration;
import java.time.Instant;

public class StateSubCommand extends SubCommand {

    public StateSubCommand() {
        super("state");
        registerArguments(new Argument("", "Obtain and display state information"));
    }

    @Override
    public void onExecute(GenericExecutor sender, String[] args) {
        message(sender, ChatColor.YELLOW + "State: " + ChatColor.GRAY + "Usefull session info");
        message(sender, ChatColor.YELLOW + "State: " + ChatColor.AQUA + OpenAudioMcCore.getInstance().getStateService().getCurrentState().getClass().getSimpleName());
        message(sender, ChatColor.YELLOW + "State Info: " + ChatColor.AQUA + OpenAudioMcCore.getInstance().getStateService().getCurrentState().getDescription());

        int clients = 0;
        for (SpigotConnection spigotConnection : OpenAudioMcSpigot.getInstance().getPlayerModule().getClients()) {
            if (spigotConnection.getClientConnection().isConnected()) clients++;
        }

        message(sender, ChatColor.YELLOW + "Connected Clients: " + ChatColor.AQUA + "" + clients);
        if (OpenAudioMcSpigot.getInstance().getRegionModule() == null) {
            message(sender, ChatColor.YELLOW + "Loaded Audio Regions: " + ChatColor.RED + "Feature Disabled");
        } else {
            message(sender, ChatColor.YELLOW + "Loaded Audio Regions: " + ChatColor.AQUA + "" + OpenAudioMcSpigot.getInstance().getRegionModule().getRegionPropertiesMap().size());
        }
        message(sender, ChatColor.YELLOW + "Loaded Speakers: " + ChatColor.AQUA + "" + OpenAudioMcSpigot.getInstance().getSpeakerModule().getSpeakerMap().size());
        message(sender, ChatColor.YELLOW + "Detected Version: " + ChatColor.AQUA + "" + OpenAudioMcSpigot.getInstance().getServerService().getVersion());
        message(sender, ChatColor.YELLOW + "Time Offset: " + ChatColor.AQUA + "" + OpenAudioMcCore.getInstance().getTimeService().getOffset());
        message(sender, ChatColor.YELLOW + "Lat time update: " + ChatColor.AQUA + "" + Duration.between(OpenAudioMcCore.getInstance().getTimeService().getLastUpdated(), Instant.now()).getSeconds() + " seconds ago");
    }
}
