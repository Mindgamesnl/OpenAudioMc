package com.craftmend.openaudiomc.services.networking.payloads;

import com.craftmend.openaudiomc.services.networking.abstracts.AbstractPacketPayload;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.UUID;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ClientDisconnectPayload extends AbstractPacketPayload {

    private UUID client;

}
