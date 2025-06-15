package com.craftmend.openaudiomc.generic.networking.payloads.client.speakers;

import com.craftmend.openaudiomc.generic.networking.abstracts.AbstractPacketPayload;

public class ClientPlayerLocationPayload extends AbstractPacketPayload {
    private double x;
    private double y;
    private double z;
    private int pitch;
    private int yaw;

    public ClientPlayerLocationPayload(final double x, final double y, final double z, final int pitch, final int yaw) {
        this.x = x;
        this.y = y;
        this.z = z;
        this.pitch = pitch;
        this.yaw = yaw;
    }
}
