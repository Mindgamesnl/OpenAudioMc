package com.craftmend.openaudiomc.spigot.modules.commands.subcommands.region;

import com.craftmend.openaudiomc.OpenAudioMc;
import com.craftmend.openaudiomc.api.WorldApi;
import com.craftmend.openaudiomc.api.exceptions.InvalidRegionException;
import com.craftmend.openaudiomc.api.exceptions.InvalidThreadException;
import com.craftmend.openaudiomc.api.exceptions.UnknownWorldException;
import com.craftmend.openaudiomc.api.regions.RegionMediaOptions;
import com.craftmend.openaudiomc.generic.commands.helpers.CommandParameters;
import com.craftmend.openaudiomc.generic.commands.interfaces.ParameteredSubCommand;
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

public class RegionCreateSubCommand extends ParameteredSubCommand {

    private final OpenAudioMcSpigot openAudioMcSpigot;

    public RegionCreateSubCommand(OpenAudioMcSpigot openAudioMcSpigot) {
        super("create");
        this.openAudioMcSpigot = openAudioMcSpigot;
    }

    @Override
    @SneakyThrows
    public void onExecute(User<?> sender, String[] args, CommandParameters parameters) {
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

        if (Validation.isStringInvalid(args[2])) {
            throw new CommandError("Invalid source url.");
        }

        try {
            WorldApi.getInstance().registerRegion(
                    parameters.getParameterOrDefault("world", sender.getWorld()),
                    args[1],
                    new RegionMediaOptions(args[2], volume)
            );
        } catch (UnknownWorldException e) {
            throw new CommandError("The world you are in is not known to the system.");
        } catch (InvalidThreadException e) {
            throw new RuntimeException(e);
        } catch (InvalidRegionException e) {
            throw new CommandError("The region with that id already exists or the region is invalid.");
        }

        message(sender, ChatColor.GREEN + "The WorldGuard region with the id " + args[1] + " now has the sound " + args[2]);
    }
}
