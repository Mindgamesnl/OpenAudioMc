package com.craftmend.openaudiomc.generic.networking.payloads.client.speakers;

import com.craftmend.openaudiomc.generic.networking.abstracts.AbstractPacketPayload;
import lombok.AllArgsConstructor;

@AllArgsConstructor
public class ClientSpeakerPositionUpdatePayload extends AbstractPacketPayload {

    private double x;
    private double y;
    private double z;
    private String speakerId;

}
