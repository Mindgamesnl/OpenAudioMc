package com.craftmend.openaudiomc.spigot.modules.commands.subcommands.region;

import com.craftmend.openaudiomc.generic.commands.interfaces.SubCommand;
import com.craftmend.openaudiomc.generic.user.User;
import com.craftmend.openaudiomc.spigot.OpenAudioMcSpigot;
import com.craftmend.openaudiomc.spigot.modules.regions.objects.RegionProperties;
import com.craftmend.openaudiomc.spigot.modules.regions.objects.TimedRegionProperties;
import org.bukkit.ChatColor;

public class RegionTempSubCommand extends SubCommand {

    private final OpenAudioMcSpigot openAudioMcSpigot;

    public RegionTempSubCommand(OpenAudioMcSpigot openAudioMcSpigot) {
        super("temp");
        this.openAudioMcSpigot = openAudioMcSpigot;
    }

    @Override
    public void onExecute(User sender, String[] args) {
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
    }
}
