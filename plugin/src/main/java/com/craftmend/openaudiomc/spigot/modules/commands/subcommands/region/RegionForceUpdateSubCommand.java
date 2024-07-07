package com.craftmend.openaudiomc.spigot.modules.commands.subcommands.region;

import com.craftmend.openaudiomc.generic.commands.interfaces.SubCommand;
import com.craftmend.openaudiomc.generic.commands.objects.Argument;
import com.craftmend.openaudiomc.generic.user.User;
import com.craftmend.openaudiomc.spigot.OpenAudioMcSpigot;
import com.craftmend.openaudiomc.spigot.modules.regions.RegionModule;
import com.craftmend.openaudiomc.spigot.modules.regions.registry.WorldRegionManager;

public class RegionForceUpdateSubCommand extends SubCommand {

    public RegionForceUpdateSubCommand() {
        super("forceupdate");

        registerArguments(
                new Argument("", "Force all regions to update their media cache")
        );

    }

    @Override
    public void onExecute(User<?> sender, String[] args) {
        OpenAudioMcSpigot oams = OpenAudioMcSpigot.getInstance();
        RegionModule regionModule = oams.getRegionModule();
        regionModule.getWorlds().forEach(WorldRegionManager::clearMediaCache);
        message(sender, "Cleared the media cache for all regions.");
    }
}
