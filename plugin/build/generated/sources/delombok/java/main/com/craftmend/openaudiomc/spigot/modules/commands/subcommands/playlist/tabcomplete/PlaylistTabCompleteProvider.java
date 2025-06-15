package com.craftmend.openaudiomc.spigot.modules.commands.subcommands.playlist.tabcomplete;

import com.craftmend.openaudiomc.OpenAudioMc;
import com.craftmend.openaudiomc.generic.commands.interfaces.TabCompleteProvider;
import com.craftmend.openaudiomc.generic.environment.MagicValue;
import com.craftmend.openaudiomc.generic.media.MediaService;
import com.craftmend.openaudiomc.generic.user.User;
import com.craftmend.openaudiomc.spigot.modules.playlists.PlaylistService;
import com.craftmend.openaudiomc.spigot.modules.playlists.models.Playlist;
import com.craftmend.openaudiomc.spigot.modules.shortner.AliasService;

import java.util.ArrayList;
import java.util.LinkedList;
import java.util.List;

public class PlaylistTabCompleteProvider implements TabCompleteProvider {

    @Override
    public String[] getOptions(User sender) {
        List<String> options = new ArrayList<>();

        // this might be false if we're not running on spigot
        PlaylistService playlistService = OpenAudioMc.getService(PlaylistService.class);
        for (Playlist s : playlistService.getAll()) {
            options.add(s.getName());
        }


        // did we find anything?
        if (options.isEmpty()) {
            sender.sendMessage(MagicValue.COMMAND_PREFIX.get(String.class) + "Couldn't tab-complete playlists, because there are no playlists available.");
        }

        return options.toArray(new String[0]);
    }

}
