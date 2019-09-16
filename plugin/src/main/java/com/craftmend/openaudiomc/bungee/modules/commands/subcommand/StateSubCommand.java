package com.craftmend.openaudiomc.bungee.modules.commands.subcommand;
import com.craftmend.openaudiomc.OpenAudioMc;
import com.craftmend.openaudiomc.generic.commands.interfaces.GenericExecutor;
import com.craftmend.openaudiomc.generic.commands.interfaces.SubCommand;
import com.craftmend.openaudiomc.generic.commands.objects.Argument;
import com.craftmend.openaudiomc.generic.networking.client.objects.ClientConnection;
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
        message(sender, getColor("YELLOW") + "State: " + getColor("GRAY") + "Usefull session info");
        message(sender, getColor("YELLOW") + "State: " + getColor("AQUA") + OpenAudioMc.getInstance().getStateService().getCurrentState().getClass().getSimpleName());
        message(sender, getColor("YELLOW") + "State Info: " + getColor("AQUA") + OpenAudioMc.getInstance().getStateService().getCurrentState().getDescription());

        int clients = 0;
        for (ClientConnection clientConnection : OpenAudioMc.getInstance().getNetworkingService().getClients()) {
            if (clientConnection.isConnected()) clients++;
        }
        message(sender, getColor("YELLOW") + "Connected Clients: " + getColor("AQUA") + "" + clients);
        message(sender, getColor("YELLOW") + "OpenAudioMc Provider: " + getColor("AQUA") + "" + OpenAudioMc.getInstance().getPlatform());
        message(sender, getColor("YELLOW") + "Time Offset: " + getColor("AQUA") + "" + OpenAudioMc.getInstance().getTimeService().getOffset());
        message(sender, getColor("YELLOW") + "Lat time update: " + getColor("AQUA") + "" + Duration.between(OpenAudioMc.getInstance().getTimeService().getLastUpdated(), Instant.now()).getSeconds() + " seconds ago");
    }
}
