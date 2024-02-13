package com.craftmend.openaudiomc.spigot.modules.playlists;

import com.craftmend.openaudiomc.generic.database.DatabaseService;
import com.craftmend.openaudiomc.generic.database.internal.Repository;
import com.craftmend.openaudiomc.generic.logging.OpenAudioLogger;
import com.craftmend.openaudiomc.generic.media.MediaService;
import com.craftmend.openaudiomc.api.media.UrlMutation;
import com.craftmend.openaudiomc.generic.service.Inject;
import com.craftmend.openaudiomc.generic.service.Service;
import com.craftmend.openaudiomc.spigot.modules.playlists.models.Playlist;
import com.craftmend.openaudiomc.spigot.modules.playlists.models.PlaylistEntry;

import java.util.Collection;
import java.util.HashMap;
import java.util.Map;

public class PlaylistService extends Service implements UrlMutation {

    @Inject
    private DatabaseService databaseService;

    private Repository<Playlist> playlistRepository;
    private Repository<PlaylistEntry> playlistEntryRepository;

    private Map<String, Playlist> cachedPlaylists = new HashMap<>();

    @Override
    public void onEnable() {
        playlistRepository = databaseService.getRepository(Playlist.class);
        playlistEntryRepository = databaseService.getRepository(PlaylistEntry.class);

        for (Playlist value : playlistRepository.values()) {
            cachedPlaylists.put(value.getName(), value);
        }

        // register mutations
        getService(MediaService.class).registerMutation("list:", this);
    }

    @Override
    public void onDisable() {
        saveAll();
    }

    public void saveAll() {
        for (Playlist value : cachedPlaylists.values()) {
            // save the playlist itself
            playlistRepository.save(value);

            // delete entries
            for (PlaylistEntry deletedEntry : value.getDeletedEntries()) {
                playlistEntryRepository.delete(deletedEntry);
                OpenAudioLogger.warn("Deleted entry " + deletedEntry.getId() + " from playlist " + value.getName());
            }
            value.getDeletedEntries().clear();

            // save the other entries
            for (PlaylistEntry entry : value.getEntries()) {
                playlistEntryRepository.save(entry);
            }
        }
    }

    public Playlist getPlaylist(String name) {
        return cachedPlaylists.get(name);
    }

    public Playlist createPlaylist(String name, String creator) {
        Playlist playlist = new Playlist(name, creator);
        cachedPlaylists.put(name, playlist);
        playlistRepository.save(playlist);
        return playlist;
    }

    public void deletePlaylist(String name) {
        Playlist playlist = getPlaylist(name);
        if (playlist == null) return;

        // delete all entries
        for (PlaylistEntry entry : playlist.getEntries()) {
            playlistEntryRepository.delete(entry);
        }

        playlistRepository.delete(playlist);
        cachedPlaylists.remove(name);
    }

    public Collection<Playlist> getAll() {
        return playlistRepository.values();
    }

    @Override
    public String onRequest(String original) {
        String playlistName = original.replace("list:", "");
        Playlist playlist = getPlaylist(playlistName);
        if (playlist == null) return original;

        return playlist.toJsonArray();
    }
}
