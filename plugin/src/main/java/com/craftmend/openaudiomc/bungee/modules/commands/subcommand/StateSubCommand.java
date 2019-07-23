package com.craftmend.openaudiomc.bungee.modules.commands.subcommand;
import com.craftmend.openaudiomc.OpenAudioMcCore;
import com.craftmend.openaudiomc.generic.commands.interfaces.GenericExecutor;
import com.craftmend.openaudiomc.generic.commands.interfaces.SubCommand;
import com.craftmend.openaudiomc.generic.commands.objects.Argument;
import com.craftmend.openaudiomc.generic.networking.client.objects.ClientConnection;
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
        for (ClientConnection clientConnection : OpenAudioMcCore.getInstance().getNetworkingService().getClients()) {
            if (clientConnection.isConnected()) clients++;
        }
        message(sender, ChatColor.YELLOW + "Connected Clients: " + ChatColor.AQUA + "" + clients);
        message(sender, ChatColor.YELLOW + "OpenAudioMc Provider: " + ChatColor.AQUA + "" + OpenAudioMcCore.getInstance().getPlatform());
        message(sender, ChatColor.YELLOW + "Time Offset: " + ChatColor.AQUA + "" + OpenAudioMcCore.getInstance().getTimeService().getOffset());
        message(sender, ChatColor.YELLOW + "Lat time update: " + ChatColor.AQUA + "" + Duration.between(OpenAudioMcCore.getInstance().getTimeService().getLastUpdated(), Instant.now()).getSeconds() + " seconds ago");
    }
}
