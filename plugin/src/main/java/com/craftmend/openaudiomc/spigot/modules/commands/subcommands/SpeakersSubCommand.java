package com.craftmend.openaudiomc.spigot.modules.commands.subcommands;

import com.craftmend.openaudiomc.OpenAudioMc;

import com.craftmend.openaudiomc.generic.database.DatabaseService;
import com.craftmend.openaudiomc.generic.media.MediaService;
import com.craftmend.openaudiomc.generic.user.User;
import com.craftmend.openaudiomc.generic.storage.interfaces.Configuration;
import com.craftmend.openaudiomc.generic.storage.enums.StorageKey;
import com.craftmend.openaudiomc.generic.storage.enums.StorageLocation;
import com.craftmend.openaudiomc.spigot.OpenAudioMcSpigot;
import com.craftmend.openaudiomc.generic.commands.interfaces.SubCommand;
import com.craftmend.openaudiomc.generic.commands.objects.Argument;
import com.craftmend.openaudiomc.spigot.modules.players.SpigotPlayerService;
import com.craftmend.openaudiomc.spigot.modules.players.objects.SpigotConnection;
import com.craftmend.openaudiomc.spigot.modules.speakers.SpeakerService;
import com.craftmend.openaudiomc.spigot.modules.speakers.enums.SpeakerType;
import com.craftmend.openaudiomc.spigot.modules.speakers.menu.NearbySpeakersMenu;
import com.craftmend.openaudiomc.spigot.modules.speakers.objects.MappedLocation;
import com.craftmend.openaudiomc.spigot.modules.speakers.objects.Speaker;
import com.craftmend.openaudiomc.spigot.modules.speakers.objects.SpeakerSettings;
import com.craftmend.openaudiomc.spigot.modules.speakers.tasks.SpeakerGarbageCollection;
import com.craftmend.openaudiomc.spigot.modules.speakers.utils.SpeakerUtils;
import com.craftmend.openaudiomc.spigot.services.server.ServerService;
import com.craftmend.openaudiomc.spigot.services.server.enums.ServerVersion;
import org.bukkit.*;
import org.bukkit.block.Block;
import org.bukkit.block.Skull;
import org.bukkit.entity.Player;

import java.lang.reflect.InvocationTargetException;
import java.util.HashSet;
import java.util.UUID;

public class SpeakersSubCommand extends SubCommand {

    private final OpenAudioMcSpigot openAudioMcSpigot;

    public SpeakersSubCommand(OpenAudioMcSpigot openAudioMcSpigot) {
        super("speaker");
        registerArguments(
                new Argument("menu",
                        "Opens a GUI with nearby speakers, allowing you to teleport and update them easily."),

                new Argument("<source> [radius]",
                        "Gives you a speaker block which you can place anywhere in the world. " +
                                "The speaker will play the sound you entered in the argument. Optional radius as number."),

                new Argument("set <world> <x> <y> <z> <url>",
                        "Force place a speaker on a location, no interactions required"),

                new Argument("remove <world> <x> <y> <z>",
                        "Delete a speaker on a location"),

                new Argument("gc", "Forcefully run a full garbage collection sweep.")
        );
        this.openAudioMcSpigot = openAudioMcSpigot;
    }

