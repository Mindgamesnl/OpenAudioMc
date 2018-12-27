package com.craftmend.openaudiomc.modules.networking.packets;

import com.craftmend.openaudiomc.modules.media.objects.Media;
import com.craftmend.openaudiomc.modules.networking.abstracts.AbstractPacket;
import com.craftmend.openaudiomc.modules.networking.enums.PacketType;

import lombok.Getter;

import java.util.UUID;

@Getter
public class PacketClientCreateMedia extends AbstractPacket {

    private Media media;
    private UUID client;

    public PacketClientCreateMedia(Media media, UUID client) {
        super(PacketType.CLIENT_CREATE_MEDIA);

        this.media = media;
        this.client = client;

        setData(this);
    }
}
