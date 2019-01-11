package com.craftmend.openaudiomc.services.networking.payloads;

import com.craftmend.openaudiomc.services.networking.abstracts.AbstractPacketPayload;
import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@AllArgsConstructor
public class ClientVolumePayload extends AbstractPacketPayload {

    private int volume;

}
