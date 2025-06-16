package com.craftmend.openaudiomc.spigot.modules.commands.subcommands.playlist.delegates;

import com.craftmend.openaudiomc.generic.commands.interfaces.SubCommand;
import com.craftmend.openaudiomc.generic.commands.objects.CommandError;
import com.craftmend.openaudiomc.api.user.User;
import com.craftmend.openaudiomc.spigot.modules.playlists.PlaylistService;
import com.craftmend.openaudiomc.spigot.modules.playlists.models.Playlist;
import lombok.SneakyThrows;

import java.util.Collection;

public class PlaylistListCommand extends SubCommand {

    private PlaylistService playlistService = getService(PlaylistService.class);

    public PlaylistListCommand() {
        super("list");
    }

    @Override
    @SneakyThrows
    public void onExecute(User sender, String[] args) {
        Collection<Playlist> playlists = playlistService.getAll();

        if (playlists.isEmpty()) {
            throw new CommandError("There are no playlists");
        }

        message(sender, "There are " + playlists.size() + " playlists");
        for (Playlist playlist : playlists) {
            message(sender, " - " + playlist.getName() + " by " + playlist.getCreatedBy());
        }
    }
}
