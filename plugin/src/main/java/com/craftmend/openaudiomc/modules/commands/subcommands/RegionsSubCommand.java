package com.craftmend.openaudiomc.modules.commands.subcommands;

import com.craftmend.openaudiomc.OpenAudioMc;
import com.craftmend.openaudiomc.modules.commands.interfaces.SubCommand;
import com.craftmend.openaudiomc.modules.regions.objects.RegionPropperties;
import com.google.gson.Gson;
import org.bukkit.Bukkit;
import org.bukkit.command.CommandSender;

public class RegionsSubCommand extends SubCommand {

    private OpenAudioMc openAudioMc;

    public RegionsSubCommand(OpenAudioMc openAudioMc) {
        super("region");
        this.openAudioMc = openAudioMc;
    }

    @Override
    public void onExecute(CommandSender sender, String[] args) {
        if (args.length == 0) {
            message(sender,"Invalid command. Please refer to the help page.");
            return;
        }

        if (openAudioMc.getRegionModule() == null) {
            message(sender,"You need to have WorldGuard installed in order to use the regions in OpenAudioMc.");
            return;
        }

        if (args[0].equalsIgnoreCase("create") && args.length == 3) {
            openAudioMc.getConfigurationModule().getDataConfig().set("regions." + args[1], args[2]);
            openAudioMc.getRegionModule().registerRegion(args[1], new RegionPropperties(args[2]));
            message(sender, "Thw WorldGuard region with the id " + args[0] + " now has the sound " + args[2]);
            return;
        }

        if (args[0].equalsIgnoreCase("delete") && args.length == 2) {
            openAudioMc.getConfigurationModule().getDataConfig().set("regions." + args[1], null);
            openAudioMc.getRegionModule().removeRegion(args[1]);
            message(sender, "Thw WorldGuard region with the id " + args[0] + " lo longer has any sound linked to it since it has now been removed.");
            return;
        }
    }
}
