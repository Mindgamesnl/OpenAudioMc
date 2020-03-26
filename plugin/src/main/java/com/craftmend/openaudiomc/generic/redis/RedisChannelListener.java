package com.craftmend.openaudiomc.generic.redis;

import io.lettuce.core.pubsub.RedisPubSubAdapter;
import org.bukkit.Bukkit;
import tk.fatpackage.PlayerReplicator.PlayerReplicator;
import tk.fatpackage.PlayerReplicator.redis.packets.channels.ChannelKey;
import tk.fatpackage.PlayerReplicator.redis.packets.interfaces.PlayerPacket;

import java.lang.reflect.InvocationTargetException;
import java.util.HashMap;
import java.util.Map;

public class RedisChannelListener extends RedisPubSubAdapter<String, String> {

    private Map<ChannelKey, PlayerPacket<?>> sacreficcialPlayerPackets = new HashMap<>();
    private Map<String, ChannelKey> channelNameMap = new HashMap<>();

    public RedisChannelListener() {
        for (ChannelKey value : ChannelKey.values()) {
            try {
                sacreficcialPlayerPackets.put(value, value.getPacketClass().getConstructor().newInstance());
                channelNameMap.put(value.getRedisChannelName(), value);
            } catch (InstantiationException | IllegalAccessException | InvocationTargetException | NoSuchMethodException e) {
                e.printStackTrace();
            }
        }
    }

    @Override
    public void message(String channel, String message) {
        Bukkit.getScheduler().runTaskAsynchronously(PlayerReplicator.getInstance(), () -> {
            if (channelNameMap.containsKey(channel)) {
                ChannelKey key = channelNameMap.get(channel);
                PlayerPacket<?> handler = sacreficcialPlayerPackets.get(key);
                PlayerPacket<?> instance = handler.deSerialize(message);
                if (instance.getServerId().equals(PlayerReplicator.getInstance().getServerId())) return;
                handler.handle(key.getPacketClass().cast(instance));
            }
        });
    }
}
