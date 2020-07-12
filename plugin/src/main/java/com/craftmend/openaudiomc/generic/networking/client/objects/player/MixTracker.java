package com.craftmend.openaudiomc.generic.networking.client.objects.player;

import com.craftmend.openaudiomc.OpenAudioMc;
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
            if (expectedTracksToStart < 5) { // minor room for error and latency
                // might be invalid if its a node server, so lets check that first
                if (OpenAudioMc.getInstance().getInvoker().isNodeServer()) {
                    // im not the master, disabling and ignoring.
                    return;
                }
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
