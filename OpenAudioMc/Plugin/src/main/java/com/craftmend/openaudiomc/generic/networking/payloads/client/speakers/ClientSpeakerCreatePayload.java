package com.craftmend.openaudiomc.generic.networking.payloads.client.speakers;

import com.craftmend.openaudiomc.generic.networking.abstracts.AbstractPacketPayload;
import com.craftmend.openaudiomc.generic.networking.payloads.client.interfaces.SourceHolder;
import com.craftmend.openaudiomc.generic.networking.payloads.client.speakers.objects.ClientSpeaker;
import lombok.AllArgsConstructor;

@AllArgsConstructor
public class ClientSpeakerCreatePayload extends AbstractPacketPayload implements SourceHolder {

    private ClientSpeaker clientSpeaker;

    @Override
    public String getSource() {
        return clientSpeaker.getSource();
    }

    @Override
    public void setSource(String source) {
        clientSpeaker.setSource(source);
    }
}
