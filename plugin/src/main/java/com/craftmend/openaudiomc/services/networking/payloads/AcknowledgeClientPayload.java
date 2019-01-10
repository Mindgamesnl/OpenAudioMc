package com.craftmend.openaudiomc.services.networking.payloads;

import com.craftmend.openaudiomc.services.networking.abstracts.AbstractPacketPayload;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.UUID;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class AcknowledgeClientPayload extends AbstractPacketPayload {

    private UUID uuid;
    private String token;

}
