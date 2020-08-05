package com.craftmend.openaudiomc.api.impl;

import com.craftmend.openaudiomc.OpenAudioMc;
import com.craftmend.openaudiomc.api.interfaces.Client;
import com.craftmend.openaudiomc.api.interfaces.MediaApi;
import com.craftmend.openaudiomc.generic.media.objects.Media;
import com.craftmend.openaudiomc.generic.media.objects.MediaOptions;
import com.craftmend.openaudiomc.generic.networking.client.objects.player.ClientConnection;
import com.craftmend.openaudiomc.generic.networking.packets.client.media.PacketClientDestroyMedia;
import com.craftmend.openaudiomc.generic.networking.packets.client.speakers.PacketClientCreateSpeaker;
import com.craftmend.openaudiomc.generic.networking.packets.client.speakers.PacketClientRemoveSpeaker;
import com.craftmend.openaudiomc.generic.networking.payloads.client.speakers.ClientSpeakerCreatePayload;
import com.craftmend.openaudiomc.generic.networking.payloads.client.speakers.ClientSpeakerDestroyPayload;
import com.craftmend.openaudiomc.generic.networking.payloads.client.speakers.objects.ClientSpeaker;
import com.craftmend.openaudiomc.generic.networking.payloads.client.speakers.objects.Vector3;
import com.craftmend.openaudiomc.spigot.modules.speakers.enums.SpeakerType;

import java.time.Instant;
import java.util.UUID;

public class MediaApiImpl implements MediaApi {

    private ClientConnection validateClient(Client client) {
        if (!(client instanceof ClientConnection)) throw new IllegalStateException("This player isn't a instance of ClientConnection");
        return (ClientConnection) client;
    }

    @Override
    public void playMedia(Client client, String source) {
        validateClient(client).sendMedia(new Media(source));
    }

    @Override
    public void playMedia(Client client, String source, MediaOptions mediaOptions) {
        validateClient(client).sendMedia(new Media(source).applySettings(mediaOptions));
    }

    @Override
    public void stopMedia(Client client) {
        OpenAudioMc.getInstance().getNetworkingService().send(validateClient(client), new PacketClientDestroyMedia(null));
    }

    @Override
    public void stopMedia(Client client, String id) {
        OpenAudioMc.getInstance().getNetworkingService().send(validateClient(client), new PacketClientDestroyMedia(id));
    }

    @Override
    public String playSpatialSound(Client client, String source, int x, int y, int z, int radius, boolean useSurroundSound) {
        ClientSpeaker clientSpeaker = new ClientSpeaker(
                new Vector3(x, y, z),
                (useSurroundSound ? SpeakerType.SPEAKER_3D : SpeakerType.SPEAKER_2D),
                UUID.randomUUID().toString(),
                source,
                radius,
                Instant.now().toEpochMilli()
        );
        ClientConnection connection = validateClient(client);
        connection.setApiSpeakers(connection.getApiSpeakers() + 1);
        OpenAudioMc.getInstance().getNetworkingService().send(connection, new PacketClientCreateSpeaker(new ClientSpeakerCreatePayload(clientSpeaker)));
        return clientSpeaker.getId();
    }

    @Override
    public void stopSpatialSound(Client client, String spatialSoundId) {
        ClientSpeaker clientSpeaker = new ClientSpeaker(
                new Vector3(0, 0, 0),
                SpeakerType.SPEAKER_2D,
                spatialSoundId,
                null,
                0,
                0
        );
        ClientConnection connection = validateClient(client);
        connection.setApiSpeakers(connection.getApiSpeakers() - 1);
        OpenAudioMc.getInstance().getNetworkingService().send(connection, new PacketClientRemoveSpeaker(new ClientSpeakerDestroyPayload(clientSpeaker)));
    }
}
