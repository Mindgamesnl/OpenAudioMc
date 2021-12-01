package com.craftmend.openaudiomc.spigot.modules.commands.subcommands.speaker;

import com.craftmend.openaudiomc.OpenAudioMc;
import com.craftmend.openaudiomc.generic.commands.interfaces.SubCommand;
import com.craftmend.openaudiomc.generic.database.DatabaseService;
import com.craftmend.openaudiomc.generic.media.MediaService;
import com.craftmend.openaudiomc.generic.storage.interfaces.Configuration;
import com.craftmend.openaudiomc.generic.user.User;
import com.craftmend.openaudiomc.spigot.modules.commands.subcommands.SpeakersSubCommand;
import com.craftmend.openaudiomc.spigot.modules.players.SpigotPlayerService;
import com.craftmend.openaudiomc.spigot.modules.players.objects.SpigotConnection;
import com.craftmend.openaudiomc.spigot.modules.speakers.SpeakerService;
import com.craftmend.openaudiomc.spigot.modules.speakers.objects.MappedLocation;
import com.craftmend.openaudiomc.spigot.modules.speakers.objects.Speaker;
import com.craftmend.openaudiomc.spigot.modules.speakers.objects.SpeakerSettings;
import com.craftmend.openaudiomc.spigot.modules.speakers.utils.SpeakerUtils;
import org.bukkit.Material;
import org.bukkit.entity.Player;

public class SpeakerGiveSubCommand extends SubCommand {

    private SpeakersSubCommand speakersSubCommand;

    public SpeakerGiveSubCommand(SpeakersSubCommand parent) {
        super("give");
        this.speakersSubCommand = parent;
    }

    @Override
    public void onExecute(User sender, String[] args) {
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
    }

}
