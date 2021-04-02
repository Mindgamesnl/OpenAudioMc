package com.craftmend.openaudiomc.generic.redis.packets.interfaces;

import com.craftmend.openaudiomc.OpenAudioMc;
import com.craftmend.openaudiomc.generic.redis.RedisService;
import lombok.Getter;
import lombok.Setter;

import java.util.UUID;

public abstract class OARedisPacket {

    public abstract String serialize();

    public OARedisPacket deSerialize(String json) {

        return OpenAudioMc.getGson().fromJson(json, getClass());
    }

    public void receive(OARedisPacket received) {
        if (OpenAudioMc.getInstance().getRedisService().getServiceId().equals(getSenderUUID())) return;
        handle(received);
    }

    public abstract void handle(OARedisPacket received);

    @Setter @Getter private UUID senderUUID;

}
