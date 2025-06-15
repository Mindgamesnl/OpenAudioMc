package com.craftmend.openaudiomc.spigot.modules.commands.subcommands;

import com.craftmend.openaudiomc.OpenAudioMc;

import com.craftmend.openaudiomc.generic.media.MediaService;
import com.craftmend.openaudiomc.generic.media.tabcomplete.MediaTabcompleteProvider;
import com.craftmend.openaudiomc.generic.user.User;
import com.craftmend.openaudiomc.spigot.OpenAudioMcSpigot;
import com.craftmend.openaudiomc.generic.commands.interfaces.SubCommand;
import com.craftmend.openaudiomc.generic.commands.objects.Argument;
import com.craftmend.openaudiomc.spigot.modules.commands.subcommands.speaker.SpeakerGcSubCommand;
import com.craftmend.openaudiomc.spigot.modules.commands.subcommands.speaker.SpeakerGiveSubCommand;
import com.craftmend.openaudiomc.spigot.modules.commands.subcommands.speaker.SpeakerRemoveSubCommand;
import com.craftmend.openaudiomc.spigot.modules.commands.subcommands.speaker.SpeakerSetSubCommand;
import com.craftmend.openaudiomc.spigot.modules.players.SpigotPlayerService;
import com.craftmend.openaudiomc.spigot.modules.players.objects.SpigotConnection;
import com.craftmend.openaudiomc.spigot.modules.speakers.menu.NearbySpeakersMenu;
import com.craftmend.openaudiomc.spigot.modules.speakers.objects.MappedLocation;
import com.craftmend.openaudiomc.spigot.modules.speakers.objects.SpeakerSettings;
import com.craftmend.openaudiomc.spigot.modules.speakers.tasks.SpeakerGarbageCollection;
import com.craftmend.openaudiomc.spigot.modules.speakers.utils.SpeakerUtils;
import org.bukkit.entity.Player;

public class SpeakersSubCommand extends SubCommand {

    public SpeakersSubCommand(OpenAudioMcSpigot openAudioMcSpigot) {
        super("speaker");

        registerSubCommands(
                new SpeakerSetSubCommand(this),
                new SpeakerRemoveSubCommand(this),
                new SpeakerGiveSubCommand(this),
                new SpeakerGcSubCommand(this)

        );

        registerArguments(
                new Argument("menu",
                        "Opens a GUI with nearby speakers, allowing you to teleport and update them easily."),

                new Argument("<source> [radius]",
                        "Gives you a speaker block which you can place anywhere in the world. " +
                                "The speaker will play the sound you entered in the argument. Optional radius as number.")
                        .addTabCompleteProvider(0, MediaTabcompleteProvider.getInstance()),

                new Argument("set <world> <x> <y> <z> <url>",
                        "Force place a speaker on a location, no interactions required")
                        .addTabCompleteProvider(5, MediaTabcompleteProvider.getInstance()),

                new Argument("remove <world> <x> <y> <z>",
                        "Delete a speaker on a location"),

                new Argument("gc", "Forcefully run a full garbage collection sweep.")
        );
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
            delegateTo("gc", sender, args);
            return;
        }

        if (args.length == 1 || args.length == 2) {
            delegateTo("give", sender, args);
            return;
        }

        if (args[0].equalsIgnoreCase("set") && args.length == 6) {
            delegateTo("set", sender, args);
            return;
        }

        if (args[0].equalsIgnoreCase("remove") && args.length == 5) {
            delegateTo("remove", sender, args);
            return;
        }

        sender.makeExecuteCommand("oa help " + getCommand());
    }

    public MappedLocation locationFromArguments(String[] args) {
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
