package com.craftmend.openaudiomc.spigot.modules.commands.subcommands;

import com.craftmend.openaudiomc.generic.commands.helpers.ParameterUtil;
import com.craftmend.openaudiomc.generic.commands.interfaces.SubCommand;
import com.craftmend.openaudiomc.generic.commands.objects.Argument;
import com.craftmend.openaudiomc.generic.media.tabcomplete.MediaTabcompleteProvider;
import com.craftmend.openaudiomc.generic.user.User;
import com.craftmend.openaudiomc.spigot.OpenAudioMcSpigot;
import com.craftmend.openaudiomc.spigot.modules.commands.subcommands.region.*;
import com.craftmend.openaudiomc.spigot.modules.regions.gui.RegionSelectionGui;
import org.bukkit.ChatColor;
import org.bukkit.entity.Player;

public class RegionsSubCommand extends SubCommand {

    private final OpenAudioMcSpigot openAudioMcSpigot;

    public RegionsSubCommand(OpenAudioMcSpigot openAudioMcSpigot) {
        super("region");

        registerSubCommands(
                new RegionCreateSubCommand(openAudioMcSpigot),
                new RegionDeleteSubCommand(openAudioMcSpigot),
                new RegionTempSubCommand(openAudioMcSpigot),
                new RegionEditSubCommand(openAudioMcSpigot),
                new RegionListSubCommand(openAudioMcSpigot),
                new RegionForceUpdateSubCommand()
        );

        registerArguments(
                new Argument("create <WG-region> <source> [volume]",
                        "Assigns a sound to a WorldGuard region by name, with optional volume")
                        .addTabCompleteProvider(1, (sender) -> new String[]{"<region-name>"})
                        .addTabCompleteProvider(2, MediaTabcompleteProvider.getInstance()),

                new Argument("temp <WG-region> <source> <duration>",
                        "Create a temporary region with it's own synced sound")
                        .addTabCompleteProvider(1, (sender) -> new String[]{"<region-name>"})
                        .addTabCompleteProvider(2, MediaTabcompleteProvider.getInstance()),

                new Argument("delete <WG-region>",
                        "Unlink the sound from a WorldGuard specific region by name"),

                new Argument("edit",
                        "Change settings through the a GUI"),

                new Argument("edit volume <region> <volume>",
                        "Change the volume of a region"),

                new Argument("edit fade <region> <fade time MS>",
                        "Change the fade of a region"),

                new Argument("list",
                        "List all regions at your current location and their properties"),

                new Argument("forceupdate", "Force all regions to update their media cache")
        );
        this.openAudioMcSpigot = openAudioMcSpigot;
    }

    @Override
    public void onExecute(User sender, String[] args) {
        if (args.length == 0) {
            sender.makeExecuteCommand("oa help " + getCommand());
            return;
        }

        if (openAudioMcSpigot.getRegionModule() == null) {
            message(sender,ChatColor.RED + "You need to have WorldGuard installed in order to use the regions in OpenAudioMc.");
            return;
        }

        int argumentCount = ParameterUtil.countArgumentsWithoutParams(args);

        if ((args[0].equalsIgnoreCase("edit") || args[0].equalsIgnoreCase("gui"))) {

            // do we have any other args?
            if (argumentCount > 1) {
                delegateTo("edit", sender, args);
                return;
            }

            if (!(sender.getOriginal() instanceof Player)) {
                message(sender, ChatColor.RED + "You need to be a player to use this command");
                return;
            }

            Player player = (Player) sender.getOriginal();
            new RegionSelectionGui(player);
            return;
        }

        if (args[0].equalsIgnoreCase("temp") && argumentCount == 4) {
            delegateTo("temp", sender, args);
            return;
        }

        if (args[0].equalsIgnoreCase("create") && argumentCount == 3 || argumentCount == 4) {
            delegateTo("create", sender, args);
            return;
        }

        if (args[0].equalsIgnoreCase("delete") && argumentCount == 2) {
            delegateTo("delete", sender, args);
            return;
        }

        if (args[0].equalsIgnoreCase("list") && args.length == 1) {
            delegateTo("list", sender, args);
            return;
        }

        if (args[0].equalsIgnoreCase("forceupdate") && args.length == 1) {
            delegateTo("forceupdate", sender, args);
            return;
        }

        sender.makeExecuteCommand("oa help " + getCommand());
    }

}
