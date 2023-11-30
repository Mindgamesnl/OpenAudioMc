package com.craftmend.openaudiomc.spigot.modules.playlists.models;

import com.craftmend.openaudiomc.generic.database.internal.DataStore;
import com.craftmend.storm.api.enums.ColumnType;
import com.craftmend.storm.api.markers.Column;
import lombok.Getter;

import java.net.URLEncoder;
import java.util.ArrayList;
import java.util.LinkedList;
import java.util.List;

@Getter
public class Playlist extends DataStore {

    private boolean cacheDirty = true;
    private LinkedList<PlaylistEntry> orderedEntries = new LinkedList<>();
    @Getter private List<PlaylistEntry> deletedEntries = new ArrayList<>();

    @Column(
            type = ColumnType.ONE_TO_MANY,
            references = {PlaylistEntry.class},
            matchTo = "playlistId"
    )
    private List<PlaylistEntry> entries;

    @Column
    private String name;

    @Column
    private String createdBy;

    public Playlist(String playlistName, String createdBy) {
        entries = new LinkedList<>();
        this.name = playlistName;
        this.createdBy = createdBy;
    }

    public void addEntry(PlaylistEntry entry) {
        // set the index to the last index + 1
        updateOrderedEntries(); // ensure the cache is up to date
        entry.setIndex(orderedEntries.size());
        entries.add(entry);
        deletedEntries.removeIf((a) -> a.getId() == entry.getId());
        cacheDirty = true;
    }

    public void removeEntry(PlaylistEntry entry) {
        entries.remove(entry);
        deletedEntries.add(entry);

        // shift everything after this back by one
        int index = entry.getIndex();
        for (PlaylistEntry playlistEntry : entries) {
            // it cannot be lower than the current index, so we can skip it
            if (playlistEntry.getIndex() > index && entry.getIndex() >= (playlistEntry.getIndex() - 1)) {
                playlistEntry.setIndex(playlistEntry.getIndex() - 1);
            }
        }
        cacheDirty = true;
    }

    private void updateOrderedEntries() {
        if (!cacheDirty) return;
        orderedEntries.clear();
        orderedEntries.sort((o1, o2) -> {
            if (o1.getIndex() > o2.getIndex()) return 1;
            if (o1.getIndex() < o2.getIndex()) return -1;
            return 0;
        });
        cacheDirty = false;
    }

    public String toJsonArray() {
        updateOrderedEntries();
        StringBuilder builder = new StringBuilder();
        builder.append("[");
        for (PlaylistEntry entry : orderedEntries) {
            builder.append('"');
            // deprecated since java 10, but some servers still use java 8
            builder.append(URLEncoder.encode(entry.getMedia()));
            builder.append('"');
            builder.append(",");
        }
        builder.deleteCharAt(builder.length() - 1);
        builder.append("]");
        return builder.toString();
    }

}
