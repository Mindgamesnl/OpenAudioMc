package com.craftmend.openaudiomc.spigot.modules.commands.subcommands;

import com.craftmend.openaudiomc.OpenAudioMc;
import com.craftmend.openaudiomc.generic.commands.interfaces.GenericExecutor;
import com.craftmend.openaudiomc.generic.interfaces.ConfigurationInterface;
import com.craftmend.openaudiomc.spigot.OpenAudioMcSpigot;
import com.craftmend.openaudiomc.generic.commands.interfaces.SubCommand;
import com.craftmend.openaudiomc.generic.commands.objects.Argument;
import com.craftmend.openaudiomc.generic.storage.enums.StorageLocation;
import com.craftmend.openaudiomc.spigot.modules.regions.objects.RegionProperties;
import com.craftmend.openaudiomc.spigot.modules.regions.objects.TimedRegionProperties;
import org.bukkit.Bukkit;
import org.bukkit.ChatColor;
import org.bukkit.command.CommandSender;

public class RegionsSubCommand extends SubCommand {

    private OpenAudioMcSpigot openAudioMcSpigot;

    public RegionsSubCommand(OpenAudioMcSpigot openAudioMcSpigot) {
        super("region");
        registerArguments(
                new Argument("create <WG-region> <source>",
                        "Assigns a sound to a WorldGuard region by name"),

                new Argument("temp <WG-region> <source> <duration>",
                        "Create a temporary region with it's own synced sound"),

                new Argument("delete <WG-region>",
                        "Unlink the sound from a WorldGuard specific region by name")
        );
        this.openAudioMcSpigot = openAudioMcSpigot;
    }

    @Override
    public void onExecute(GenericExecutor sender, String[] args) {
        if (args.length == 0) {
            Bukkit.getServer().dispatchCommand((CommandSender) sender.getOriginal(), "oa help " + getCommand());
            return;
        }

        if (openAudioMcSpigot.getRegionModule() == null) {
            message(sender,"You need to have WorldGuard installed in order to use the regions in OpenAudioMc.");
            return;
        }

        if (args[0].equalsIgnoreCase("temp") && args.length == 4) {
            if (!isInteger(args[3])) {
                message(sender, ChatColor.RED + "You must have a duration in seconds, like 60");
                return;
            }

            int duration = Integer.parseInt(args[3]);

            args[1] = args[1].toLowerCase();

            if (!openAudioMcSpigot.getRegionModule().getRegionAdapter().doesRegionExist(args[1])) {
                message(sender, ChatColor.RED + "ERROR! There is no WorldGuard region called '" + args[1]
                        + "'. Please make the WorldGuard region before you register it in OpenAudioMc.");
                return;
            }

            openAudioMcSpigot.getRegionModule().registerRegion(args[1], new TimedRegionProperties(args[2], duration, args[1]));
            message(sender, "The WorldGuard region with the id " + args[1] + " now has the sound " + args[2]);
            return;
        }

        ConfigurationInterface config = OpenAudioMc.getInstance().getConfigurationInterface();
        if (args[0].equalsIgnoreCase("create") && args.length == 3) {
            args[1] = args[1].toLowerCase();

            if (!openAudioMcSpigot.getRegionModule().getRegionAdapter().doesRegionExist(args[1])) {
                message(sender, ChatColor.RED + "ERROR! There is no WorldGuard region called '" + args[1]
                        + "'. Please make the WorldGuard region before you register it in OpenAudioMc.");
                return;
            }

            config.setString(StorageLocation.DATA_FILE, "regions." + args[1], args[2]);
            openAudioMcSpigot.getRegionModule().registerRegion(args[1], new RegionProperties(args[2]));
            message(sender, "The WorldGuard region with the id " + args[1] + " now has the sound " + args[2]);
            return;
        }

        if (args[0].equalsIgnoreCase("delete") && args.length == 2) {
            config.setString(StorageLocation.DATA_FILE, "regions." + args[1], null);
            openAudioMcSpigot.getRegionModule().removeRegion(args[1]);
            message(sender, "The WorldGuard region with the id " + args[1] + " no longer has a sound linked to it.");
            return;
        }

        Bukkit.getServer().dispatchCommand((CommandSender) sender.getOriginal(), "oa help " + getCommand());
    }

}
