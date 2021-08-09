package com.craftmend.openaudiomc.generic.networking.client.objects.player;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Builder
public class SerializableClient {

    private int volume = -1;
    private boolean isConnected = false;
    private ClientRtcManager clientRtcManager;
    private String streamKey;
    private boolean isConnectedToRtc = false;
    private boolean hasHueLinked = false;
    private boolean sessionUpdated = false;

}
