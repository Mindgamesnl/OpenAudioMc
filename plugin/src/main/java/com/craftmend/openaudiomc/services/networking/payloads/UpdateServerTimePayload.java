package com.craftmend.openaudiomc.services.networking.payloads;

import com.craftmend.openaudiomc.services.networking.abstracts.AbstractPacketPayload;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.UUID;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class UpdateServerTimePayload extends AbstractPacketPayload {

    private long timestamp;
    private long offset;

}
