package com.craftmend.openaudiomc.generic.media.tabcomplete;

import com.craftmend.openaudiomc.OpenAudioMc;
import com.craftmend.openaudiomc.generic.commands.interfaces.TabCompleteProvider;
import com.craftmend.openaudiomc.generic.uploads.UploadIndexService;
import com.craftmend.openaudiomc.api.user.User;
import com.craftmend.openaudiomc.spigot.modules.playlists.PlaylistService;
import com.craftmend.openaudiomc.spigot.modules.playlists.models.Playlist;
import com.craftmend.openaudiomc.spigot.modules.shortner.AliasService;

import java.util.Collection;
import java.util.LinkedList;
import java.util.List;

public class MediaTabcompleteProvider implements TabCompleteProvider {

    private static MediaTabcompleteProvider instance;

    public static MediaTabcompleteProvider getInstance() {
        if (instance == null) {
            instance = new MediaTabcompleteProvider();
        }
        return instance;
    }

    @Override
    public String[] getOptions(User sender) {
        List<String> options = new LinkedList<>();

        options.add("files:");


        if (OpenAudioMc.getInstance().getServiceManager().isServiceEnabled(UploadIndexService.class)) {
            Collection<String> all = OpenAudioMc.getService(UploadIndexService.class).getAll();
            if (!all.isEmpty()) {
                options.addAll(all);
            }
        }

        // do we have playlists on this service?
        if (OpenAudioMc.getInstance().getServiceManager().isServiceEnabled(PlaylistService.class)) {
            // this might be false if we're not running on spigot
            PlaylistService playlistService = OpenAudioMc.getService(PlaylistService.class);
            for (Playlist s : playlistService.getAll()) {
                options.add("list:" + s.getName());
            }
        }

        if (OpenAudioMc.getInstance().getServiceManager().isServiceEnabled(AliasService.class)) {
            AliasService aliasService = OpenAudioMc.getService(AliasService.class);
            for (String s : aliasService.getAliasMap().keySet()) {
                options.add("a:" + s);
            }
        }

        return options.toArray(new String[0]);
    }

}
