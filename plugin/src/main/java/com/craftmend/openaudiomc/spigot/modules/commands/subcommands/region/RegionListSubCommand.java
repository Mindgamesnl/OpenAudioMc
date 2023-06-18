package com.craftmend.openaudiomc.spigot.modules.commands.subcommands.region;

import com.craftmend.openaudiomc.generic.commands.interfaces.SubCommand;
import com.craftmend.openaudiomc.generic.user.User;
import com.craftmend.openaudiomc.spigot.OpenAudioMcSpigot;
import com.craftmend.openaudiomc.spigot.modules.regions.interfaces.ApiRegion;
import com.craftmend.openaudiomc.spigot.modules.regions.objects.RegionProperties;
import com.craftmend.openaudiomc.spigot.modules.regions.registry.WorldRegionManager;
import org.bukkit.ChatColor;
import org.bukkit.entity.Player;

import java.util.Collection;

public class RegionListSubCommand extends SubCommand {

    private final OpenAudioMcSpigot openAudioMcSpigot;

    public RegionListSubCommand(OpenAudioMcSpigot openAudioMcSpigot) {
        super("list");
        this.openAudioMcSpigot = openAudioMcSpigot;
    }

    @Override
    public void onExecute(User sender, String[] args) {
        if (!(sender.getOriginal() instanceof Player)) {
            message(sender, ChatColor.RED + "You need to be a player to use this command");
            return;
        }

        Player player = (Player) sender.getOriginal();
        Collection<ApiRegion> regions = OpenAudioMcSpigot.getInstance().getRegionModule().getRegionAdapter().getRegionsAtLocation(player.getLocation());

        if (regions.isEmpty()) {
            message(sender, ChatColor.RED + "There are no regions at your location");
            return;
        }

        WorldRegionManager wrm = OpenAudioMcSpigot.getInstance().getRegionModule().getWorld(player.getWorld().getName());

        message(sender, ChatColor.GRAY + "Found " + regions.size() + " regions at your location");
        for (ApiRegion region : regions) {
            message(sender, ChatColor.GRAY + " - " + ChatColor.YELLOW + region.getName());
            // get properties
            RegionProperties properties = wrm.getRegionProperties(region.getName());

            if (properties == null) {
                // try legacy

                // find the first region in OpenAudioMcSpigot.getInstance().getRegionModule().getRegionsWithoutWorld() with the same name
                for (RegionProperties regionProperties : OpenAudioMcSpigot.getInstance().getRegionModule().getRegionsWithoutWorld()) {
                    if (regionProperties.getRegionName().equals(region.getName())) {
                        properties = regionProperties;
                        break;
                    }
                }
            }

            if (properties == null) {
                message(sender, ChatColor.GRAY + "   - " + ChatColor.RED + "No properties found");
                continue;
            }

            message(sender, ChatColor.BLUE + "   -> " + ChatColor.YELLOW + "Volume: " + ChatColor.GRAY + properties.getVolume());
            message(sender, ChatColor.BLUE + "   -> " + ChatColor.YELLOW + "Fade: " + ChatColor.GRAY + properties.getFadeTimeMs());
            message(sender, ChatColor.BLUE + "   -> " + ChatColor.YELLOW + "Source: " + ChatColor.GRAY + properties.getSource());
            message(sender, ChatColor.BLUE + "   -> " + ChatColor.YELLOW + "Loop: " + ChatColor.GRAY + properties.getLoop());
            message(sender, ChatColor.BLUE + "   -> " + ChatColor.YELLOW + "Allows VC: " + ChatColor.GRAY + properties.getAllowsVoiceChat());
            if (properties.getWorlds() == null) {
                message(sender, ChatColor.BLUE + "   -> " + ChatColor.YELLOW + "Worlds: " + ChatColor.GRAY + "all");
                continue;
            }
            message(sender, ChatColor.BLUE + "   -> " + ChatColor.YELLOW + "Worlds: " + ChatColor.GRAY + String.join(", ", properties.getWorlds()));
        }
    }
}
