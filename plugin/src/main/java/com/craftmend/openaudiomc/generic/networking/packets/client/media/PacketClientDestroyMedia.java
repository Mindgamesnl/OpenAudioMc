package com.craftmend.openaudiomc.generic.networking.packets.client.media;

import com.craftmend.openaudiomc.generic.networking.abstracts.AbstractPacket;
import com.craftmend.openaudiomc.generic.networking.abstracts.PacketChannel;
import com.craftmend.openaudiomc.generic.networking.payloads.client.media.ClientDestroyMediaPayload;

public class PacketClientDestroyMedia extends AbstractPacket {

    public static final int DEFAULT_FADE_TIME = 500;

    public PacketClientDestroyMedia(String soundId, boolean deleteSpecial, int fadeTime) {
        super(new ClientDestroyMediaPayload(soundId, deleteSpecial, fadeTime), PacketChannel.CLIENT_OUT_DESTROY_MEDIA, null);
        this.queueableIfReconnecting = true;
    }

    public PacketClientDestroyMedia(String soundId, boolean deleteSpecial) {
        super(new ClientDestroyMediaPayload(soundId, deleteSpecial, DEFAULT_FADE_TIME), PacketChannel.CLIENT_OUT_DESTROY_MEDIA, null);
        this.queueableIfReconnecting = true;
    }

    public PacketClientDestroyMedia(String soundId, int fadeTime) {
        super(new ClientDestroyMediaPayload(soundId, false, fadeTime), PacketChannel.CLIENT_OUT_DESTROY_MEDIA, null);
        this.queueableIfReconnecting = true;
    }

    public PacketClientDestroyMedia(String soundId) {
        super(new ClientDestroyMediaPayload(soundId, false, DEFAULT_FADE_TIME), PacketChannel.CLIENT_OUT_DESTROY_MEDIA, null);
        this.queueableIfReconnecting = true;
    }

}
