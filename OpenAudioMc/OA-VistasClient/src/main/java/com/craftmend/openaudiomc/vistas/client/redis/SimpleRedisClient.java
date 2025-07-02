package com.craftmend.openaudiomc.vistas.client.redis;

import com.craftmend.openaudiomc.vistas.client.redis.interfaces.IRedisHandler;
import io.lettuce.core.pubsub.RedisPubSubAdapter;

public class SimpleRedisClient extends RedisPubSubAdapter<String, String> {

    private IRedisHandler handler;
    private RedisConnection senderConnection;
    private RedisConnection listenerConnection;

    public SimpleRedisClient(String host,
                             int port,
                             String password,
                             boolean useSSL,
                             String sentinelMasterSet,
                             IRedisHandler handler,
                             String... channels
    ) {
        this.handler = handler;
        this.senderConnection = new RedisConnection(host, port, password, useSSL, sentinelMasterSet)
            .connectPubSub();
        this.listenerConnection = new RedisConnection(host, port, password, useSSL, sentinelMasterSet)
            .connectPubSub();

        // listen to packets from Spigot To vistas
        this.listenerConnection.getPubSubHandler().subscribe(channels);
        this.listenerConnection.addPubSubListener(new RedisPubSubAdapter<String, String>() {
            // received data
            @Override
            public void message(String channel, String message) {
                handler.onMessage(channel, message);
            }
        });
    }

    public void publish(String channel, String message) {
        senderConnection.getPubSubHandler().publish(channel, message);
    }

}
