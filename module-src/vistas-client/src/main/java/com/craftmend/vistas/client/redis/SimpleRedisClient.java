package com.craftmend.vistas.client.redis;

import com.craftmend.vistas.client.redis.interfaces.IRedisHandler;
import io.lettuce.core.pubsub.RedisPubSubAdapter;

public class SimpleRedisClient extends RedisPubSubAdapter<String, String> {

    private IRedisHandler handler;
    private RedisConnection senderConnection;
    private RedisConnection listenerConnection;

    public SimpleRedisClient(String host, int port, String password, IRedisHandler handler, String... channels) {
        this.handler = handler;
        this.senderConnection = new RedisConnection(host, port, password)
            .connectPubSub();
        this.listenerConnection = new RedisConnection(host, port, password)
            .connectPubSub();

        // listen to packets from Spigot To Deputy
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
