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
import com.craftmend.openaudiomc.spigot.modules.speakers.objects.MappedLocation;
import com.craftmend.openaudiomc.spigot.modules.speakers.objects.Speaker;
import com.craftmend.openaudiomc.spigot.modules.speakers.utils.SpeakerUtils;
import com.craftmend.openaudiomc.spigot.services.server.ServerService;
import com.craftmend.openaudiomc.spigot.services.server.enums.ServerVersion;
import org.bukkit.ChatColor;
import org.bukkit.Location;
import org.bukkit.Material;
import org.bukkit.SkullType;
import org.bukkit.block.Block;
import org.bukkit.block.Skull;

import java.lang.reflect.InvocationTargetException;
import java.util.HashSet;
import java.util.UUID;

public class SpeakerRemoveSubCommand extends SubCommand {

    private final SpeakersSubCommand speakersSubCommand;

    public SpeakerRemoveSubCommand(SpeakersSubCommand parent) {
        super("remove");
        this.speakersSubCommand = parent;
    }

    @Override
    public void onExecute(User sender, String[] args) {
        MappedLocation mappedLocation = speakersSubCommand.locationFromArguments(args);
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

        // save
        OpenAudioMc.getService(DatabaseService.class)
                .getRepository(Speaker.class)
                .delete(speaker.getId().toString());

        message(sender, "Removed speaker");
        mappedLocation.toBukkit().getBlock().setType(Material.AIR);
    }

}
