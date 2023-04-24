package com.craftmend.openaudiomc.vistas.client.redis.packets;

import com.craftmend.openaudiomc.generic.networking.abstracts.AbstractPacket;
import com.craftmend.openaudiomc.generic.networking.abstracts.AbstractPacketPayload;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.UUID;

@Getter
@AllArgsConstructor
@NoArgsConstructor
public class InternalPacketWrapper extends AbstractPacket {

    private AbstractPacketPayload wrapped;
    private UUID destinedForServerId = null;

}
