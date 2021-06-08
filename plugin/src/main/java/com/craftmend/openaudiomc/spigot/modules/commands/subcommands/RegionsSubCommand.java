package com.craftmend.openaudiomc.spigot.modules.commands.subcommands;

import com.craftmend.openaudiomc.OpenAudioMc;
import com.craftmend.openaudiomc.generic.commands.interfaces.GenericExecutor;
import com.craftmend.openaudiomc.generic.storage.interfaces.ConfigurationImplementation;
import com.craftmend.openaudiomc.spigot.OpenAudioMcSpigot;
import com.craftmend.openaudiomc.generic.commands.interfaces.SubCommand;
import com.craftmend.openaudiomc.generic.commands.objects.Argument;
import com.craftmend.openaudiomc.generic.storage.enums.StorageLocation;
import com.craftmend.openaudiomc.spigot.modules.regions.gui.RegionSelectionGui;
import com.craftmend.openaudiomc.spigot.modules.regions.objects.RegionProperties;
import com.craftmend.openaudiomc.spigot.modules.regions.objects.TimedRegionProperties;
import org.bukkit.Bukkit;
import org.bukkit.ChatColor;
import org.bukkit.command.CommandSender;
import org.bukkit.entity.Player;

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
                        "Unlink the sound from a WorldGuard specific region by name"),

                new Argument("edit",
                        "Opens the region editor GUI")
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
            message(sender,ChatColor.RED + "You need to have WorldGuard installed in order to use the regions in OpenAudioMc.");
            return;
        }

        if (sender.getOriginal() instanceof Player && (args[0].equalsIgnoreCase("edit") || args[0].equalsIgnoreCase("gui"))) {
            Player player = (Player) sender.getOriginal();
            new RegionSelectionGui(player);
            return;
        }

        if (args[0].equalsIgnoreCase("temp") && args.length == 4) {
            if (!isInteger(args[3])) {
                message(sender, ChatColor.RED + "You must have a duration in seconds, like 60");
                return;
            }

            args[1] = args[1].toLowerCase();

            // check if this region already is defined
            RegionProperties regionProperties = OpenAudioMcSpigot.getInstance().getRegionModule().getRegionPropertiesMap().get(args[1]);
            if (regionProperties != null) {
                if (regionProperties instanceof TimedRegionProperties) {
                    // reset it, because fuck it
                    TimedRegionProperties timedRegion = (TimedRegionProperties) regionProperties;
                    openAudioMcSpigot.getRegionModule().removeRegion(args[1]);
                    timedRegion.destroy();
                } else {
                    // message, fail
                    message(sender, ChatColor.RED + "ERROR! The region '" + args[1]
                            + "' already has a static media assigned to it.");
                    return;
                }
            }

            int duration = Integer.parseInt(args[3]);

            if (!openAudioMcSpigot.getRegionModule().getRegionAdapter().doesRegionExist(args[1])) {
                message(sender, ChatColor.RED + "ERROR! There is no WorldGuard region called '" + args[1]
                        + "'. Please make the WorldGuard region before you register it in OpenAudioMc.");
                return;
            }

            openAudioMcSpigot.getRegionModule().registerRegion(args[1], new TimedRegionProperties(args[2], duration, args[1]));
            message(sender, ChatColor.GREEN + "The WorldGuard region with the id " + args[1] + " now has the sound " + args[2]);

            openAudioMcSpigot.getRegionModule().forceUpdateRegions();
            return;
        }

        ConfigurationImplementation config = OpenAudioMc.getInstance().getConfiguration();
        if (args[0].equalsIgnoreCase("create") && args.length == 3) {
            args[1] = args[1].toLowerCase();

            if (!openAudioMcSpigot.getRegionModule().getRegionAdapter().doesRegionExist(args[1])) {
                message(sender, ChatColor.RED + "ERROR! There is no WorldGuard region called '" + args[1]
                        + "'. Please make the WorldGuard region before you register it in OpenAudioMc.");
                return;
            }

            config.setString(StorageLocation.DATA_FILE, "regions." + args[1], args[2]);
            openAudioMcSpigot.getRegionModule().registerRegion(args[1], new RegionProperties(args[2], 100, 1000, true));
            message(sender, ChatColor.GREEN + "The WorldGuard region with the id " + args[1] + " now has the sound " + args[2]);
            openAudioMcSpigot.getRegionModule().forceUpdateRegions();
            return;
        }

        if (args[0].equalsIgnoreCase("delete") && args.length == 2) {
            config.setString(StorageLocation.DATA_FILE, "regions." + args[1], null);
            openAudioMcSpigot.getRegionModule().removeRegion(args[1]);
            message(sender, ChatColor.RED + "The WorldGuard region with the id " + args[1] + " no longer has a sound linked to it.");
            openAudioMcSpigot.getRegionModule().forceUpdateRegions();
            return;
        }

        Bukkit.getServer().dispatchCommand((CommandSender) sender.getOriginal(), "oa help " + getCommand());
    }

}
