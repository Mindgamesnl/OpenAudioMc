package gg.hangouts.deputy.shared.redis;

import com.craftmend.thirdparty.iolettuce.core.ClientOptions;
import com.craftmend.thirdparty.iolettuce.core.RedisClient;
import com.craftmend.thirdparty.iolettuce.core.RedisURI;
import com.craftmend.thirdparty.iolettuce.core.pubsub.RedisPubSubAdapter;
import com.craftmend.thirdparty.iolettuce.core.pubsub.StatefulRedisPubSubConnection;
import com.craftmend.thirdparty.iolettuce.core.pubsub.api.async.RedisPubSubAsyncCommands;
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
