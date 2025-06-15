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

    @Builder.Default
    private int volume = -1;
    @Builder.Default
    private boolean isConnected = false;
    private RtcSessionManager rtcSessionManager;
    private String streamKey;
    @Builder.Default
    private boolean isConnectedToRtc = false;
    @Builder.Default
    private boolean hasHueLinked = false;
    @Builder.Default
    private boolean sessionUpdated = false;
    private ClientAuth auth;

}
