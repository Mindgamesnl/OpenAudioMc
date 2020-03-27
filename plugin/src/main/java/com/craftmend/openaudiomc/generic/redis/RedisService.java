package com.craftmend.openaudiomc.generic.redis;

import com.craftmend.openaudiomc.generic.interfaces.ConfigurationInterface;
import com.craftmend.openaudiomc.generic.loggin.OpenAudioLogger;
import com.craftmend.openaudiomc.generic.redis.packets.channels.ChannelKey;
import com.craftmend.openaudiomc.generic.redis.packets.interfaces.OARedisPacket;
import com.craftmend.openaudiomc.generic.storage.enums.StorageKey;
import com.google.gson.Gson;
import io.lettuce.core.ClientOptions;
import io.lettuce.core.RedisClient;
import io.lettuce.core.RedisURI;
import io.lettuce.core.pubsub.StatefulRedisPubSubConnection;
import io.lettuce.core.pubsub.api.async.RedisPubSubAsyncCommands;
import lombok.Getter;

import java.util.UUID;

public class RedisService {

    private RedisClient redisPub;
    private RedisClient redisSub;
    private RedisURI uri;
    private StatefulRedisPubSubConnection<String, String> redisSubConnection;
    private StatefulRedisPubSubConnection<String, String> redisPubConnection;
    private RedisPubSubAsyncCommands<String, String> asyncSub;
    private RedisPubSubAsyncCommands<String, String> asyncPub;
    @Getter private static final Gson GSON = new Gson();
    private boolean enabled = false;
    @Getter private UUID serviceId = UUID.randomUUID();

    public RedisService(ConfigurationInterface configurationInterface) {
        if (!configurationInterface.getBoolean(StorageKey.REDIS_ENABLED)) return;
        enabled = true;

        OpenAudioLogger.toConsole("Enabling redis service..");

        if (configurationInterface.getString(StorageKey.REDIS_PASSWORD).equals("none")) {
            uri = RedisURI.builder()
                    .withHost(configurationInterface.getString(StorageKey.REDIS_HOST))
                    .withPort(configurationInterface.getInt(StorageKey.REDIS_PORT))
                    .withSsl(configurationInterface.getBoolean(StorageKey.REDIS_USE_SSL))
                    .build();
        } else {
            uri = RedisURI.builder()
                    .withPassword(configurationInterface.getString(StorageKey.REDIS_PASSWORD))
                    .withHost(configurationInterface.getString(StorageKey.REDIS_HOST))
                    .withPort(configurationInterface.getInt(StorageKey.REDIS_PORT))
                    .withSsl(configurationInterface.getBoolean(StorageKey.REDIS_USE_SSL))
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
        OpenAudioLogger.toConsole("Enabled redis service!");
    }

    public void sendMessage(ChannelKey key, OARedisPacket<?> packet) {
        if (!enabled) return;
        packet.setSenderUUID(serviceId);
        asyncPub.publish(key.getRedisChannelName(), packet.serialize());
    }

    public void shutdown() {
        if (!enabled) return;
        redisSubConnection.close();
        redisSub.shutdown();
        redisPubConnection.close();
        redisPub.shutdown();
    }

}
