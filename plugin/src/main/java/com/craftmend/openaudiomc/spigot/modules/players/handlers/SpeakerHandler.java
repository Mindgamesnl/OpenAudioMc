package com.craftmend.openaudiomc.spigot.modules.players.handlers;

import com.craftmend.openaudiomc.OpenAudioMc;
import com.craftmend.openaudiomc.generic.networking.abstracts.AbstractPacket;
import com.craftmend.openaudiomc.generic.networking.packets.client.speakers.PacketClientCreateSpeaker;
import com.craftmend.openaudiomc.generic.networking.packets.client.speakers.PacketClientRemoveSpeaker;
import com.craftmend.openaudiomc.generic.networking.packets.client.speakers.PacketClientUpdateLocation;
import com.craftmend.openaudiomc.generic.networking.payloads.out.speakers.ClientPlayerLocationPayload;
import com.craftmend.openaudiomc.generic.networking.payloads.out.speakers.ClientSpeakerCreatePayload;
import com.craftmend.openaudiomc.generic.networking.payloads.out.speakers.ClientSpeakerDestroyPayload;
import com.craftmend.openaudiomc.generic.networking.payloads.out.speakers.objects.ClientSpeaker;
import com.craftmend.openaudiomc.spigot.modules.speakers.enums.SpeakerType;
import com.craftmend.openaudiomc.spigot.OpenAudioMcSpigot;
import com.craftmend.openaudiomc.spigot.modules.players.interfaces.ITickableHandler;
import com.craftmend.openaudiomc.spigot.modules.players.objects.SpigotConnection;
import com.craftmend.openaudiomc.spigot.modules.speakers.objects.ApplicableSpeaker;
import lombok.AllArgsConstructor;
import org.bukkit.Location;
import org.bukkit.entity.Player;

import java.math.BigDecimal;
import java.math.RoundingMode;
import java.util.ArrayList;
import java.util.List;

@AllArgsConstructor
public class SpeakerHandler implements ITickableHandler {

    private Player player;
    private SpigotConnection spigotConnection;
    private final List<AbstractPacket> packetQue = new ArrayList<>();

    /**
     * update speakers based on the players location
     */
    @Override
    public void tick() {
        List<ApplicableSpeaker> applicableSpeakers = new ArrayList<>(OpenAudioMcSpigot.getInstance().getSpeakerModule().getApplicableSpeakers(player.getLocation()));
        List<ApplicableSpeaker> enteredSpeakers = new ArrayList<>(applicableSpeakers);
        enteredSpeakers.removeIf(speaker -> containsSpeaker(spigotConnection.getSpeakers(), speaker));
        List<ApplicableSpeaker> leftSpeakers = new ArrayList<>(spigotConnection.getSpeakers());
        leftSpeakers.removeIf(speaker -> containsSpeaker(applicableSpeakers, speaker));

        enteredSpeakers.forEach(entered -> {
            if (!isPlayingSpeaker(entered)) {
                packetQue.add(new PacketClientCreateSpeaker(new ClientSpeakerCreatePayload(toClientSpeaker(entered))));
            }
        });

        // send deletion packets
        leftSpeakers.forEach(left -> {
            ClientSpeaker clientSpeaker = toClientSpeaker(left);
            OpenAudioMc.getInstance().getNetworkingService().send(spigotConnection.getClientConnection(), new PacketClientRemoveSpeaker(new ClientSpeakerDestroyPayload(clientSpeaker)));
        });

        spigotConnection.setCurrentSpeakers(applicableSpeakers);

        // update location if the client is listening to something
        if (!applicableSpeakers.isEmpty()) {
            Location location = player.getLocation();
            ClientPlayerLocationPayload locationPayload = new ClientPlayerLocationPayload(
                    round(location.getX(), 1),
                    round(location.getY(), 1),
                    round(location.getZ(), 1),
                    (int) location.getPitch(),
                    (int) location.getYaw()
            );

            OpenAudioMc.getInstance().getNetworkingService().send(spigotConnection.getClientConnection(), new PacketClientUpdateLocation(locationPayload));

            for (AbstractPacket abstractPacket : packetQue) {
                OpenAudioMc.getInstance().getNetworkingService().send(spigotConnection.getClientConnection(), abstractPacket);
            }

            packetQue.clear();
        }
    }

    private boolean isPlayingSpeaker(ApplicableSpeaker speaker) {
        return spigotConnection.getSpeakers().stream().anyMatch(currentSpeaker -> currentSpeaker.getSpeaker().getSource().equals(speaker.getSpeaker().getSource()));
    }

    private ApplicableSpeaker filterSpeaker(List<ApplicableSpeaker> list, ApplicableSpeaker query) {
        return list.stream().filter(applicableSpeaker -> applicableSpeaker.getSpeaker() == query.getSpeaker()).findFirst().orElse(null);
    }

    private boolean containsSpeaker(List<ApplicableSpeaker> list, ApplicableSpeaker speaker) {
        return list.stream().anyMatch(currentSpeaker -> currentSpeaker.getSpeaker().getSource().equals(speaker.getSpeaker().getSource()));
    }

    private double round(double value, int places) {
        if (places < 0) throw new IllegalArgumentException();

        BigDecimal bd = BigDecimal.valueOf(value);
        bd = bd.setScale(places, RoundingMode.HALF_UP);
        return bd.doubleValue();
    }

    private ClientSpeaker toClientSpeaker(ApplicableSpeaker speaker) {
        String id;
        if (speaker.getSpeakerType() == SpeakerType.SPEAKER_3D) {
            id = speaker.getSpeaker().getId().toString();
        } else {
            id = speaker.getSpeaker().getMedia().getMediaId();
        }

        return new ClientSpeaker(
                speaker.getLocation(),
                speaker.getSpeakerType(),
                id,
                speaker.getSpeaker().getSource(),
                speaker.getSpeaker().getRadius(),
                speaker.getSpeaker().getMedia().getStartInstant()
        );
    }

}
