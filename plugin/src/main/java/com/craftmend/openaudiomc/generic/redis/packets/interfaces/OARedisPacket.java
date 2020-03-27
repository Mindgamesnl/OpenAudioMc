package com.craftmend.openaudiomc.generic.redis.packets.interfaces;

import com.craftmend.openaudiomc.OpenAudioMc;
import com.craftmend.openaudiomc.generic.redis.RedisService;
import com.google.gson.reflect.TypeToken;
import lombok.Getter;
import lombok.Setter;

import java.util.UUID;

public abstract class OARedisPacket<T extends OARedisPacket<T>> {

    public abstract String serialize();

    public <T extends OARedisPacket> T deSerialize(String json) {
        return RedisService.getGSON().fromJson(json, new TypeToken<T>() {}.getType());
    }

    public void receive(OARedisPacket<T> received) {
        if (OpenAudioMc.getInstance().getRedisService().getServiceId().equals(getSenderUUID())) return;
        handle((T) received);
    }

    public abstract void handle(T received);

    @Setter @Getter private UUID senderUUID;

}
