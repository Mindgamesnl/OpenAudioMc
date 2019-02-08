package com.craftmend.openaudiomc.modules.commands.subcommands;

import com.craftmend.openaudiomc.OpenAudioMc;
import com.craftmend.openaudiomc.modules.commands.interfaces.SubCommand;
import com.craftmend.openaudiomc.modules.commands.objects.Argument;
import org.bukkit.command.CommandSender;

public class ReloadSubCommand extends SubCommand {

    public ReloadSubCommand() {
        super("reload");
        registerArguments(new Argument("", "Reloads the config.yml file"));
    }

    @Override
    public void onExecute(CommandSender sender, String[] args) {
        message(sender, "Reloading config...");
        OpenAudioMc.getInstance().reloadConfigurationModule();
        message(sender, "Reloaded config.");
    }
}
