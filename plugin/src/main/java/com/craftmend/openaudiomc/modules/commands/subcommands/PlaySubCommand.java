package com.craftmend.openaudiomc.modules.commands.subcommands;

import com.craftmend.openaudiomc.OpenAudioMc;
import com.craftmend.openaudiomc.modules.commands.interfaces.SubCommand;
import com.craftmend.openaudiomc.modules.media.objects.Media;
import com.craftmend.openaudiomc.modules.media.objects.MediaOptions;
import com.craftmend.openaudiomc.modules.players.objects.Client;
import com.craftmend.openaudiomc.modules.players.objects.PlayerSelector;
import com.google.gson.Gson;
import org.bukkit.command.CommandSender;
import org.bukkit.entity.Player;

import java.util.concurrent.ExecutionException;

public class PlaySubCommand extends SubCommand {

    private OpenAudioMc openAudioMc;

    public PlaySubCommand(OpenAudioMc openAudioMc) {
        super("play");
        this.openAudioMc = openAudioMc;
    }

    @Override
    public void onExecute(CommandSender sender, String[] args) {
        if (args.length == 0) {
            message(sender, "Invalid command.");
            return;
        }

        if (args.length == 2) {
            //username + source
            Media media = new Media(args[1]);
            for (Player player : new PlayerSelector(args[0]).getPlayers(sender)) {
                Client client = openAudioMc.getPlayerModule().getClient(player);
                if (client.getIsConnected()) client.sendMedia(media);
            }
            message(sender, "Media created.");
            return;
        }

        if (args.length == 3) {
            //username + source + options
            try {
                MediaOptions mediaOptions = new Gson().fromJson(args[2], MediaOptions.class);
                Media media = new Media(args[1]).applySettings(mediaOptions);
                for (Player player : new PlayerSelector(args[0]).getPlayers(sender)) {
                    Client client = openAudioMc.getPlayerModule().getClient(player);
                    if (client.getIsConnected()) client.sendMedia(media);
                }
                message(sender, "Media and options created.");
            } catch (Exception e) {
                message(sender, "Error. Invalid options. Please refer to the command guide.");
            }
            return;
        }
        message(sender, "Could not create media. Invalid command");
    }
}
