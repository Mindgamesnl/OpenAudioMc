package net.openaudiomc.jclient.modules.commands;

import net.openaudiomc.jclient.OpenAudioMc;
import net.openaudiomc.jclient.modules.commands.commands.AdminCommand;
import net.openaudiomc.jclient.modules.commands.commands.SetvolumeCommand;
import net.openaudiomc.jclient.modules.commands.commands.SuplyUrlCommand;
import net.openaudiomc.jclient.modules.commands.listeners.CustomCommandListener;

public class CommandsModule {

    public CommandsModule(OpenAudioMc plugin) {
        plugin.getCommand("audio").setExecutor(new SuplyUrlCommand());
        plugin.getCommand("oa").setExecutor(new AdminCommand());
        plugin.getCommand("volume").setExecutor(new SetvolumeCommand());

        plugin.getServer().getPluginManager().registerEvents(new CustomCommandListener(), plugin);
    }
}
