package com.craftmend.openaudiomc.generic.networking.payloads.in;

import com.craftmend.openaudiomc.generic.networking.abstracts.AbstractPacketPayload;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

import java.util.UUID;

@Data
@EqualsAndHashCode(callSuper=false)
@AllArgsConstructor
@NoArgsConstructor
public class ClientChangedVolumePayload extends AbstractPacketPayload {

    private int volume;
    private UUID client;

}
