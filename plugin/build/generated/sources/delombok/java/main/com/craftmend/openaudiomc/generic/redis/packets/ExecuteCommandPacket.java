package com.craftmend.openaudiomc.generic.redis.packets;

import com.craftmend.openaudiomc.OpenAudioMc;
import com.craftmend.openaudiomc.generic.redis.RedisService;
import com.craftmend.openaudiomc.generic.redis.packets.channels.ChannelKey;
import com.craftmend.openaudiomc.generic.redis.packets.interfaces.OARedisPacket;
import com.craftmend.openaudiomc.spigot.modules.show.runnables.CommandRunnable;
import org.bukkit.Bukkit;

public class ExecuteCommandPacket extends OARedisPacket {
    private String command;

    @Override
    public String serialize() {
        return OpenAudioMc.getGson().toJson(this);
    }

    @Override
    public void handle(OARedisPacket a) {
        ExecuteCommandPacket received = (ExecuteCommandPacket) a;
        CommandRunnable commandRunnable = new CommandRunnable();
        commandRunnable.prepare(received.getCommand(), Bukkit.getWorlds().get(0));
        commandRunnable.setExecutedFromRedis(true);
        commandRunnable.run();
    }

    public void send() {
        OpenAudioMc.getService(RedisService.class).sendMessage(ChannelKey.TRIGGER_COMMAND, this);
    }

    public ExecuteCommandPacket() {
    }

    public ExecuteCommandPacket(final String command) {
        this.command = command;
    }

    public String getCommand() {
        return this.command;
    }
}
