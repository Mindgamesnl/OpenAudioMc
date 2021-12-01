package com.craftmend.openaudiomc.generic.client.helpers;

import com.craftmend.openaudiomc.generic.client.session.ClientAuth;
import com.craftmend.openaudiomc.generic.client.session.RtcSessionManager;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Builder
public class SerializableClient {

    private int volume = -1;
    private boolean isConnected = false;
    private RtcSessionManager rtcSessionManager;
    private String streamKey;
    private boolean isConnectedToRtc = false;
    private boolean hasHueLinked = false;
    private boolean sessionUpdated = false;
    private ClientAuth auth;

}
