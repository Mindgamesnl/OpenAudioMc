package com.craftmend.openaudiomc.spigot.modules.players.handlers;

import com.craftmend.openaudiomc.OpenAudioMc;
import com.craftmend.openaudiomc.generic.networking.abstracts.AbstractPacket;
import com.craftmend.openaudiomc.generic.networking.interfaces.NetworkingService;
import com.craftmend.openaudiomc.generic.networking.packets.client.speakers.PacketClientCreateSpeaker;
import com.craftmend.openaudiomc.generic.networking.packets.client.speakers.PacketClientRemoveSpeaker;
import com.craftmend.openaudiomc.generic.networking.payloads.client.speakers.ClientSpeakerCreatePayload;
import com.craftmend.openaudiomc.generic.networking.payloads.client.speakers.ClientSpeakerDestroyPayload;
import com.craftmend.openaudiomc.generic.networking.payloads.client.speakers.objects.ClientSpeaker;
import com.craftmend.openaudiomc.spigot.services.world.Vector3;
import com.craftmend.openaudiomc.spigot.modules.players.enums.PlayerLocationFollower;
import com.craftmend.openaudiomc.spigot.modules.speakers.SpeakerService;
import com.craftmend.openaudiomc.api.speakers.ExtraSpeakerOptions;
import com.craftmend.openaudiomc.api.speakers.SpeakerType;
import com.craftmend.openaudiomc.spigot.modules.players.interfaces.ITickableHandler;
import com.craftmend.openaudiomc.spigot.modules.players.objects.SpigotConnection;
import com.craftmend.openaudiomc.spigot.modules.speakers.objects.ApplicableSpeaker;
import lombok.AllArgsConstructor;
import org.bukkit.entity.Player;

import java.util.ArrayList;
import java.util.List;
import java.util.Queue;
import java.util.concurrent.ConcurrentLinkedQueue;

@AllArgsConstructor
public class SpeakerHandler implements ITickableHandler {

    private final Player player;
    private final SpigotConnection spigotConnection;
    private final Queue<AbstractPacket> packetQue = new ConcurrentLinkedQueue<AbstractPacket>();
    private final SpeakerService speakerService = OpenAudioMc.getService(SpeakerService.class);

    /**
     * update speakers based on the players location
     */
    @Override
    public void tick() {
        List<ApplicableSpeaker> applicableSpeakers = new ArrayList<>(speakerService.getCollector().getApplicableSpeakers(player.getLocation(), true));
        List<ApplicableSpeaker> enteredSpeakers = new ArrayList<>(applicableSpeakers);
        enteredSpeakers.removeIf(speaker -> containsSpeaker(spigotConnection.getSpeakers(), speaker));
        List<ApplicableSpeaker> leftSpeakers = new ArrayList<>(spigotConnection.getSpeakers());
        leftSpeakers.removeIf(speaker -> containsSpeaker(applicableSpeakers, speaker));

        enteredSpeakers.forEach(entered -> {
            if (!isPlayingSpeaker(entered)) {
                int obstructions = 0;

                // calculate obstructions?
                // yea, but only if enabled for this speaker
                if (ExtraSpeakerOptions.PROCESS_OBSTRUCTIONS.isEnabledFor(entered.getSpeaker())) {
                    obstructions = speakerService.getRayTracer().obstructionsBetweenLocations(player.getLocation(), entered.getLocation());
                }

                if (!entered.getSpeaker().isRedstonePowered()) {
                    entered.getSpeaker().setRedstonePowered(true);
                    if (ExtraSpeakerOptions.RESET_PLAYTHROUGH_ON_REDSTONE_LOSS.isEnabledFor(entered.getSpeaker())) entered.getSpeaker().getMedia().setStartInstant(System.currentTimeMillis());
                }

                ClientSpeaker cp = toClientSpeaker(entered, obstructions);

                // overwrite sync flag
                if (ExtraSpeakerOptions.IGNORE_SYNCHRONIZATION.isEnabledFor(entered.getSpeaker())) {
                    cp.setDoPickup(false);
                }

                // is it single fire?
                if (ExtraSpeakerOptions.PLAY_ONCE.isEnabledFor(entered.getSpeaker())) {
                    cp.setDoLoop(false);
                }

                packetQue.add(new PacketClientCreateSpeaker(
                        new ClientSpeakerCreatePayload(cp)
                ));
            }
        });

        // send deletion packets
        leftSpeakers.forEach(left -> {
            ClientSpeaker clientSpeaker = toClientSpeaker(left, -1);
            OpenAudioMc.getService(NetworkingService.class).send(spigotConnection.getClientConnection(), new PacketClientRemoveSpeaker(new ClientSpeakerDestroyPayload(clientSpeaker)));
        });

        spigotConnection.setCurrentSpeakers(applicableSpeakers);

        // update location if the client is listening to something
        if (!applicableSpeakers.isEmpty() || spigotConnection.getClientConnection().getSession().getApiSpeakers() > 0) {

            spigotConnection.getLocationFollowers().add(PlayerLocationFollower.SPEAKERS);

            for (AbstractPacket abstractPacket : packetQue) {
                OpenAudioMc.getService(NetworkingService.class).send(spigotConnection.getClientConnection(), abstractPacket);
            }

            packetQue.clear();
        }

        if (applicableSpeakers.isEmpty()) {
            spigotConnection.getLocationFollowers().remove(PlayerLocationFollower.SPEAKERS);
        }
    }

    public void forceDeleteSpeaker(String id, SpeakerType type, String source) {
        OpenAudioMc.getService(NetworkingService.class).send(spigotConnection.getClientConnection(), new PacketClientRemoveSpeaker(new ClientSpeakerDestroyPayload(
                new ClientSpeaker(
                        Vector3.EMPTY,
                        type,
                        id,
                        source,
                        0,
                        0,
                        0,
                        false,
                        false,
                        false
                )
        )));
    }

    private boolean isPlayingSpeaker(ApplicableSpeaker speaker) {
        return containsSpeaker(spigotConnection.getSpeakers(), speaker);
    }


    private boolean containsSpeaker(List<ApplicableSpeaker> list, ApplicableSpeaker speaker) {
        return list.stream().anyMatch(currentSpeaker -> currentSpeaker.equals(speaker));
    }

    private ClientSpeaker toClientSpeaker(ApplicableSpeaker speaker, int obstructions) {
        String id = speaker.getSpeaker().getSpeakerId().toString();

        return new ClientSpeaker(
                speaker.getLocation(),
                speaker.getSpeakerType(),
                id,
                speaker.getSpeaker().getSource(),
                speaker.getSpeaker().getRadius(),
                speaker.getSpeaker().getMedia().getStartInstant(),
                obstructions,
                true,
                true,
                ExtraSpeakerOptions.OVERWRITE_REGIONS.isEnabledFor(speaker.getSpeaker())
        );
    }

}