    @Override
    public void onExecute(User sender, String[] args) {
        if (args.length == 0) {
            sender.makeExecuteCommand("oa help " + getCommand());
            return;
        }

        if (args[0].equalsIgnoreCase("menu") || args[0].equalsIgnoreCase("gui")) {
            Player player = (Player) sender.getOriginal();
            new NearbySpeakersMenu(player);
            return;
        }

        if (args[0].equalsIgnoreCase("gc")) {
            message(sender, "Starting garbage collector...");
            SpeakerGarbageCollection sgc = new SpeakerGarbageCollection();
            // run the wrapper twice to force a cache refresh at the end
            sgc.run();
            sgc.run();
            message(sender, "Full garbage collection sweep finished");
            return;
        }

        if (args.length == 1 || args.length == 2) {
            if (!(sender.getOriginal() instanceof Player)) {
                message(sender, "Only players can receive a speaker item.");
                return;
            }

            int radius = 10;
            if (args.length == 2 && isInteger(args[1])) {
                radius = Integer.valueOf(args[1]);
            }

            Player player = (Player) sender.getOriginal();
            SpigotConnection spigotConnection = OpenAudioMc.getService(SpigotPlayerService.class).getClient(((Player) sender.getOriginal()));
            spigotConnection.setSelectedSpeakerSettings(
                    new SpeakerSettings(
                            OpenAudioMc.getService(MediaService.class).process(args[0]),
                            radius
                    )
            );
            player.getInventory().addItem(SpeakerUtils.getSkull());
            message(sender, "Speaker media created! You've received a Speaker skull in your inventory. Placing it anywhere in the world will add the configured sound in the are.");
            return;
        }

        if (args[0].equalsIgnoreCase("set") && args.length == 6) {
            MappedLocation mappedLocation = locationFromArguments(args);
            if (mappedLocation == null) {
                // failed to parse location
                message(sender, "Invalid location (xyz) or world");
                return;
            }

            String source = OpenAudioMc.getService(MediaService.class).process(args[5]);

            // create
            UUID id = UUID.randomUUID();
            Configuration config = OpenAudioMc.getInstance().getConfiguration();
            int range = config.getInt(StorageKey.SETTINGS_SPEAKER_RANGE);

            SpeakerService speakerService = OpenAudioMc.getService(SpeakerService.class);

            // register
            Speaker speaker = new Speaker(source, id, range, mappedLocation, SpeakerService.DEFAULT_SPEAKER_TYPE, new HashSet<>());
            speakerService.registerSpeaker(speaker);
            // save
            OpenAudioMc.getService(DatabaseService.class)
                    .getTable(Speaker.class)
                    .save(speaker.getId().toString(), speaker);

            // place block
            Location location = mappedLocation.toBukkit();
            location.getBlock().setType(OpenAudioMc.getService(SpeakerService.class).getPlayerSkullBlock());

            Skull s = (Skull) location.getBlock().getState();

            if (OpenAudioMc.getService(ServerService.class).getVersion() == ServerVersion.LEGACY) {
                s.setSkullType(SkullType.PLAYER);
                // reflection for the old map
                try {
                    Block.class.getMethod("setData", byte.class).invoke(location.getBlock(), (byte) 1);
                } catch (IllegalAccessException | NoSuchMethodException | InvocationTargetException e) {
                    message(sender, "Something went wrong with reflection");
                    e.printStackTrace();
                    return;
                }

            } else {
                location.getBlock().setBlockData(OpenAudioMc.getService(SpeakerService.class).getPlayerSkullBlock().createBlockData());
            }
            s.setOwner(SpeakerUtils.speakerSkin);
            s.update();

            message(sender, ChatColor.GREEN + "Speaker placed");
            return;
        }

        if (args[0].equalsIgnoreCase("remove") && args.length == 5) {
            MappedLocation mappedLocation = locationFromArguments(args);
            if (mappedLocation == null) {
                // failed to parse location
                message(sender, "Invalid location (xyz) or world");
                return;
            }

            // remove from cache
            Configuration config = OpenAudioMc.getInstance().getConfiguration();
            SpeakerService speakerService = OpenAudioMc.getService(SpeakerService.class);
            Speaker speaker = speakerService.getSpeaker(mappedLocation);
            speakerService.unlistSpeaker(mappedLocation);

            // remove from file
            speakerService.registerSpeaker(speaker);
            // save
            OpenAudioMc.getService(DatabaseService.class)
                    .getTable(Speaker.class)
                    .delete(speaker.getId().toString());

            message(sender, "Removed speaker");
            mappedLocation.toBukkit().getBlock().setType(Material.AIR);
            return;
        }

        sender.makeExecuteCommand("oa help " + getCommand());
    }

    private MappedLocation locationFromArguments(String[] args) {
        try {
            MappedLocation mappedLocation = new MappedLocation(
                    Integer.parseInt(args[2]), // x
                    Integer.parseInt(args[3]), // y
                    Integer.parseInt(args[4]), // z
                    args[1]                    // world
            );

            // try to parse it as bukkit
            mappedLocation.toBukkit();
            return mappedLocation;
        } catch (Exception e) {
            // failed to parse location
            return null;
        }
    }

}
