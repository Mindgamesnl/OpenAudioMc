package com.craftmend.openaudiomc.spigot.modules.commands.subcommands.region;

import com.craftmend.openaudiomc.OpenAudioMc;
import com.craftmend.openaudiomc.generic.commands.interfaces.SubCommand;
import com.craftmend.openaudiomc.generic.database.DatabaseService;
import com.craftmend.openaudiomc.generic.user.User;
import com.craftmend.openaudiomc.spigot.OpenAudioMcSpigot;
import com.craftmend.openaudiomc.spigot.modules.regions.objects.RegionProperties;
import org.bukkit.ChatColor;

public class RegionCreateSubCommand extends SubCommand {

    private OpenAudioMcSpigot openAudioMcSpigot;

    public RegionCreateSubCommand(OpenAudioMcSpigot openAudioMcSpigot) {
        super("create");
        this.openAudioMcSpigot = openAudioMcSpigot;
    }

    @Override
    public void onExecute(User sender, String[] args) {
        args[1] = args[1].toLowerCase();

        if (!openAudioMcSpigot.getRegionModule().getRegionAdapter().doesRegionExist(args[1])) {
            message(sender, ChatColor.RED + "ERROR! There is no WorldGuard region called '" + args[1]
                    + "'. Please make the WorldGuard region before you register it in OpenAudioMc.");
            return;
        }

        RegionProperties rp = new RegionProperties(args[2], 100, 1000, true, args[1]);
        OpenAudioMc.getService(DatabaseService.class).getRepository(RegionProperties.class)
                .save(rp.getRegionName(), rp);

        openAudioMcSpigot.getRegionModule().registerRegion(rp.getRegionName(), rp);

        message(sender, ChatColor.GREEN + "The WorldGuard region with the id " + args[1] + " now has the sound " + args[2]);
        openAudioMcSpigot.getRegionModule().forceUpdateRegions();
    }
}
