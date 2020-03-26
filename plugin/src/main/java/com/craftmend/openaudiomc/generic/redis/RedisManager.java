package com.craftmend.openaudiomc.generic.redis;

import com.craftmend.openaudiomc.generic.interfaces.ConfigurationInterface;
import com.craftmend.openaudiomc.generic.redis.packets.channels.ChannelKey;
import com.craftmend.openaudiomc.generic.redis.packets.interfaces.OARedisPacket;
import com.google.gson.Gson;
import io.lettuce.core.ClientOptions;
import io.lettuce.core.RedisClient;
import io.lettuce.core.RedisURI;
import io.lettuce.core.pubsub.StatefulRedisPubSubConnection;
import io.lettuce.core.pubsub.api.async.RedisPubSubAsyncCommands;
import lombok.Getter;

public class RedisManager {

    private RedisClient redisPub;
    private RedisClient redisSub;
    private RedisURI uri;
    private StatefulRedisPubSubConnection<String, String> redisSubConnection;
    private StatefulRedisPubSubConnection<String, String> redisPubConnection;
    private RedisPubSubAsyncCommands<String, String> asyncSub;
    private RedisPubSubAsyncCommands<String, String> asyncPub;
    @Getter
    private static final Gson GSON = new Gson();

    public RedisManager(ConfigurationInterface configurationInterface) {

        if (config.getString("redis.password").equals("none")) {
            uri = RedisURI.builder()
                    .withHost(config.getString("redis.host"))
                    .withPort(config.getInt("redis.port"))
                    .withSsl(false)
                    .build();
        } else {
            uri = RedisURI.builder()
                    .withPassword(config.getString("redis.password"))
                    .withHost(config.getString("redis.host"))
                    .withPort(config.getInt("redis.port"))
                    .withSsl(false)
                    .build();
        }

        // set up listener
        redisSub = RedisClient.create(uri);
        redisSub.setOptions(ClientOptions.builder().autoReconnect(true).build());
        redisSubConnection = redisSub.connectPubSub();
        redisSubConnection.addListener(new RedisChannelListener());
        asyncSub = redisSubConnection.async();

        for (ChannelKey value : ChannelKey.values()) {
            asyncSub.subscribe(value.getRedisChannelName());
        }

        // set up publisher
        redisPub = RedisClient.create(uri);
        redisPub.setOptions(ClientOptions.builder().autoReconnect(true).build());
        redisPubConnection = redisPub.connectPubSub();
        asyncPub = redisPubConnection.async();

    }

    public void sendMessage(ChannelKey key, OARedisPacket<?> packet) {
        asyncPub.publish(key.getRedisChannelName(), packet.serialize());
    }

    public void shutdown() {
        redisSubConnection.close();
        redisSub.shutdown();
        redisPubConnection.close();
        redisPub.shutdown();
    }

}
