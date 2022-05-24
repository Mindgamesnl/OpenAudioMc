package com.craftmend.vistas.client.redis;

import io.lettuce.core.ClientOptions;
import io.lettuce.core.RedisClient;
import io.lettuce.core.RedisURI;
import io.lettuce.core.pubsub.RedisPubSubAdapter;
import io.lettuce.core.pubsub.StatefulRedisPubSubConnection;
import io.lettuce.core.pubsub.api.async.RedisPubSubAsyncCommands;
import lombok.Getter;

public class RedisConnection {

    @Getter private RedisClient redisClient;
    @Getter private StatefulRedisPubSubConnection<String, String> connection;
    @Getter private RedisPubSubAsyncCommands<String, String> pubSubHandler;

    public RedisConnection(String host, int port, String password) {
        RedisURI uri = RedisURI.builder()
                .withPassword(password)
                .withHost(host)
                .withPort(port)
                .withSsl(false)
                .build();

        redisClient = RedisClient.create(uri);
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
