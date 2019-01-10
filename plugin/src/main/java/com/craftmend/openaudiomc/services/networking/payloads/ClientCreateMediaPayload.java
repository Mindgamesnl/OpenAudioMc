package com.craftmend.openaudiomc.services.networking.payloads;

import com.craftmend.openaudiomc.modules.media.objects.Media;
import com.craftmend.openaudiomc.services.networking.abstracts.AbstractPacketPayload;
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
