package com.craftmend.openaudiomc.generic.redis.packets;

import com.craftmend.openaudiomc.OpenAudioMc;
import com.craftmend.openaudiomc.generic.redis.RedisService;
import com.craftmend.openaudiomc.generic.redis.packets.channels.ChannelKey;
import com.craftmend.openaudiomc.generic.redis.packets.interfaces.OARedisPacket;
import com.craftmend.openaudiomc.spigot.modules.show.runnables.CommandRunnable;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@AllArgsConstructor
public class ExecuteCommandPacket extends OARedisPacket<ExecuteCommandPacket> {

    @Getter private String command;

    @Override
    public String serialize() {
        return RedisService.getGSON().toJson(this);
    }

    @Override
    public void handle(ExecuteCommandPacket received) {
        CommandRunnable commandRunnable = new CommandRunnable();
        commandRunnable.prepare(command, null);
        commandRunnable.setExecutedFromRedis(true);
        commandRunnable.run();
    }

    public void send() {
        OpenAudioMc.getInstance().getRedisService().sendMessage(ChannelKey.TRIGGER_COMMAND, this);
    }
}
