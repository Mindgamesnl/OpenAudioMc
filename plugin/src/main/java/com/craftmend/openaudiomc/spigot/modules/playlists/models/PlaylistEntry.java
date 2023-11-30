package com.craftmend.openaudiomc.spigot.modules.playlists.models;

import com.craftmend.openaudiomc.generic.database.internal.DataStore;
import com.craftmend.storm.api.enums.KeyType;
import com.craftmend.storm.api.markers.Column;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class PlaylistEntry extends DataStore {

    @Column(
            keyType = KeyType.FOREIGN,
            references = {Playlist.class}
    )
    private Integer playlistId;

    @Column
    private String media;

    @Column
    private int index;

    public PlaylistEntry(String source) {
        super();
        this.media = source;
        // index is set by the playlist
    }
}
