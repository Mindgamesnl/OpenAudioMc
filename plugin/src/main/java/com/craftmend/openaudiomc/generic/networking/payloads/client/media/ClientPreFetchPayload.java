package com.craftmend.openaudiomc.generic.networking.payloads.client.media;

import com.craftmend.openaudiomc.generic.networking.abstracts.AbstractPacketPayload;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ClientPreFetchPayload extends AbstractPacketPayload {

    private String source;
    private String origin = "automatic"; // or command, if invoked manually
    private boolean clear = false;
    private boolean keepCopy = false;

}
