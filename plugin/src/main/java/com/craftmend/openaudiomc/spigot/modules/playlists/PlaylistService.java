package com.craftmend.openaudiomc.spigot.modules.playlists;

import com.craftmend.openaudiomc.generic.database.DatabaseService;
import com.craftmend.openaudiomc.generic.database.internal.Repository;
import com.craftmend.openaudiomc.generic.service.Inject;
import com.craftmend.openaudiomc.generic.service.Service;
import com.craftmend.openaudiomc.spigot.modules.playlists.models.Playlist;
import com.craftmend.openaudiomc.spigot.modules.playlists.models.PlaylistEntry;

public class PlaylistService extends Service {

    @Inject
    private DatabaseService databaseService;

    private Repository<Playlist> playlistRepository;
    private Repository<PlaylistEntry> playlistEntryRepository;

    @Override
    public void onEnable() {
        playlistRepository = databaseService.getRepository(Playlist.class);
        playlistEntryRepository = databaseService.getRepository(PlaylistEntry.class);
    }

}
