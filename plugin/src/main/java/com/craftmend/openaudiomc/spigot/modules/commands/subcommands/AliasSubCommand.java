package com.craftmend.openaudiomc.spigot.modules.commands.subcommands;

import com.craftmend.openaudiomc.OpenAudioMc;

import com.craftmend.openaudiomc.generic.commands.interfaces.SubCommand;
import com.craftmend.openaudiomc.generic.commands.objects.Argument;
import com.craftmend.openaudiomc.generic.database.DatabaseService;
import com.craftmend.openaudiomc.generic.media.tabcomplete.MediaTabcompleteProvider;
import com.craftmend.openaudiomc.generic.user.User;
import com.craftmend.openaudiomc.spigot.modules.shortner.AliasService;
import com.craftmend.openaudiomc.spigot.modules.shortner.completer.AliasNameTabCompleter;
import com.craftmend.openaudiomc.spigot.modules.shortner.data.Alias;
import org.bukkit.*;

import java.util.Locale;

public class AliasSubCommand extends SubCommand {

    public AliasSubCommand() {
        super("alias");
        registerArguments(
                new Argument("<name> <source>",
                        "Register a Alias for a source URL so you can easaly memorize them and can paste them onto signs without having to type a complete dictionary." +
                                " When an alias like onride_music is set, you can trigger it by using a:onride_music as your source.")
                        .addTabCompleteProvider(1, (sender) -> new String[]{"<alias-name>"})
                        .addTabCompleteProvider(2, MediaTabcompleteProvider.getInstance()),

                new Argument("delete <name>",
                        "Delete a alias from the database. This will also remove it from the memory cache.")
                        .addTabCompleteProvider(1, (sender) -> new String[]{"<alias-name>"})
                        .addTabCompleteProvider(2, AliasNameTabCompleter.getInstance()),

                new Argument("resolve <name>", "Resolve a alias to see what it's target is.")
                        .addTabCompleteProvider(1, (sender) -> new String[]{"<alias-name>"})
                        .addTabCompleteProvider(2, AliasNameTabCompleter.getInstance())
        );
    }

    @Override
    public void onExecute(User sender, String[] args) {
        sender.sendMessage("Length: " + args.length);
        if (args.length == 2 && !args[0].equalsIgnoreCase("delete") && !args[0].equalsIgnoreCase("resolve")) {
            String aliasName = args[0].toLowerCase();

            String aliasSource = args[1];
            Alias alias = new Alias(aliasName, aliasSource);
            OpenAudioMc.getService(AliasService.class).getAliasMap().put(aliasName, alias);

            OpenAudioMc.getService(DatabaseService.class).getRepository(Alias.class)
                    .save(alias);

            message(sender, ChatColor.GREEN + "Success! the alias " + ChatColor.YELLOW + "a:" + aliasName.toLowerCase() + ChatColor.GRAY + " will be read as " + ChatColor.YELLOW + aliasSource);
            return;
        } else if (args.length == 1) {
            String command = args[0].toLowerCase();

            switch (command) {
                case "delete":
                    OpenAudioMc.getService(AliasService.class).getAliasMap().remove(args[1]);

                    // find and delete the alias
                    Alias alias = OpenAudioMc.getService(DatabaseService.class).getRepository(Alias.class).getWhere("name", args[1].toLowerCase(Locale.ROOT));
                    if (alias != null) {
                        OpenAudioMc.getService(DatabaseService.class).getRepository(Alias.class).delete(alias);
                        message(sender, ChatColor.GREEN + "Success! the alias " + ChatColor.YELLOW + "a:" + args[1].toLowerCase() + ChatColor.GRAY + " has been removed.");
                    } else {
                        message(sender, ChatColor.RED + "Error! the alias " + ChatColor.YELLOW + "a:" + args[1].toLowerCase() + ChatColor.GRAY + " does not exist.");
                    }
                    break;

                case "resolve":
                    Alias resolved = OpenAudioMc.getService(AliasService.class).getAliasMap().get(args[1].toLowerCase(Locale.ROOT));
                    if (resolved != null) {
                        message(sender, ChatColor.GREEN + "Success! the alias " + ChatColor.YELLOW + "a:" + args[1].toLowerCase() + ChatColor.GRAY + " resolves to " + ChatColor.YELLOW + resolved.getTarget());
                    } else {
                        message(sender, ChatColor.RED + "Error! the alias " + ChatColor.YELLOW + "a:" + args[1].toLowerCase() + ChatColor.GRAY + " does not exist.");
                    }
                    break;
            }
        }

        sender.makeExecuteCommand("oa help " + getCommand());
    }

}
