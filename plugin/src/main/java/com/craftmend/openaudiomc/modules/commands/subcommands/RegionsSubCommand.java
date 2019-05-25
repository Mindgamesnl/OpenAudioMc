package com.craftmend.openaudiomc.modules.commands.subcommands;

import com.craftmend.openaudiomc.OpenAudioMc;
import com.craftmend.openaudiomc.modules.commands.interfaces.SubCommand;
import com.craftmend.openaudiomc.modules.commands.objects.Argument;
import com.craftmend.openaudiomc.modules.regions.objects.RegionProperties;
import org.bukkit.Bukkit;
import org.bukkit.command.CommandSender;

public class RegionsSubCommand extends SubCommand {

    private OpenAudioMc openAudioMc;

    public RegionsSubCommand(OpenAudioMc openAudioMc) {
        super("region");
        registerArguments(
                new Argument("create <WG-region> <source>",
                        "Assigns a sound to a WorldGuard region by name",
                        -1),

                new Argument("delete <WG-region>",
                        "Unlink the sound from a WorldGuard specific region by name",
                        -1)
        );
        this.openAudioMc = openAudioMc;
    }

    @Override
    public void onExecute(CommandSender sender, String[] args) {
        if (args.length == 0) {
            Bukkit.getServer().dispatchCommand(sender, "oa help " + getCommand());
            return;
        }

        if (openAudioMc.getRegionModule() == null) {
            message(sender,"You need to have WorldGuard installed in order to use the regions in OpenAudioMc.");
            return;
        }

        if (args[0].equalsIgnoreCase("create") && args.length == 3) {
            args[1] = args[1].toLowerCase();
            openAudioMc.getConfigurationModule().getDataConfig().set("regions." + args[1], args[2]);
            openAudioMc.getRegionModule().registerRegion(args[1], new RegionProperties(args[2]));
            message(sender, "Thw WorldGuard region with the id " + args[1] + " now has the sound " + args[2]);
            return;
        }

        if (args[0].equalsIgnoreCase("delete") && args.length == 2) {
            openAudioMc.getConfigurationModule().getDataConfig().set("regions." + args[1], null);
            openAudioMc.getRegionModule().removeRegion(args[1]);
            message(sender, "Thw WorldGuard region with the id " + args[1] + " no longer has a sound linked to it.");
            return;
        }

        Bukkit.getServer().dispatchCommand(sender, "oa help " + getCommand());
    }
}
