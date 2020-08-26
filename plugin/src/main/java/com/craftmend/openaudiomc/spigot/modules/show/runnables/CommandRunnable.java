package com.craftmend.openaudiomc.spigot.modules.show.runnables;

import com.craftmend.openaudiomc.generic.redis.packets.ExecuteCommandPacket;
import com.craftmend.openaudiomc.spigot.OpenAudioMcSpigot;
import com.craftmend.openaudiomc.spigot.modules.show.interfaces.ShowRunnable;
import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;
import org.bukkit.Bukkit;
import org.bukkit.World;
import org.bukkit.entity.Entity;

@AllArgsConstructor
@NoArgsConstructor
public class CommandRunnable extends ShowRunnable {

    private String command;
    private String worldName;

    @Override
    public void prepare(String serialized, World world) {
        this.command = serialized;
        this.worldName = world.getName();
        if (this.command.startsWith("/")) this.command = this.command.replace("/" , "");
    }

    @Override
    public String serialize() {
        return command;
    }

    @Override
    public void run() {
        if (!isExecutedFromRedis() && !command.toLowerCase().startsWith("oa show")) new ExecuteCommandPacket(command).send();
        
        if (worldName == null) {
            Bukkit.getScheduler().runTask(OpenAudioMcSpigot.getInstance(), () -> Bukkit.getServer().dispatchCommand(Bukkit.getConsoleSender(), command));
        } else {
            Entity executor = getExecutorEntity(worldName);

            if (executor == null) {
                throw new IllegalStateException("There is no entity loaded to execute the show trigger");
            }

            Bukkit.getScheduler().runTask(OpenAudioMcSpigot.getInstance(), () -> Bukkit.getServer().dispatchCommand(executor, command));
        }
    }
}
