package com.craftmend.openaudiomc.generic.networking.payloads.client.ui;

import com.craftmend.openaudiomc.generic.environment.MagicValue;
import com.craftmend.openaudiomc.generic.networking.abstracts.AbstractPacketPayload;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ClientVersionPayload extends AbstractPacketPayload {

    // 2 = enable general callbacks
    // 3 = enable youtube callbacks
    // 4 = enable client volume updates
    // 5 = enable voice loudness
    // 6 = enable magic value sharing
    private int protocolRevision = 6;
    private int locationUpdateTicks = MagicValue.LOCATION_TRACK_INTERVAL.get(Integer.class);


}
