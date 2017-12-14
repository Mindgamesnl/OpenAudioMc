package net.openaudiomc.jclient.modules.commands;

import net.openaudiomc.jclient.OpenAudioMc;
import net.openaudiomc.jclient.modules.commands.commands.SuplyUrlCommand;
import net.openaudiomc.jclient.modules.commands.listeners.CustomCommandListener;

public class CommandsModule {

    public CommandsModule(OpenAudioMc plugin) {
        plugin.getCommand("audio").setExecutor(new SuplyUrlCommand());
        plugin.getCommand("connect").setExecutor(new SuplyUrlCommand());
        plugin.getCommand("sound").setExecutor(new SuplyUrlCommand());
        plugin.getServer().getPluginManager().registerEvents(new CustomCommandListener(), plugin);
    }

}
