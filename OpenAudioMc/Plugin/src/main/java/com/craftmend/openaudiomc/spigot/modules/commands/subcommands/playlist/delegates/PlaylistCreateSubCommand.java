package com.craftmend.openaudiomc.spigot.modules.commands.subcommands.playlist.delegates;

import com.craftmend.openaudiomc.generic.commands.interfaces.SubCommand;
import com.craftmend.openaudiomc.generic.commands.objects.CommandError;
import com.craftmend.openaudiomc.api.user.User;
import com.craftmend.openaudiomc.spigot.modules.playlists.PlaylistService;
import lombok.SneakyThrows;

import java.util.Locale;

public class PlaylistCreateSubCommand extends SubCommand {

    private PlaylistService playlistService = getService(PlaylistService.class);

    public PlaylistCreateSubCommand() {
        super("create");
    }

    @Override
    @SneakyThrows
    public void onExecute(User sender, String[] args) {
        String name = args[1].toLowerCase(Locale.ROOT);
        if (playlistService.getPlaylist(name) != null) {
            throw new CommandError("A playlist with that name already exists");
        }

        playlistService.createPlaylist(name, sender.getName());
        getService(PlaylistService.class).saveAll();
        message(sender, "Created a new playlist with the name " + name);
    }
}
