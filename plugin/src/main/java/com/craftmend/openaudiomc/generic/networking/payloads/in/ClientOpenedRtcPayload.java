package com.craftmend.openaudiomc.generic.networking.payloads.in;

import com.craftmend.openaudiomc.generic.networking.abstracts.AbstractPacketPayload;
import com.craftmend.openaudiomc.generic.voicechat.events.VoiceStateChangeEvent;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.UUID;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ClientOpenedRtcPayload extends AbstractPacketPayload {

    private UUID client;
    private boolean enabled;
    private VoiceStateChangeEvent event;

}
