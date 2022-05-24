package gg.hangouts.deputy.shared.redis.interfaces;

import com.craftmend.openaudiomc.generic.networking.abstracts.AbstractPacketPayload;
import gg.hangouts.deputy.shared.redis.handlers.RedisPacketEvent;

public interface IRedisHandler {

    <T extends AbstractPacketPayload> RedisPacketEvent<T> registerPacket(Class<T> packetType);

    void onMessage(String channel, String message);

}
