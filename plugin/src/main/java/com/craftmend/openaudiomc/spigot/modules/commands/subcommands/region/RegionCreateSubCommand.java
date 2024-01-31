package com.craftmend.openaudiomc.spigot.modules.commands.subcommands.region;

import com.craftmend.openaudiomc.OpenAudioMc;
import com.craftmend.openaudiomc.generic.commands.interfaces.SubCommand;
import com.craftmend.openaudiomc.generic.commands.objects.CommandError;
import com.craftmend.openaudiomc.generic.database.DatabaseService;
import com.craftmend.openaudiomc.generic.media.utils.Validation;
import com.craftmend.openaudiomc.generic.user.User;
import com.craftmend.openaudiomc.spigot.OpenAudioMcSpigot;
import com.craftmend.openaudiomc.spigot.modules.regions.objects.RegionProperties;
import com.craftmend.openaudiomc.spigot.modules.regions.registry.WorldRegionManager;
import lombok.SneakyThrows;
import org.bukkit.ChatColor;

public class RegionCreateSubCommand extends SubCommand {

    private final OpenAudioMcSpigot openAudioMcSpigot;

    public RegionCreateSubCommand(OpenAudioMcSpigot openAudioMcSpigot) {
        super("create");
        this.openAudioMcSpigot = openAudioMcSpigot;
    }

    @Override
    @SneakyThrows
    public void onExecute(User sender, String[] args) {
        args[1] = args[1].toLowerCase();

        int volume = 100;
        if (args.length == 4) {
            try {
                volume = Integer.parseInt(args[3]);
            } catch (NumberFormatException e) {
                message(sender, ChatColor.RED + "ERROR! Volume must be a number!");
                return;
            }
        }

        if (volume < 0 || volume > 100) {
            message(sender, ChatColor.RED + "The volume must be between 0 and 100");
            return;
        }

        if (!openAudioMcSpigot.getRegionModule().getRegionAdapter().doesRegionExist(args[1])) {
            message(sender, ChatColor.RED + "ERROR! There is no WorldGuard region called '" + args[1]
                    + "'. Please make the WorldGuard region before you register it in OpenAudioMc.");
            return;
        }

        if (Validation.isStringInvalid(args[2])) {
            throw new CommandError("Invalid source url.");
        }

        RegionProperties rp = new RegionProperties(args[2], volume, 1000, true, args[1], sender.getWorld());
        OpenAudioMc.getService(DatabaseService.class).getRepository(RegionProperties.class)
                .save(rp);

        WorldRegionManager worldRegionManager = openAudioMcSpigot.getRegionModule().getWorld(sender.getWorld());

        worldRegionManager.registerRegion(rp);

        message(sender, ChatColor.GREEN + "The WorldGuard region with the id " + args[1] + " now has the sound " + args[2]);
        openAudioMcSpigot.getRegionModule().forceUpdateRegions();
    }
}
