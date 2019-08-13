package com.craftmend.openaudiomc.spigot.modules.commands.subcommands;

import com.craftmend.openaudiomc.OpenAudioMc;
import com.craftmend.openaudiomc.generic.commands.interfaces.GenericExecutor;
import com.craftmend.openaudiomc.generic.commands.interfaces.SubCommand;
import com.craftmend.openaudiomc.generic.commands.objects.Argument;

public class ReloadSubCommand extends SubCommand {

    public ReloadSubCommand() {
        super("reload");
        registerArguments(new Argument("", "Reloads the config.yml file"));
    }

    @Override
    public void onExecute(GenericExecutor sender, String[] args) {
        message(sender, "Reloading config...");
        OpenAudioMc.getInstance().getConfigurationInterface().reloadConfig();
        message(sender, "Reloaded config.");
    }
}
