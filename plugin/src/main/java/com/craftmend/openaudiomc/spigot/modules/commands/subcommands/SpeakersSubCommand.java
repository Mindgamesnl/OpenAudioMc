package com.craftmend.openaudiomc.spigot.modules.commands.subcommands;

import com.craftmend.openaudiomc.OpenAudioMc;
import com.craftmend.openaudiomc.generic.commands.interfaces.GenericExecutor;
import com.craftmend.openaudiomc.generic.interfaces.ConfigurationInterface;
import com.craftmend.openaudiomc.generic.storage.enums.StorageKey;
import com.craftmend.openaudiomc.generic.storage.enums.StorageLocation;
import com.craftmend.openaudiomc.spigot.OpenAudioMcSpigot;
import com.craftmend.openaudiomc.generic.commands.interfaces.SubCommand;
import com.craftmend.openaudiomc.generic.commands.objects.Argument;
import com.craftmend.openaudiomc.spigot.modules.players.objects.SpigotConnection;
import com.craftmend.openaudiomc.spigot.modules.speakers.SpeakerModule;
import com.craftmend.openaudiomc.spigot.modules.speakers.objects.MappedLocation;
import com.craftmend.openaudiomc.spigot.modules.speakers.objects.Speaker;
import org.bukkit.Bukkit;
import org.bukkit.command.CommandSender;
import org.bukkit.entity.Player;

import java.util.UUID;

public class SpeakersSubCommand extends SubCommand {

    private OpenAudioMcSpigot openAudioMcSpigot;

    public SpeakersSubCommand(OpenAudioMcSpigot openAudioMcSpigot) {
        super("speaker");
        registerArguments(
                new Argument("<source>",
                        "Gives you a speaker block which you can place anywhere in the world. " +
                                "The speaker will play the sound you entered in the argument"),

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

        if (args.length == 1) {
            if (!(sender.getOriginal() instanceof Player)) {
                message(sender, "Only players can receive a speaker item.");
                return;
            }
            Player player = (Player) sender.getOriginal();
            SpigotConnection spigotConnection = openAudioMcSpigot.getPlayerModule().getClient(((Player) sender.getOriginal()));
            spigotConnection.setSelectedSpeakerSource(args[0]);
            player.getInventory().addItem(OpenAudioMcSpigot.getInstance().getSpeakerModule().getSkull());
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

            String source = args[5];

            // create
            UUID id = UUID.randomUUID();
            ConfigurationInterface config = OpenAudioMc.getInstance().getConfigurationInterface();
            int range = config.getInt(StorageKey.SETTINGS_SPEAKER_RANGE);
            SpeakerModule speakerModule = OpenAudioMcSpigot.getInstance().getSpeakerModule();
            speakerModule.registerSpeaker(mappedLocation, source, id, range);

            // save
            config.setString(StorageLocation.DATA_FILE, "speakers." + id.toString() + ".world", mappedLocation.getWorld());
            config.setInt(StorageLocation.DATA_FILE, "speakers." + id.toString() + ".x", mappedLocation.getX());
            config.setInt(StorageLocation.DATA_FILE, "speakers." + id.toString() + ".y", mappedLocation.getY());
            config.setInt(StorageLocation.DATA_FILE, "speakers." + id.toString() + ".z", mappedLocation.getZ());
            config.setInt(StorageLocation.DATA_FILE, "speakers." + id.toString() + ".radius", range);
            config.setString(StorageLocation.DATA_FILE, "speakers." + id.toString() + ".media", source);

            message(sender, "Speaker registered");
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
            ConfigurationInterface config = OpenAudioMc.getInstance().getConfigurationInterface();
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
