package com.craftmend.openaudiomc.vistas.client.redis.packets;

import com.craftmend.openaudiomc.generic.networking.abstracts.AbstractPacketPayload;
import com.craftmend.openaudiomc.vistas.client.reflection.SerializedCall;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.UUID;

@Getter
@NoArgsConstructor
@AllArgsConstructor
public class InvokeUserPacket extends AbstractPacketPayload {

    private SerializedCall call;
    private UUID playerUuid;

}
