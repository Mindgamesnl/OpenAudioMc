package com.craftmend.vistas.client.packets;

import com.craftmend.openaudiomc.generic.networking.abstracts.AbstractPacketPayload;
import com.craftmend.vistas.client.reflection.SerializedCall;
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
