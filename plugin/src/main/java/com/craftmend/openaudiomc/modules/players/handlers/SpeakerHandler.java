package com.craftmend.openaudiomc.modules.players.handlers;

import com.craftmend.openaudiomc.OpenAudioMc;
import com.craftmend.openaudiomc.modules.media.objects.MediaUpdate;
import com.craftmend.openaudiomc.modules.players.objects.Client;
import com.craftmend.openaudiomc.modules.speakers.objects.ApplicableSpeaker;
import com.craftmend.openaudiomc.services.networking.packets.PacketClientCreateMedia;
import com.craftmend.openaudiomc.services.networking.packets.PacketClientDestroyMedia;
import com.craftmend.openaudiomc.services.networking.packets.PacketClientUpdateMedia;
import lombok.AllArgsConstructor;
import org.bukkit.entity.Player;

import java.util.ArrayList;
import java.util.List;

@AllArgsConstructor
public class SpeakerHandler {

    private Player player;
    private Client client;

    /**
     * update speakers based on the players location
     */
    public void tickSpeakers() {
        List<ApplicableSpeaker> applicableSpeakers = new ArrayList<>(OpenAudioMc.getInstance().getSpeakerModule().getApplicableSpeakers(player.getLocation()));

        List<ApplicableSpeaker> enteredSpeakers = new ArrayList<>(applicableSpeakers);
        enteredSpeakers.removeIf(speaker -> containsSpeaker(client.getSpeakers(), speaker));

        List<ApplicableSpeaker> leftSpeakers = new ArrayList<>(client.getSpeakers());
        leftSpeakers.removeIf(speaker -> containsSpeaker(applicableSpeakers, speaker));

        enteredSpeakers.forEach(entered -> {
            if (!isPlayingSpeaker(entered)) {
                OpenAudioMc.getInstance().getNetworkingService().send(client, new PacketClientCreateMedia(entered.getSpeaker().getMedia(), entered.getDistance(), entered.getSpeaker().getRadius()));
            }
        });

        client.getSpeakers().forEach(current -> {
            if (containsSpeaker(applicableSpeakers, current)) {
                ApplicableSpeaker selector = filterSpeaker(applicableSpeakers, current);
                if (selector != null && (current.getDistance() != selector.getDistance())) {
                    MediaUpdate mediaUpdate = new MediaUpdate(selector.getDistance(), selector.getSpeaker().getRadius(), 450, current.getSpeaker().getMedia().getMediaId());
                    OpenAudioMc.getInstance().getNetworkingService().send(client, new PacketClientUpdateMedia(mediaUpdate));
                }
            }
        });

        leftSpeakers.forEach(left -> OpenAudioMc.getInstance().getNetworkingService().send(client, new PacketClientDestroyMedia(left.getSpeaker().getMedia().getMediaId())));

        client.setCurrentSpeakers(applicableSpeakers);
    }

    private Boolean isPlayingSpeaker(ApplicableSpeaker speaker) {
        for (ApplicableSpeaker currentSpeaker : client.getSpeakers()) if (currentSpeaker.getSpeaker().getSource().equals(speaker.getSpeaker().getSource())) return true;
        return false;
    }

    private ApplicableSpeaker filterSpeaker(List<ApplicableSpeaker> list, ApplicableSpeaker query) {
        for (ApplicableSpeaker applicableSpeaker : list) {
            if (applicableSpeaker.getSpeaker() == query.getSpeaker()) return applicableSpeaker;
        }
        return null;
    }

    private Boolean containsSpeaker(List<ApplicableSpeaker> list, ApplicableSpeaker speaker) {
        for (ApplicableSpeaker currentSpeaker : list) if (currentSpeaker.getSpeaker().getSource().equals(speaker.getSpeaker().getSource())) return true;
        return false;
    }

}
