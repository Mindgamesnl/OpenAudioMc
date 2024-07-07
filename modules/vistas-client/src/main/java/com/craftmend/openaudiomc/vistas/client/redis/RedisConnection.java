package com.craftmend.openaudiomc.vistas.client.redis;

import com.craftmend.openaudiomc.generic.logging.OpenAudioLogger;
import com.craftmend.openaudiomc.generic.storage.enums.StorageKey;
import com.craftmend.openaudiomc.vistas.client.utils.RedisUtils;
import io.lettuce.core.ClientOptions;
import io.lettuce.core.RedisClient;
import io.lettuce.core.RedisURI;
import io.lettuce.core.pubsub.RedisPubSubAdapter;
import io.lettuce.core.pubsub.StatefulRedisPubSubConnection;
import io.lettuce.core.pubsub.api.async.RedisPubSubAsyncCommands;
import io.lettuce.core.resource.ClientResources;
import io.lettuce.core.resource.DefaultClientResources;
import lombok.Getter;

public class RedisConnection {

    private static final ClientResources sharedResources = DefaultClientResources.create();

    @Getter private RedisClient redisClient;
    @Getter private StatefulRedisPubSubConnection<String, String> connection;
    @Getter private RedisPubSubAsyncCommands<String, String> pubSubHandler;

    public RedisConnection(String host,
                           int port,
                           String password,
                           boolean useSSL,
                           String sentinelMasterSet
    ) {
        // Read Redis password
        final char[] pass = password.isEmpty() || password.equals("none") ? null : password.toCharArray();
        RedisURI uri;

        if (sentinelMasterSet.isEmpty()) {
            uri = RedisURI.builder()
                    .withPassword(pass)
                    .withHost(host)
                    .withPort(port)
                    .withSsl(useSSL)
                    .build();
        } else {
            final RedisURI.Builder builder = RedisURI.builder()
                    .withPassword(pass)
                    .withSsl(useSSL)
                    .withSentinelMasterId(sentinelMasterSet);
            for (final String h : host.split(",")) {
                builder.withSentinel(RedisUtils.readRedisUri(h, 26379));
            }
            uri = builder.build();
        }

        OpenAudioLogger.info("Connecting to redis server: " + uri.toString());

        redisClient = RedisClient.create(sharedResources, uri);
        redisClient.setOptions(ClientOptions.builder().autoReconnect(true).build());
    }

    public RedisConnection connectPubSub() {
        connection = redisClient.connectPubSub();
        pubSubHandler = connection.async();
        return this;
    }

    public RedisConnection addPubSubListener(RedisPubSubAdapter<String, String> listener) {
        connection.addListener(listener);
        return this;
    }

}
