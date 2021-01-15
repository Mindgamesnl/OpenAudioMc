package com.craftmend.openaudiomc.generic.networking.client.objects.player;

import lombok.AllArgsConstructor;

@AllArgsConstructor
public class ClientRtcLocationUpdate {

    private String streamKey;
    private double x, y, z;

}
