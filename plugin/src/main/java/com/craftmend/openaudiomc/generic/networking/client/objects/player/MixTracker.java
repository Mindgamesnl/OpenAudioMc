package com.craftmend.openaudiomc.generic.networking.client.objects.player;

import com.craftmend.openaudiomc.generic.networking.payloads.in.objects.MixerTrack;

import java.util.ArrayList;
import java.util.List;

public class MixTracker {

    private int expectedTracksToStart = 0;
    private List<MixerTrack> currentTracks = new ArrayList<>();

    public void submitChannels(List<MixerTrack> tracks) throws IllegalAccessException {
        List<MixerTrack> deletedTracks = new ArrayList<>(currentTracks);
        removeByName(deletedTracks, tracks);

        List<MixerTrack> createdTracks = new ArrayList<>(tracks);
        removeByName(createdTracks, currentTracks);

        this.currentTracks = tracks;

        if (!createdTracks.isEmpty()) {
            expectedTracksToStart = expectedTracksToStart - createdTracks.size();
            if (expectedTracksToStart < 0) {
                throw new IllegalAccessException("Client tried to fake sound id's");
            }
        }
    }

    public void triggerExpectedTrack() {
        expectedTracksToStart++;
    }

    public void stealExpectedTrack() {
        expectedTracksToStart--;
    }

    private void removeByName(List<MixerTrack> collection, List<MixerTrack> removers) {
        for (MixerTrack remover : removers) {
            collection.removeIf(a -> a.getName().equals(remover.getName()));
        }
    }

    public void clear() {
        currentTracks.clear();
    }

}
