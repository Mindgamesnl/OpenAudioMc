package com.craftmend.openaudiomc.spigot.modules.commands.subcommands.playlist.delegates;

import com.craftmend.openaudiomc.generic.commands.interfaces.SubCommand;
import com.craftmend.openaudiomc.generic.commands.objects.CommandError;
import com.craftmend.openaudiomc.generic.platform.OaColor;
import com.craftmend.openaudiomc.generic.user.User;
import com.craftmend.openaudiomc.spigot.modules.playlists.PlaylistService;
import com.craftmend.openaudiomc.spigot.modules.playlists.models.Playlist;
import com.craftmend.openaudiomc.spigot.modules.playlists.models.PlaylistEntry;
import lombok.SneakyThrows;

import java.util.Locale;

public class PlaylistAddSubCommand extends SubCommand {

    private PlaylistService playlistService = getService(PlaylistService.class);

    public PlaylistAddSubCommand() {
        super("add");
    }

    @Override
    @SneakyThrows
    public void onExecute(User sender, String[] args) {
        Playlist playlist = playlistService.getPlaylist(args[1].toLowerCase(Locale.ROOT));
        String source = args[2];

        if (playlist == null) {
            throw new CommandError("A playlist with that name does not exist");
        }

        playlist.addEntry(new PlaylistEntry(source));

        getService(PlaylistService.class).saveAll();
        message(sender, "Added " + source + " to playlist " + playlist.getName());
    }
}
