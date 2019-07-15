package com.craftmend.openaudiomc.modules.commands.subcommands;

import com.craftmend.openaudiomc.OpenAudioMc;
import com.craftmend.openaudiomc.modules.commands.interfaces.SubCommand;
import com.craftmend.openaudiomc.modules.commands.objects.Argument;
import com.craftmend.openaudiomc.modules.configuration.enums.StorageLocation;
import com.craftmend.openaudiomc.modules.regions.objects.RegionProperties;
import org.bukkit.Bukkit;
import org.bukkit.ChatColor;
import org.bukkit.command.CommandSender;

public class RegionsSubCommand extends SubCommand {

    private OpenAudioMc openAudioMc;

    public RegionsSubCommand(OpenAudioMc openAudioMc) {
        super("region");
        registerArguments(
                new Argument("create <WG-region> <source>",
                        "Assigns a sound to a WorldGuard region by name"),

                new Argument("delete <WG-region>",
                        "Unlink the sound from a WorldGuard specific region by name")
        );
        this.openAudioMc = openAudioMc;
    }

    @Override
    public void onExecute(CommandSender sender, String[] args) {
        if (args.length == 0) {
            Bukkit.getServer().dispatchCommand(sender, "oa help " + getCommand());
            return;
        }

        if (openAudioMc.getRegionModule() == null) {
            message(sender,"You need to have WorldGuard installed in order to use the regions in OpenAudioMc.");
            return;
        }

        if (args[0].equalsIgnoreCase("create") && args.length == 3) {
            args[1] = args[1].toLowerCase();

            if (!openAudioMc.getRegionModule().getRegionAdapter().doesRegionExist(args[1])) {
                message(sender, ChatColor.RED + "ERROR! There is no worldguard region called '" + args[1]
                        + "'. Please make the worldguard region before you regester it in OpenAudioMc.");
                return;
            }

            openAudioMc.getConfigurationModule().setString(StorageLocation.DATA_FILE, "regions." + args[1], args[2]);
            openAudioMc.getRegionModule().registerRegion(args[1], new RegionProperties(args[2]));
            message(sender, "The WorldGuard region with the id " + args[1] + " now has the sound " + args[2]);
            return;
        }

        if (args[0].equalsIgnoreCase("delete") && args.length == 2) {
            openAudioMc.getConfigurationModule().setString(StorageLocation.DATA_FILE, "regions." + args[1], null);
            openAudioMc.getRegionModule().removeRegion(args[1]);
            message(sender, "The WorldGuard region with the id " + args[1] + " no longer has a sound linked to it.");
            return;
        }

        Bukkit.getServer().dispatchCommand(sender, "oa help " + getCommand());
    }
}
