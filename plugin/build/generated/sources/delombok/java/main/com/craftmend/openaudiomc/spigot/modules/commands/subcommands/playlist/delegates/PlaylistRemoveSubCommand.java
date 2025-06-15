package com.craftmend.openaudiomc.spigot.modules.commands.subcommands.playlist.delegates;

import com.craftmend.openaudiomc.generic.commands.interfaces.SubCommand;
import com.craftmend.openaudiomc.generic.commands.objects.CommandError;
import com.craftmend.openaudiomc.generic.user.User;
import com.craftmend.openaudiomc.spigot.modules.playlists.PlaylistService;
import com.craftmend.openaudiomc.spigot.modules.playlists.models.Playlist;
import com.craftmend.openaudiomc.spigot.modules.playlists.models.PlaylistEntry;
import java.util.Locale;

public class PlaylistRemoveSubCommand extends SubCommand {
    private PlaylistService playlistService = getService(PlaylistService.class);

    public PlaylistRemoveSubCommand() {
        super("remove");
    }

    @Override
    public void onExecute(User sender, String[] args) {
        try {
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
        } catch (final java.lang.Throwable $ex) {
            throw lombok.Lombok.sneakyThrow($ex);
        }
    }
}
