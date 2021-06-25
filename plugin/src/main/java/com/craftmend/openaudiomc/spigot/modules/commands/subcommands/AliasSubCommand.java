package com.craftmend.openaudiomc.spigot.modules.commands.subcommands;

import com.craftmend.openaudiomc.OpenAudioMc;
import com.craftmend.openaudiomc.generic.commands.interfaces.GenericExecutor;
import com.craftmend.openaudiomc.generic.commands.interfaces.SubCommand;
import com.craftmend.openaudiomc.generic.commands.objects.Argument;
import com.craftmend.openaudiomc.generic.storage.enums.StorageLocation;
import com.craftmend.openaudiomc.spigot.OpenAudioMcSpigot;
import org.bukkit.*;
import org.bukkit.command.CommandSender;

public class AliasSubCommand extends SubCommand {

    public AliasSubCommand() {
        super("alias");
        registerArguments(
                new Argument("<alias name> <source>",
                        "Register a Alias for a source URL so you can easaly memorize them and can paste them onto signs without having to type a complete dictionary." +
                                " When an alias like onride_music is set, you can trigger it by using a:onride_music as your source.")
        );
    }

    @Override
    public void onExecute(GenericExecutor sender, String[] args) {
        if (args.length == 2) {
            String aliasName = args[0].toLowerCase();
            String aliasSource = args[1];
            OpenAudioMcSpigot.getInstance().getAliasModule().getAliasMap().put(aliasName, aliasSource);
            OpenAudioMc.getInstance().getConfiguration().setString(StorageLocation.DATA_FILE, "aliases." + aliasName, aliasSource);
            message(sender, ChatColor.GREEN + "Success! the alias " + ChatColor.YELLOW + "a:" + aliasName.toLowerCase() + ChatColor.GRAY + " will be read as " + ChatColor.YELLOW + aliasSource);
            return;
        }

        Bukkit.getServer().dispatchCommand((CommandSender) sender.getOriginal(), "oa help " + getCommand());
    }

}
