package com.craftmend.openaudiomc.services.networking.payloads;

import com.craftmend.openaudiomc.modules.media.objects.MediaUpdate;
import com.craftmend.openaudiomc.services.networking.abstracts.AbstractPacketPayload;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ClientUpdateMediaPayload extends AbstractPacketPayload {

    private MediaUpdate mediaOptions;

}
