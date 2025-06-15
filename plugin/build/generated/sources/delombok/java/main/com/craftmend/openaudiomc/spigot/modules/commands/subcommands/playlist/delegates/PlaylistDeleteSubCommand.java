package com.craftmend.openaudiomc.spigot.modules.commands.subcommands.playlist.delegates;

import com.craftmend.openaudiomc.generic.commands.interfaces.SubCommand;
import com.craftmend.openaudiomc.generic.commands.objects.CommandError;
import com.craftmend.openaudiomc.generic.user.User;
import com.craftmend.openaudiomc.spigot.modules.playlists.PlaylistService;
import java.util.Locale;

public class PlaylistDeleteSubCommand extends SubCommand {
    private PlaylistService playlistService = getService(PlaylistService.class);

    public PlaylistDeleteSubCommand() {
        super("delete");
    }

    @Override
    public void onExecute(User sender, String[] args) {
        try {
            String name = args[1].toLowerCase(Locale.ROOT);
            if (playlistService.getPlaylist(name) == null) {
                throw new CommandError("A playlist with that name does not exist");
            }
            playlistService.deletePlaylist(name);
            getService(PlaylistService.class).saveAll();
            message(sender, "Deleted the playlist with the name " + name);
        } catch (final java.lang.Throwable $ex) {
            throw lombok.Lombok.sneakyThrow($ex);
        }
    }
}
