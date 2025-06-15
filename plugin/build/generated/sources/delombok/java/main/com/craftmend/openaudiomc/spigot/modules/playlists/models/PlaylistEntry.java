package com.craftmend.openaudiomc.spigot.modules.playlists.models;

import com.craftmend.openaudiomc.generic.database.internal.DataStore;
import com.craftmend.storm.api.enums.KeyType;
import com.craftmend.storm.api.markers.Column;
import com.craftmend.storm.api.markers.Table;

@Table(name = "playlist_entries")
public class PlaylistEntry extends DataStore {
    @Column(keyType = KeyType.FOREIGN, references = {Playlist.class}, name = "playlist_id")
    private Integer playlistId;
    @Column
    private String media;
    @Column(name = "playlist_index")
    private Integer index;

    public PlaylistEntry(String source) {
        super();
        this.media = source;
        // index is set by the playlist
    }

    public Integer getPlaylistId() {
        return this.playlistId;
    }

    public String getMedia() {
        return this.media;
    }

    public Integer getIndex() {
        return this.index;
    }

    public void setPlaylistId(final Integer playlistId) {
        this.playlistId = playlistId;
    }

    public void setMedia(final String media) {
        this.media = media;
    }

    public void setIndex(final Integer index) {
        this.index = index;
    }

    public PlaylistEntry() {
    }
}
