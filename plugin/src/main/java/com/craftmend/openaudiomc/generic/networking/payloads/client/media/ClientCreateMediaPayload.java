package com.craftmend.openaudiomc.generic.networking.payloads.client.media;

import com.craftmend.openaudiomc.generic.media.objects.Sound;
import com.craftmend.openaudiomc.generic.networking.abstracts.AbstractPacketPayload;
import com.craftmend.openaudiomc.generic.networking.payloads.client.interfaces.SourceHolder;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ClientCreateMediaPayload extends AbstractPacketPayload implements SourceHolder {

    public ClientCreateMediaPayload(Sound media) {
        this.media = media;
    }

    private Sound media;
    private int distance;
    private int maxDistance;

    @Override
    public String getSource() {
        return media.getSource();
    }
}
