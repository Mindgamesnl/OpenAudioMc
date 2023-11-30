package com.craftmend.openaudiomc.spigot.modules.commands.subcommands.playlist.delegates;

import com.craftmend.openaudiomc.generic.commands.interfaces.SubCommand;
import com.craftmend.openaudiomc.generic.commands.objects.CommandError;
import com.craftmend.openaudiomc.generic.platform.OaColor;
import com.craftmend.openaudiomc.generic.user.User;
import com.craftmend.openaudiomc.spigot.modules.playlists.PlaylistService;
import com.craftmend.openaudiomc.spigot.modules.playlists.models.Playlist;
import com.craftmend.openaudiomc.spigot.modules.playlists.models.PlaylistEntry;
import lombok.SneakyThrows;

import java.util.Collection;
import java.util.Locale;

public class PlaylistViewSubCommand extends SubCommand {

    private PlaylistService playlistService = getService(PlaylistService.class);

    public PlaylistViewSubCommand() {
        super("view");
    }

    @Override
    @SneakyThrows
    public void onExecute(User sender, String[] args) {
        Playlist playlist = playlistService.getPlaylist(args[1].toLowerCase(Locale.ROOT));

        if (playlist == null) {
            throw new CommandError("A playlist with that name does not exist");
        }

        if (playlist.getEntries().isEmpty()) {
            message(sender, "Playlist " + playlist.getName() + " by " + playlist.getCreatedBy() + " is empty");
            return;
        }

        message(sender, "Playlist " + playlist.getName() + " by " + playlist.getCreatedBy() + " has " + playlist.getEntries().size() + " tracks");
        for (PlaylistEntry orderedEntry : playlist.getOrderedEntries()) {
            clickable(sender, OaColor.RED + " - " + OaColor.DARK_RED + orderedEntry.getIndex() + OaColor.AQUA + " " + orderedEntry.getMedia(), "openaudio playlist remove " + playlist.getName() + " " + orderedEntry.getIndex());
        }

        message(sender, "You can click on a track to remove it from the playlist");
    }

    private void clickable(User s, String message, String command) {
        s.sendClickableCommandMessage(message, "Click here to run " + command, command);
    }
}
