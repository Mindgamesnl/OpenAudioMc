package com.craftmend.openaudiomc.generic.networking.payloads.client.media;

import com.craftmend.openaudiomc.generic.networking.abstracts.AbstractPacketPayload;
import com.craftmend.openaudiomc.generic.networking.packets.client.media.PacketClientDestroyMedia;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ClientDestroyMediaPayload extends AbstractPacketPayload {

    private String soundId;
    private boolean all = false;
    private int fadeTime = PacketClientDestroyMedia.DEFAULT_FADE_TIME;

}
