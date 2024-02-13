package com.craftmend.openaudiomc.generic.redis;

import com.craftmend.openaudiomc.OpenAudioMc;
import com.craftmend.openaudiomc.generic.commands.CommandService;
import com.craftmend.openaudiomc.generic.commands.enums.CommandContext;
import com.craftmend.openaudiomc.generic.commands.subcommands.RedisSubCommand;
import com.craftmend.openaudiomc.generic.logging.OpenAudioLogger;
import com.craftmend.openaudiomc.generic.platform.interfaces.TaskService;
import com.craftmend.openaudiomc.generic.redis.packets.ExecuteBulkCommandsPacket;
import com.craftmend.openaudiomc.generic.redis.packets.ExecuteCommandPacket;
import com.craftmend.openaudiomc.generic.redis.packets.channels.ChannelKey;
import com.craftmend.openaudiomc.generic.redis.packets.interfaces.OARedisPacket;
import com.craftmend.openaudiomc.generic.redis.packets.models.WaitingPacket;
import com.craftmend.openaudiomc.generic.service.Inject;
import com.craftmend.openaudiomc.generic.service.Service;
import com.craftmend.openaudiomc.generic.storage.enums.StorageKey;
import com.craftmend.openaudiomc.generic.storage.interfaces.Configuration;
import com.craftmend.openaudiomc.generic.utils.redis.RedisUtils;
import io.lettuce.core.ClientOptions;
import io.lettuce.core.RedisClient;
import io.lettuce.core.RedisURI;
import io.lettuce.core.pubsub.StatefulRedisPubSubConnection;
import io.lettuce.core.pubsub.api.async.RedisPubSubAsyncCommands;
import lombok.Getter;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.UUID;
import java.util.concurrent.ConcurrentLinkedQueue;

public class RedisService extends Service {

    // dependencies
    @Inject
    private Configuration Configuration;
    private RedisClient redisPub;
    private RedisClient redisSub;
    private RedisURI uri;
    private StatefulRedisPubSubConnection<String, String> redisSubConnection;
    private StatefulRedisPubSubConnection<String, String> redisPubConnection;
    @Getter private RedisPubSubAsyncCommands<String, String> asyncSub;
    private RedisPubSubAsyncCommands<String, String> asyncPub;
    private boolean enabled = false;
    @Getter private final UUID serviceId = UUID.randomUUID();
    private final ConcurrentLinkedQueue<WaitingPacket> packetQue = new ConcurrentLinkedQueue<>();

    private final Runnable messageQueHandler = () -> {
        // combine all the commands
        if (packetQue.isEmpty()) return;
        List<String> commands = new ArrayList<>();

        // try to generify the set
        for (WaitingPacket packet : packetQue) {
            if (packet.getPacket() instanceof ExecuteCommandPacket) {
                String command = ((ExecuteCommandPacket) packet.getPacket()).getCommand();
                if (!command.toLowerCase().startsWith("oa show") && !command.toLowerCase().startsWith("openaudio show") && !command.toLowerCase().startsWith("openaudiomc show")) {
                    commands.add(command);
                }
                packetQue.remove(packet);
            }
        }

        // send all other packets
        for (WaitingPacket packet : packetQue) {
            asyncPub.publish(packet.getChannel().getRedisChannelName(), packet.getPacket().serialize());
        }

        // if there are bulk packets waiting, send them
        if (commands.isEmpty()) return;
        asyncPub.publish(ChannelKey.TRIGGER_BULK_COMMANDS.getRedisChannelName(), new ExecuteBulkCommandsPacket(commands).serialize());
    };

    public RedisService() {

    }

    @Override
    public void onEnable() {
        if (!Arrays.stream(ChannelKey.values()).anyMatch(value -> value.getTargetPlatform() == OpenAudioMc.getInstance().getPlatform())) return;
        if (!Configuration.getBoolean(StorageKey.REDIS_ENABLED)) return;
        enabled = true;

        OpenAudioLogger.info("Enabling redis service..");

        // Read Redis password
        final String redisPass = Configuration.getString(StorageKey.REDIS_PASSWORD);
        final char[] password = redisPass.isEmpty() || redisPass.equals("none") ? null : redisPass.toCharArray();

        if (Configuration.getString(StorageKey.REDIS_SENTINEL_MASTER_SET).isEmpty()) {
            uri = RedisURI.builder()
                    .withPassword(password)
                    .withHost(Configuration.getString(StorageKey.REDIS_HOST))
                    .withPort(Configuration.getInt(StorageKey.REDIS_PORT))
                    .withSsl(Configuration.getBoolean(StorageKey.REDIS_USE_SSL))
                    .build();
        } else {
            final RedisURI.Builder builder = RedisURI.builder()
                    .withPassword(password)
                    .withSsl(Configuration.getBoolean(StorageKey.REDIS_USE_SSL))
                    .withSentinelMasterId(Configuration.getString(StorageKey.REDIS_SENTINEL_MASTER_SET));
            for (final String host : Configuration.getString(StorageKey.REDIS_HOST).split(",")) {
                builder.withSentinel(RedisUtils.readRedisUri(host, 26379));
            }
            uri = builder.build();
        }

        OpenAudioLogger.info("Connecting to redis server: " + uri.toString());

        // set up listener
        redisSub = RedisClient.create(uri);
        redisSub.setOptions(ClientOptions.builder().autoReconnect(true).build());
        redisSubConnection = redisSub.connectPubSub();
        redisSubConnection.addListener(new RedisChannelListener());
        asyncSub = redisSubConnection.async();

        for (ChannelKey value : ChannelKey.values()) {
            if (value.getTargetPlatform().equals(OpenAudioMc.getInstance().getPlatform())) asyncSub.subscribe(value.getRedisChannelName());
        }

        // set up publisher
        redisPub = RedisClient.create(uri);
        redisPub.setOptions(ClientOptions.builder().autoReconnect(true).build());
        redisPubConnection = redisPub.connectPubSub();
        asyncPub = redisPubConnection.async();

        // queue handler
        OpenAudioMc.resolveDependency(TaskService.class).scheduleAsyncRepeatingTask(messageQueHandler, 1, 1);

        // enable command
        OpenAudioMc.getService(CommandService.class).registerSubCommands(CommandContext.OPENAUDIOMC, new RedisSubCommand(this));

        OpenAudioLogger.info("Enabled redis service!");
    }

    public void sendMessage(ChannelKey key, OARedisPacket packet) {
        if (!enabled) return;
        packet.setSenderUUID(serviceId);
        packetQue.add(new WaitingPacket(key, packet));
    }

    public void shutdown() {
        if (!enabled) return;
        redisSubConnection.close();
        redisSub.shutdown();
        redisPubConnection.close();
        redisPub.shutdown();
    }

}
