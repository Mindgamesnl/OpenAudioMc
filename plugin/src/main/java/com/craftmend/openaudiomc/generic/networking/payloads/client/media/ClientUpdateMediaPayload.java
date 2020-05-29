package com.craftmend.openaudiomc.generic.networking.payloads.client.media;

import com.craftmend.openaudiomc.generic.media.objects.MediaUpdate;
import com.craftmend.openaudiomc.generic.networking.abstracts.AbstractPacketPayload;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ClientUpdateMediaPayload extends AbstractPacketPayload {

    private MediaUpdate mediaOptions;

}
