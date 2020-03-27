package com.craftmend.openaudiomc.generic.redis.packets.interfaces;

import lombok.Getter;
import lombok.Setter;

import java.util.UUID;

public abstract class OARedisPacket<T extends OARedisPacket<T>> {

    public abstract String serialize();

    public abstract <T extends OARedisPacket> T deSerialize(String json);

    public OARedisPacket<T> receive(OARedisPacket<T> received) {
        // TODO: check sender id and channel

        handle((T) received);
        return received;
    }

    public abstract void handle(T received);

    @Getter
    @Setter
    private UUID packetUUID = UUID.randomUUID();

}
