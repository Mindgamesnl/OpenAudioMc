package net.openaudiomc.jclient.modules.commands;

import net.openaudiomc.jclient.OpenAudioMc;
import net.openaudiomc.jclient.modules.commands.commands.SuplyUrlCommand;

public class CommandsModule {

    public CommandsModule(OpenAudioMc plugin) {
        plugin.getCommand("audio").setExecutor(new SuplyUrlCommand());
    }

}
