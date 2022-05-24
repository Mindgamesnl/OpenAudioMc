package com.craftmend.vistas.client.redis.handlers;

import com.craftmend.openaudiomc.OpenAudioMc;
import com.craftmend.openaudiomc.generic.networking.abstracts.AbstractPacketPayload;
import com.craftmend.vistas.client.redis.interfaces.IRedisHandler;
import com.craftmend.vistas.client.redis.packets.InternalPacketWrapper;
import lombok.Setter;

import java.util.HashMap;
import java.util.Map;
import java.util.UUID;

public class DefaultPacketHandler implements IRedisHandler {

    private Map<Class<?>, RedisPacketEvent<?>> eventMap = new HashMap<>();
    @Setter private UUID selfId = null;

    @Override
    public <T extends AbstractPacketPayload> RedisPacketEvent<T> registerPacket(Class<T> packetType) {
        RedisPacketEvent<T> handler = new RedisPacketEvent<T>();
        eventMap.put(packetType, handler);
        return handler;
    }

    @Override
    public void onMessage(String channel, String message) {
        // parse packet
        InternalPacketWrapper ipw = OpenAudioMc.getGson().fromJson(message, InternalPacketWrapper.class);
        AbstractPacketPayload packet = ipw.getWrapped();
        RedisPacketEvent<?> handler = eventMap.get(packet.getClass());
        if (selfId != null && ipw.getDestinedForServerId() != null) {
            if (!ipw.getDestinedForServerId().equals(selfId)) {
                return;
            }
        }
        if (handler != null) handler.call(packet);
    }
}
