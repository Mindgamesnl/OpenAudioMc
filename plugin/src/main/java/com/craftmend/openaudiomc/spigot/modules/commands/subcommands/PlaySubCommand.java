package com.craftmend.openaudiomc.spigot.modules.commands.subcommands;

import com.craftmend.openaudiomc.OpenAudioMc;
import com.craftmend.openaudiomc.generic.commands.interfaces.GenericExecutor;
import com.craftmend.openaudiomc.generic.media.objects.OptionalError;
import com.craftmend.openaudiomc.spigot.OpenAudioMcSpigot;
import com.craftmend.openaudiomc.generic.commands.interfaces.SubCommand;
import com.craftmend.openaudiomc.generic.commands.objects.Argument;
import com.craftmend.openaudiomc.generic.media.objects.Media;
import com.craftmend.openaudiomc.generic.media.objects.MediaOptions;
import com.craftmend.openaudiomc.spigot.modules.players.objects.SpigotConnection;
import com.craftmend.openaudiomc.spigot.modules.players.objects.SpigotPlayerSelector;
import org.bukkit.Bukkit;
import org.bukkit.ChatColor;
import org.bukkit.command.CommandSender;
import org.bukkit.entity.Player;

public class PlaySubCommand extends SubCommand {

    private final OpenAudioMcSpigot openAudioMcSpigot;

    public PlaySubCommand(OpenAudioMcSpigot openAudioMcSpigot) {
        super("play");
        registerArguments(
                new Argument("<selector> <source>",
                        "Plays a sound for all the players in a selection"),
                new Argument("<selector> <source> <options>",
                        "Plays a sound with configuration (like fade time, sync etc) for all players in a selection")
        );
        this.openAudioMcSpigot = openAudioMcSpigot;
    }

    @Override
    public void onExecute(GenericExecutor sender, String[] args) {
        if (args.length == 0) {
            Bukkit.getServer().dispatchCommand((CommandSender) sender.getOriginal(), "oa help " + getCommand());
            return;
        }

        if (args.length == 2) {
            Media media = new Media(args[1]);
            int affected = 0;
            for (Player player : new SpigotPlayerSelector(args[0]).getPlayers((CommandSender) sender.getOriginal())) {
                SpigotConnection spigotConnection = openAudioMcSpigot.getPlayerModule().getClient(player);
                if (spigotConnection.getClientConnection().isConnected()) affected++;
                spigotConnection.getClientConnection().sendMedia(media);
            }
            message(sender, ChatColor.GREEN + "Media created and requested to be played for " + affected + " clients");
            return;
        }

        if (args.length == 3) {
            try {
                MediaOptions mediaOptions = OpenAudioMc.getGson().fromJson(args[2], MediaOptions.class);

                OptionalError parsingError = mediaOptions.validate();
                if (parsingError.isError()) {
                    message(sender, ChatColor.RED + "Error! " + parsingError.getMessage());
                    return;
                }

                Media media = new Media(args[1]).applySettings(mediaOptions);
                for (Player player : new SpigotPlayerSelector(args[0]).getPlayers((CommandSender) sender.getOriginal())) {
                    SpigotConnection spigotConnection = openAudioMcSpigot.getPlayerModule().getClient(player);
                    spigotConnection.getClientConnection().sendMedia(media);
                }
                message(sender, ChatColor.GREEN + "Media (with arguments) created and requested to be played.");
            } catch (Exception e) {
                message(sender, "Error. Invalid options. Please refer to the command guide.");
            }
            return;
        }
        Bukkit.getServer().dispatchCommand((CommandSender) sender.getOriginal(), "oa help " + getCommand());
    }
}
