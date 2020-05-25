package com.craftmend.openaudiomc.generic.networking.client.objects.player;

import com.craftmend.openaudiomc.generic.networking.payloads.in.objects.MixerTrack;

import java.util.ArrayList;
import java.util.List;

public class MixTracker {

    private int maxTracks = 0;
    private List<MixerTrack> currentTracks = new ArrayList<>();

    public void submitChannels(List<MixerTrack> tracks) {
        List<MixerTrack> deletedTracks = new ArrayList<>(currentTracks);
        removeByName(deletedTracks, tracks);

        List<MixerTrack> createdTracks = new ArrayList<>(tracks);
        removeByName(createdTracks, currentTracks);

        this.currentTracks = tracks;


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
