package com.craftmend.openaudiomc.generic.redis.packets.interfaces;

import com.craftmend.openaudiomc.OpenAudioMc;
import lombok.Getter;
import lombok.Setter;

import java.util.UUID;

public abstract class OARedisPacket<T extends OARedisPacket<T>> {

    public abstract String serialize();

    public abstract <T extends OARedisPacket> T deSerialize(String json);

    public OARedisPacket<T> receive(OARedisPacket<T> received) {
        if (OpenAudioMc.getInstance().getRedisService().getServiceId().equals(getSenderUUID())) return received;
        handle((T) received);
        return received;
    }

    public abstract void handle(T received);

    @Setter @Getter private UUID senderUUID;

}
