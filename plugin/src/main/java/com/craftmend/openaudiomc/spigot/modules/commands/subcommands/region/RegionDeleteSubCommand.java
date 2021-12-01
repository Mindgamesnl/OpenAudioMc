package com.craftmend.openaudiomc.spigot.modules.commands.subcommands.region;

import com.craftmend.openaudiomc.OpenAudioMc;
import com.craftmend.openaudiomc.generic.commands.interfaces.SubCommand;
import com.craftmend.openaudiomc.generic.database.DatabaseService;
import com.craftmend.openaudiomc.generic.user.User;
import com.craftmend.openaudiomc.spigot.OpenAudioMcSpigot;
import com.craftmend.openaudiomc.spigot.modules.regions.objects.RegionProperties;
import com.craftmend.openaudiomc.spigot.modules.regions.objects.TimedRegionProperties;
import org.bukkit.ChatColor;

public class RegionDeleteSubCommand extends SubCommand {

    private OpenAudioMcSpigot openAudioMcSpigot;

    public RegionDeleteSubCommand(OpenAudioMcSpigot openAudioMcSpigot) {
        super("delete");
        this.openAudioMcSpigot = openAudioMcSpigot;
    }

    @Override
    public void onExecute(User sender, String[] args) {
        String targetRegion = args[1].toLowerCase();

        // check if it was valid in the first place
        RegionProperties rp = openAudioMcSpigot.getRegionModule().getRegionPropertiesMap().get(targetRegion);
        if (rp != null) {
            OpenAudioMc.getService(DatabaseService.class).getRepository(RegionProperties.class)
                    .delete(targetRegion);

            if (rp instanceof TimedRegionProperties) {
                ((TimedRegionProperties) rp).destroy();
            }

            openAudioMcSpigot.getRegionModule().removeRegion(targetRegion);
            message(sender, ChatColor.RED + "The WorldGuard region with the id " + targetRegion + " no longer has a sound linked to it.");
        } else {
            message(sender, ChatColor.RED + "There's no worldguard region by the name " + targetRegion);
        }
        openAudioMcSpigot.getRegionModule().forceUpdateRegions();
    }
}
