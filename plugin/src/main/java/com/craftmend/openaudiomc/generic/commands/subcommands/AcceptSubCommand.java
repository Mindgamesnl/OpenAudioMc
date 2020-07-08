package com.craftmend.openaudiomc.generic.commands.subcommands;

import com.craftmend.openaudiomc.OpenAudioMc;
import com.craftmend.openaudiomc.generic.commands.interfaces.GenericExecutor;
import com.craftmend.openaudiomc.generic.commands.interfaces.SubCommand;
import com.craftmend.openaudiomc.generic.core.storage.enums.StorageKey;
import com.craftmend.openaudiomc.generic.networking.client.objects.player.ClientConnection;

public class AcceptSubCommand extends SubCommand {

    public AcceptSubCommand() {
        super("accept");
    }

    @Override
    public void onExecute(GenericExecutor sender, String[] args) {
        // set the value to true
        OpenAudioMc.getInstance().getConfigurationImplementation().setBoolean(StorageKey.LEGAL_ACCEPTED_TOS_AND_PRIVACY, true);
        OpenAudioMc.getInstance().getConfigurationImplementation().saveAll();
        sender.sendMessage(OpenAudioMc.getInstance().getCommandModule().getCommandPrefix() + "Welcome to OpenAudioMc! you accepted the terms, enjoy the service!");

        OpenAudioMc.getInstance().getNetworkingService().connectIfDown();

        for (ClientConnection client : OpenAudioMc.getInstance().getNetworkingService().getClients()) {
            client.publishUrl();
        }
    }
}
