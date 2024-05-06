package com.craftmend.openaudiomc.spigot.modules.commands.subcommands.speaker;

import com.craftmend.openaudiomc.OpenAudioMc;
import com.craftmend.openaudiomc.generic.commands.interfaces.SubCommand;
import com.craftmend.openaudiomc.generic.commands.objects.CommandError;
import com.craftmend.openaudiomc.generic.media.MediaService;
import com.craftmend.openaudiomc.generic.media.utils.Validation;
import com.craftmend.openaudiomc.generic.storage.enums.StorageKey;
import com.craftmend.openaudiomc.generic.user.User;
import com.craftmend.openaudiomc.spigot.modules.commands.subcommands.SpeakersSubCommand;
import com.craftmend.openaudiomc.spigot.modules.speakers.utils.SpeakerUtils;
import lombok.SneakyThrows;
import org.bukkit.entity.Player;

public class SpeakerGiveSubCommand extends SubCommand {

    private final SpeakersSubCommand speakersSubCommand;

    public SpeakerGiveSubCommand(SpeakersSubCommand parent) {
        super("give");
        this.speakersSubCommand = parent;
    }

    @Override
    @SneakyThrows
    public void onExecute(User sender, String[] args) {
        if (!(sender.getOriginal() instanceof Player)) {
            message(sender, "Only players can receive a speaker item.");
            return;
        }

        int radius = 10;
        if (args.length == 2 && isInteger(args[1])) {
            radius = Integer.valueOf(args[1]);
        }

        if (radius > StorageKey.SETTINGS_SPEAKER_MAX_RANGE.getInt()) {
            throw new CommandError("The radius is too large. The maximum radius is " + StorageKey.SETTINGS_SPEAKER_MAX_RANGE.getInt());
        }

        if (Validation.isStringInvalid(args[0])) {
            throw new CommandError("Invalid source url.");
        }

        Player player = (Player) sender.getOriginal();
        player.getInventory().addItem(SpeakerUtils.getSkull(OpenAudioMc.getService(MediaService.class).process(args[0]), radius));
        message(sender, "Speaker media created! You've received a Speaker skull in your inventory. Placing it anywhere in the world will add the configured sound in the are.");
    }

}
