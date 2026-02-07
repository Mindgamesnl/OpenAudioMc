package com.craftmend.openaudiomc.spigot.modules.commands.subcommands.region;

import com.craftmend.openaudiomc.api.WorldApi;
import com.craftmend.openaudiomc.api.exceptions.InvalidRegionException;
import com.craftmend.openaudiomc.api.exceptions.InvalidThreadException;
import com.craftmend.openaudiomc.api.exceptions.UnknownWorldException;
import com.craftmend.openaudiomc.api.regions.RegionMediaOptions;
import com.craftmend.openaudiomc.generic.commands.helpers.CommandParameters;
import com.craftmend.openaudiomc.generic.commands.interfaces.ParameteredSubCommand;
import com.craftmend.openaudiomc.generic.commands.objects.CommandError;
import com.craftmend.openaudiomc.generic.media.utils.Validation;
import com.craftmend.openaudiomc.api.user.User;
import com.craftmend.openaudiomc.spigot.OpenAudioMcSpigot;
import com.craftmend.openaudiomc.spigot.modules.commands.subcommands.RegionsSubCommand;
import lombok.SneakyThrows;
import org.bukkit.ChatColor;

public class RegionCreateSubCommand extends ParameteredSubCommand {

    private final OpenAudioMcSpigot openAudioMcSpigot;
    private final RegionsSubCommand regionsSubCommand;

    public RegionCreateSubCommand(OpenAudioMcSpigot openAudioMcSpigot, RegionsSubCommand regionsSubCommand) {
        super("create");
        this.openAudioMcSpigot = openAudioMcSpigot;
        this.regionsSubCommand = regionsSubCommand;
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
            if (parameters.hasParameter("ignore-existing")) {
                // try to unregister first
                try {
                    this.regionsSubCommand.delegateTo("delete", sender, new String[]{"delete", args[1]});
                } catch (Exception e) {
                    if (e instanceof CommandError) {
                        // ignore
                    } else {
                        throw e;
                    }
                }
            }

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
            throw new CommandError("Could not create region: " + e.getMessage());
        }

        message(sender, ChatColor.GREEN + "The WorldGuard region with the id " + args[1] + " now has the sound " + args[2]);
    }
}
