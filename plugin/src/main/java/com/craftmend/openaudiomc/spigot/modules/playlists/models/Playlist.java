package com.craftmend.openaudiomc.spigot.modules.playlists.models;

import com.craftmend.openaudiomc.generic.database.internal.DataStore;
import com.craftmend.storm.api.enums.ColumnType;
import com.craftmend.storm.api.markers.Column;
import lombok.Getter;

import java.net.URLEncoder;
import java.util.LinkedList;
import java.util.List;

@Getter
public class Playlist extends DataStore {

    private boolean cacheDirty = true;
    private LinkedList<PlaylistEntry> orderedEntries = new LinkedList<>();

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
        cacheDirty = true;
    }

    public void removeEntry(PlaylistEntry entry) {
        entries.remove(entry);
        cacheDirty = true;
    }

    public void removeEntry(int index) {
        entries.removeIf(entry -> entry.getIndex() == index);
        cacheDirty = true;
    }

    public void moveEntry(int from, int to) {
        PlaylistEntry entry = entries.stream().filter(e -> e.getIndex() == from).findFirst().orElse(null);
        if (entry == null) return;
        entry.setIndex(to);
        cacheDirty = true;
    }

    public void moveEntry(PlaylistEntry entry, int to) {
        entry.setIndex(to);
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
