package com.craftmend.openaudiomc.spigot.modules.playlists.models;

import com.craftmend.openaudiomc.generic.database.internal.DataStore;
import com.craftmend.storm.api.enums.KeyType;
import com.craftmend.storm.api.markers.Column;
import com.craftmend.storm.api.markers.Table;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@Table(name = "playlist_entries")
public class PlaylistEntry extends DataStore {

    @Column(
            keyType = KeyType.FOREIGN,
            references = {Playlist.class},
            name = "playlist_id"
    )
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
}
