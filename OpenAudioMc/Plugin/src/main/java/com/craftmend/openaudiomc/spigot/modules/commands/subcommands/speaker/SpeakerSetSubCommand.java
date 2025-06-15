package com.craftmend.openaudiomc.spigot.modules.commands.subcommands.speaker;

import com.craftmend.openaudiomc.OpenAudioMc;
import com.craftmend.openaudiomc.generic.commands.interfaces.SubCommand;
import com.craftmend.openaudiomc.generic.database.DatabaseService;
import com.craftmend.openaudiomc.generic.media.MediaService;
import com.craftmend.openaudiomc.generic.storage.enums.StorageKey;
import com.craftmend.openaudiomc.generic.storage.interfaces.Configuration;
import com.craftmend.openaudiomc.generic.user.User;
import com.craftmend.openaudiomc.spigot.modules.commands.subcommands.SpeakersSubCommand;
import com.craftmend.openaudiomc.spigot.modules.speakers.SpeakerService;
import com.craftmend.openaudiomc.api.speakers.ExtraSpeakerOptions;
import com.craftmend.openaudiomc.spigot.modules.speakers.objects.MappedLocation;
import com.craftmend.openaudiomc.spigot.modules.speakers.objects.Speaker;
import com.craftmend.openaudiomc.spigot.modules.speakers.utils.SpeakerUtils;
import com.craftmend.openaudiomc.spigot.services.server.ServerService;
import com.craftmend.openaudiomc.spigot.services.server.enums.ServerVersion;
import org.bukkit.ChatColor;
import org.bukkit.Location;
import org.bukkit.SkullType;
import org.bukkit.block.Block;
import org.bukkit.block.Skull;

import java.lang.reflect.InvocationTargetException;
import java.util.EnumSet;
import java.util.UUID;

public class SpeakerSetSubCommand extends SubCommand {

    private final SpeakersSubCommand speakersSubCommand;

    public SpeakerSetSubCommand(SpeakersSubCommand parent) {
        super("set");
        this.speakersSubCommand = parent;
    }

    @Override
    public void onExecute(User sender, String[] args) {
        MappedLocation mappedLocation = this.speakersSubCommand.locationFromArguments(args);
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
        Speaker speaker = new Speaker(source, id, range, mappedLocation, SpeakerService.DEFAULT_SPEAKER_TYPE, EnumSet.noneOf(ExtraSpeakerOptions.class));
        speakerService.registerSpeaker(speaker);
        // save
        OpenAudioMc.getService(DatabaseService.class)
                .getRepository(Speaker.class)
                .save(speaker);

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

}
