package com.craftmend.openaudiomc.spigot.modules.commands.subcommands;

import com.craftmend.openaudiomc.spigot.OpenAudioMcSpigot;
import com.craftmend.openaudiomc.spigot.modules.commands.interfaces.SubCommand;
import com.craftmend.openaudiomc.spigot.modules.commands.objects.Argument;
import org.bukkit.command.CommandSender;

public class ReloadSubCommand extends SubCommand {

    public ReloadSubCommand() {
        super("reload");
        registerArguments(new Argument("", "Reloads the config.yml file"));
    }

    @Override
    public void onExecute(CommandSender sender, String[] args) {
        message(sender, "Reloading config...");
        OpenAudioMcSpigot.getInstance().getConfigurationModule().reloadConfig();
        message(sender, "Reloaded config.");
    }
}
