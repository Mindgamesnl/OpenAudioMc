package com.craftmend.openaudiomc.generic.commands.subcommands;

import com.craftmend.openaudiomc.OpenAudioMc;
import com.craftmend.openaudiomc.generic.commands.interfaces.GenericExecutor;
import com.craftmend.openaudiomc.generic.commands.interfaces.SubCommand;
import com.craftmend.openaudiomc.generic.commands.objects.Argument;
import com.craftmend.openaudiomc.generic.networking.client.objects.player.ClientConnection;
import com.craftmend.openaudiomc.generic.platform.Platform;

public class ReloadSubCommand extends SubCommand {

    public ReloadSubCommand() {
        super("reload");
        registerArguments(new Argument("", "Reloads the config.yml and connection system"));
    }

    @Override
    public void onExecute(GenericExecutor sender, String[] args) {
        message(sender, Platform.makeColor("RED") + "Reloading OpenAudioMc data (config and account details)...");
        OpenAudioMc.getInstance().getConfiguration().reloadConfig();
        OpenAudioMc.getInstance().getCraftmendService().syncAccount();

        message(sender, Platform.makeColor("RED") + "Shutting down network service and logging out...");
        for (ClientConnection client : OpenAudioMc.getInstance().getNetworkingService().getClients()) {
            client.kick();
        }
        OpenAudioMc.getInstance().getNetworkingService().stop();

        message(sender, Platform.makeColor("RED") + "Re-activating account...");
        OpenAudioMc.getInstance().getNetworkingService().connectIfDown();

        message(sender, Platform.makeColor("GREEN") + "Reloaded system! Welcome back.");
    }
}
