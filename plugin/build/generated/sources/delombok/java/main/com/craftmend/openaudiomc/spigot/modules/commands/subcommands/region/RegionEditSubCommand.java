package com.craftmend.openaudiomc.spigot.modules.commands.subcommands.region;

import com.craftmend.openaudiomc.OpenAudioMc;
import com.craftmend.openaudiomc.generic.commands.helpers.CommandParameters;
import com.craftmend.openaudiomc.generic.commands.interfaces.ParameteredSubCommand;
import com.craftmend.openaudiomc.generic.commands.interfaces.SubCommand;
import com.craftmend.openaudiomc.generic.commands.objects.Argument;
import com.craftmend.openaudiomc.generic.database.DatabaseService;
import com.craftmend.openaudiomc.generic.media.objects.MediaUpdate;
import com.craftmend.openaudiomc.generic.networking.packets.client.media.PacketClientUpdateMedia;
import com.craftmend.openaudiomc.generic.user.User;
import com.craftmend.openaudiomc.generic.utils.data.ArrayUtil;
import com.craftmend.openaudiomc.spigot.OpenAudioMcSpigot;
import com.craftmend.openaudiomc.spigot.modules.players.objects.SpigotConnection;
import com.craftmend.openaudiomc.spigot.modules.regions.objects.RegionProperties;
import com.craftmend.openaudiomc.spigot.modules.regions.objects.TimedRegionProperties;
import com.craftmend.openaudiomc.spigot.modules.regions.registry.WorldRegionManager;
import com.google.gson.Gson;
import org.bukkit.Bukkit;
import org.bukkit.ChatColor;

import java.util.Collection;

public class RegionEditSubCommand extends ParameteredSubCommand {

    private final OpenAudioMcSpigot openAudioMcSpigot;

    public RegionEditSubCommand(OpenAudioMcSpigot openAudioMcSpigot) {
        super("edit");

        registerArguments(
                new Argument("volume <region> <volume>",
                        "Change the volume of a region"),
                new Argument("fade <region> <fade time MS>",
                        "Change the fade of a region")
        );

        this.openAudioMcSpigot = openAudioMcSpigot;
    }

    @Override
    public void onExecute(User<?> sender, String[] args, CommandParameters parameters) {
        // remove the first argument, as its just "edit"
        args = ArrayUtil.removeFirst(args);

        if (args.length == 0) {
            sender.makeExecuteCommand("oa help " + getCommand());
            return;
        }

        String worldName = parameters.getParameterOrDefault("world", sender.getWorld());

        WorldRegionManager worldRegionManager = openAudioMcSpigot.getRegionModule().getWorld(worldName);

        if (args[0].equalsIgnoreCase("volume") && args.length == 3) {
            if (!isInteger(args[2])) {
                message(sender, ChatColor.RED + "The volume must be a number");
                return;
            }

            int volume = Integer.parseInt(args[2]);
            if (volume < 0 || volume > 100) {
                message(sender, ChatColor.RED + "The volume must be between 0 and 100");
                return;
            }

            String targetRegion = args[1].toLowerCase();

            RegionProperties rp = worldRegionManager.getRegionProperties(targetRegion);

            if (rp != null) {
                rp.setVolume(Integer.parseInt(args[2]));
                message(sender, ChatColor.RED + "The volume of " + targetRegion + " has been set to " + args[2]);
                worldRegionManager.registerRegion(rp);
                openAudioMcSpigot.getRegionModule().forceUpdateRegions();
                sendRegionMediaUpdatePacket(rp, worldName);
                saveAsync(rp);
            } else {
                message(sender, ChatColor.RED + "There's no worldguard region by the name " + targetRegion);
            }


            return;
        }

        if (args[0].equalsIgnoreCase("fade") && args.length == 3) {
            if (!isInteger(args[2])) {
                message(sender, ChatColor.RED + "The fade must be a number");
                return;
            }

            Integer fade = Integer.parseInt(args[2]);
            if (fade < 1 || fade > 100000) {
                message(sender, ChatColor.RED + "The fade duration must be at least 100 (ms) and at most 100000 (ms)");
                return;
            }

            String targetRegion = args[1].toLowerCase();

            RegionProperties rp = worldRegionManager.getRegionProperties(targetRegion);
            if (rp != null) {
                rp.setFadeTimeMs(Integer.parseInt(args[2]));
                message(sender, ChatColor.RED + "The fade of " + targetRegion + " has been set to " + args[2]);
                // update the region
                worldRegionManager.registerRegion(rp);
                openAudioMcSpigot.getRegionModule().forceUpdateRegions();
                sendRegionMediaUpdatePacket(rp, worldName);
                saveAsync(rp);
            } else {
                message(sender, ChatColor.RED + "There's no worldguard region by the name " + targetRegion);
            }
            return;
        }

        sender.makeExecuteCommand("oa help " + getCommand());
    }

    private void sendRegionMediaUpdatePacket(RegionProperties rp, String wolrdName) {
        // get region module (already filtered by world)
        Collection<SpigotConnection> connections = OpenAudioMcSpigot.getInstance().getRegionModule().findPlayersInRegion(rp.getRegionName());

        // make update packet for region
        MediaUpdate mediaUpdate = new MediaUpdate(
                100,
                100,
                rp.getFadeTimeMs(),
                rp.getVolume(),
                true,
                rp.getMediaForWorld(wolrdName).getMediaId()
        );

        // send the updated packet
        for (SpigotConnection connection : connections) {
            connection.getClientConnection().sendPacket(new PacketClientUpdateMedia(mediaUpdate));
        }
    }

    public void saveAsync(RegionProperties rp) {
        // ignore temp
        if (rp instanceof TimedRegionProperties) return;

        Bukkit.getScheduler().runTaskAsynchronously(OpenAudioMcSpigot.getInstance(), () -> {
            OpenAudioMc.getService(DatabaseService.class).getRepository(RegionProperties.class).save(rp);
        });
    }
}
