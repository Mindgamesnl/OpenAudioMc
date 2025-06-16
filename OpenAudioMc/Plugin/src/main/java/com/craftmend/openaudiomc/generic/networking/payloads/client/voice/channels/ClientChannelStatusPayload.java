package com.craftmend.openaudiomc.generic.networking.payloads.client.voice.channels;

import com.craftmend.openaudiomc.generic.networking.abstracts.AbstractPacketPayload;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;

@Data
@EqualsAndHashCode(callSuper=false)
@AllArgsConstructor
public class ClientChannelStatusPayload extends AbstractPacketPayload {

    // null if the user is not in a channel
    private String currentChannel;

}
