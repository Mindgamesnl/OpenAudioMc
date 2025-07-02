package com.craftmend.openaudiomc.spigot.modules.commands.subcommands.playlist.delegates;

import com.craftmend.openaudiomc.generic.commands.interfaces.SubCommand;
import com.craftmend.openaudiomc.generic.commands.objects.CommandError;
import com.craftmend.openaudiomc.api.user.User;
import com.craftmend.openaudiomc.spigot.modules.playlists.PlaylistService;
import com.craftmend.openaudiomc.spigot.modules.playlists.models.Playlist;
import lombok.SneakyThrows;

import java.util.Locale;

public class PlaylistRemoveSubCommand extends SubCommand {

    private PlaylistService playlistService = getService(PlaylistService.class);

    public PlaylistRemoveSubCommand() {
        super("remove");
    }

    @Override
    @SneakyThrows
    public void onExecute(User sender, String[] args) {
        Playlist playlist = playlistService.getPlaylist(args[1].toLowerCase(Locale.ROOT));
        Integer index = catchInt(args[2]);

        if (playlist == null) {
            throw new CommandError("A playlist with that name does not exist");
        }

        boolean removed = playlist.removeEntryAt(index);
        if (!removed) {
            throw new CommandError("There is no track at that index");
        }
        getService(PlaylistService.class).saveAll();
        message(sender, "Removed track at index " + index + " from playlist " + playlist.getName());
    }
}
