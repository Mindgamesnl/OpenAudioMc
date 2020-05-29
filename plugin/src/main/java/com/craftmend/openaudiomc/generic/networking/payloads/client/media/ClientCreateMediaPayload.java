package com.craftmend.openaudiomc.generic.networking.payloads.client.media;

import com.craftmend.openaudiomc.generic.media.objects.Media;
import com.craftmend.openaudiomc.generic.networking.abstracts.AbstractPacketPayload;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ClientCreateMediaPayload extends AbstractPacketPayload {

    public ClientCreateMediaPayload(Media media) {
        this.media = media;
    }

    private Media media;
    private int distance;
    private int maxDistance;

}
