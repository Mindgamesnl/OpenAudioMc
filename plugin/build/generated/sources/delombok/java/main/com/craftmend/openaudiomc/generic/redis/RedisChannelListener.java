package com.craftmend.openaudiomc.generic.redis;

import com.craftmend.openaudiomc.generic.logging.OpenAudioLogger;
import com.craftmend.openaudiomc.generic.redis.packets.channels.ChannelKey;
import com.craftmend.openaudiomc.generic.redis.packets.interfaces.OARedisPacket;
import io.lettuce.core.pubsub.RedisPubSubAdapter;

import java.lang.reflect.InvocationTargetException;
import java.util.HashMap;
import java.util.Map;

public class RedisChannelListener extends RedisPubSubAdapter<String, String> {

    private final Map<ChannelKey, OARedisPacket> sacreficcialPlayerPackets = new HashMap<>();
    private final Map<String, ChannelKey> channelNameMap = new HashMap<>();

    public RedisChannelListener() {
        for (ChannelKey value : ChannelKey.values()) {
            try {
                sacreficcialPlayerPackets.put(value, value.getPacketClass().getConstructor().newInstance());
                channelNameMap.put(value.getRedisChannelName(), value);
            } catch (InstantiationException | IllegalAccessException | InvocationTargetException | NoSuchMethodException e) {
                OpenAudioLogger.error(e, "Failed to create packet instance for " + value.name());
            }
        }
    }

    @Override
    public void message(String channel, String message) {
        if (channelNameMap.containsKey(channel)) {
            ChannelKey key = channelNameMap.get(channel);
            OARedisPacket handler = sacreficcialPlayerPackets.get(key);
            handler.receive(handler.deSerialize(message));
        }
    }
}
