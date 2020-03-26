package com.craftmend.openaudiomc.generic.redis.packets.interfaces;

import lombok.Getter;
import lombok.Setter;

import java.util.UUID;

public abstract class OARedisPacket<T extends OARedisPacket<T>> {

    public abstract String serialize();
    public abstract T deSerialize(String json);
    public abstract void handle (T received);

    @Getter @Setter private UUID packetUUID = UUID.randomUUID();

}
