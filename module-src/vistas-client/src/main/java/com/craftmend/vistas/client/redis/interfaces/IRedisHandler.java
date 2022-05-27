package com.craftmend.vistas.client.redis.interfaces;

import com.craftmend.openaudiomc.generic.networking.abstracts.AbstractPacketPayload;
import com.craftmend.vistas.client.redis.handlers.RedisPacketEvent;
import com.craftmend.vistas.client.redis.packets.InternalPacketWrapper;

public interface IRedisHandler {

    <T extends AbstractPacketPayload> RedisPacketEvent<T> registerPacket(Class<T> packetType);

    void onMessage(String channel, String message);

    void handlePacket(InternalPacketWrapper ipw, AbstractPacketPayload packet);

}
