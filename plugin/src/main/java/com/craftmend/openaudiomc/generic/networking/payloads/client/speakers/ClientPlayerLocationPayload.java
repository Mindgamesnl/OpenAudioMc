package com.craftmend.openaudiomc.generic.networking.payloads.client.speakers;

import com.craftmend.openaudiomc.generic.networking.abstracts.AbstractPacketPayload;
import lombok.AllArgsConstructor;

@AllArgsConstructor
public class ClientPlayerLocationPayload extends AbstractPacketPayload {

    private final double x;
    private final double y;
    private final double z;
    private final int pitch;
    private final int yaw;

}
