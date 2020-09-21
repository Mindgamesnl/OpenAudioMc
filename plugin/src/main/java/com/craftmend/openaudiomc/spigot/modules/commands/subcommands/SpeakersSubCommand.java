package com.craftmend.openaudiomc.spigot.modules.commands.subcommands;

import com.craftmend.openaudiomc.OpenAudioMc;
import com.craftmend.openaudiomc.generic.commands.interfaces.GenericExecutor;
import com.craftmend.openaudiomc.generic.storage.interfaces.ConfigurationImplementation;
import com.craftmend.openaudiomc.generic.storage.enums.StorageKey;
import com.craftmend.openaudiomc.generic.storage.enums.StorageLocation;
import com.craftmend.openaudiomc.spigot.OpenAudioMcSpigot;
import com.craftmend.openaudiomc.generic.commands.interfaces.SubCommand;
import com.craftmend.openaudiomc.generic.commands.objects.Argument;
import com.craftmend.openaudiomc.spigot.modules.players.objects.SpigotConnection;
import com.craftmend.openaudiomc.spigot.modules.speakers.SpeakerModule;
import com.craftmend.openaudiomc.spigot.modules.speakers.enums.SpeakerType;
import com.craftmend.openaudiomc.spigot.modules.speakers.objects.MappedLocation;
import com.craftmend.openaudiomc.spigot.modules.speakers.objects.Speaker;
import com.craftmend.openaudiomc.spigot.modules.speakers.objects.SpeakerSettings;
import com.craftmend.openaudiomc.spigot.modules.speakers.utils.SpeakerUtils;
import com.craftmend.openaudiomc.spigot.services.server.enums.ServerVersion;
import org.bukkit.*;
import org.bukkit.block.Block;
import org.bukkit.block.Skull;
import org.bukkit.command.CommandSender;
import org.bukkit.entity.Player;

import java.lang.reflect.InvocationTargetException;
import java.util.UUID;

public class SpeakersSubCommand extends SubCommand {

    private OpenAudioMcSpigot openAudioMcSpigot;

    public SpeakersSubCommand(OpenAudioMcSpigot openAudioMcSpigot) {
        super("speaker");
        registerArguments(
                new Argument("<source> [radius]",
                        "Gives you a speaker block which you can place anywhere in the world. " +
                                "The speaker will play the sound you entered in the argument. Optional radius as number."),

                new Argument("set <world> <x> <y> <z> <url>",
                        "Force place a speaker on a location, no interactions required"),
                new Argument("remove <world> <x> <y> <z>",
                        "Delete a speaker on a location")
        );
        this.openAudioMcSpigot = openAudioMcSpigot;
    }

    @Override
    public void onExecute(GenericExecutor sender, String[] args) {
        if (args.length == 0) {
            Bukkit.getServer().dispatchCommand((CommandSender) sender.getOriginal(), "oa help " + getCommand());
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
            SpigotConnection spigotConnection = openAudioMcSpigot.getPlayerModule().getClient(((Player) sender.getOriginal()));
            spigotConnection.setSelectedSpeakerSettings(
                    new SpeakerSettings(
                            OpenAudioMc.getInstance().getMediaModule().process(args[0]),
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

            String source = OpenAudioMc.getInstance().getMediaModule().process(args[5]);

            // create
            UUID id = UUID.randomUUID();
            ConfigurationImplementation config = OpenAudioMc.getInstance().getConfiguration();
            int range = config.getInt(StorageKey.SETTINGS_SPEAKER_RANGE);
            SpeakerModule speakerModule = OpenAudioMcSpigot.getInstance().getSpeakerModule();
            speakerModule.registerSpeaker(mappedLocation, source, id, range, SpeakerModule.DEFAULT_SPEAKER_TYPE);

            // save
            config.setString(StorageLocation.DATA_FILE, "speakers." + id.toString() + ".world", mappedLocation.getWorld());
            config.setInt(StorageLocation.DATA_FILE, "speakers." + id.toString() + ".x", mappedLocation.getX());
            config.setInt(StorageLocation.DATA_FILE, "speakers." + id.toString() + ".y", mappedLocation.getY());
            config.setInt(StorageLocation.DATA_FILE, "speakers." + id.toString() + ".z", mappedLocation.getZ());
            config.setInt(StorageLocation.DATA_FILE, "speakers." + id.toString() + ".radius", range);
            config.setString(StorageLocation.DATA_FILE, "speakers." + id.toString() + ".media", source);
            config.setString(StorageLocation.DATA_FILE, "speakers." + id.toString() + ".type", SpeakerType.SPEAKER_2D.toString());

            // place block
            Location location = mappedLocation.toBukkit();
            location.getBlock().setType(openAudioMcSpigot.getSpeakerModule().getPlayerSkullBlock());

            Skull s = (Skull) location.getBlock().getState();
            s.setSkullType(SkullType.PLAYER);

            if (OpenAudioMcSpigot.getInstance().getServerService().getVersion() == ServerVersion.LEGACY) {
                // reflection for the old map
                try {
                    Block.class.getMethod("setData", byte.class).invoke(location.getBlock(), (byte) 1);
                } catch (IllegalAccessException | NoSuchMethodException | InvocationTargetException e) {
                    message(sender, "Something went wrong with reflection");
                    e.printStackTrace();
                    return;
                }
            } else {
                location.getBlock().setBlockData(openAudioMcSpigot.getSpeakerModule().getPlayerSkullBlock().createBlockData());
            }

            s.setOwner("OpenAudioMc");
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
            ConfigurationImplementation config = OpenAudioMc.getInstance().getConfiguration();
            SpeakerModule speakerModule = OpenAudioMcSpigot.getInstance().getSpeakerModule();
            Speaker speaker = speakerModule.getSpeaker(mappedLocation);
            speakerModule.unlistSpeaker(mappedLocation);

            // remove from file
            config.setString(StorageLocation.CONFIG_FILE,"speakers." + speaker.getId().toString() + ".world", null);
            config.setString(StorageLocation.CONFIG_FILE,"speakers." + speaker.getId().toString() + ".x", null);
            config.setString(StorageLocation.CONFIG_FILE,"speakers." + speaker.getId().toString() + ".y", null);
            config.setString(StorageLocation.CONFIG_FILE,"speakers." + speaker.getId().toString() + ".z", null);
            config.setString(StorageLocation.CONFIG_FILE,"speakers." + speaker.getId().toString() + ".media", null);
            config.setString(StorageLocation.CONFIG_FILE,"speakers." + speaker.getId().toString(), null);

            message(sender, "Removed speaker");
            mappedLocation.toBukkit().getBlock().setType(Material.AIR);
            return;
        }

        Bukkit.getServer().dispatchCommand((CommandSender) sender.getOriginal(), "oa help " + getCommand());
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
