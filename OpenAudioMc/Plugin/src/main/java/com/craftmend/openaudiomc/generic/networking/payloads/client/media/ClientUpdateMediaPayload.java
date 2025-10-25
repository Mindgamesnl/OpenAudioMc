package com.craftmend.openaudiomc.generic.networking.payloads.client.media;

import com.craftmend.openaudiomc.api.media.MediaPatchOptions;
import com.craftmend.openaudiomc.generic.networking.abstracts.AbstractPacketPayload;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

@Data
@EqualsAndHashCode(callSuper=false)
@NoArgsConstructor
@AllArgsConstructor
public class ClientUpdateMediaPayload extends AbstractPacketPayload {

    private MediaPatchOptions mediaOptions;

}
