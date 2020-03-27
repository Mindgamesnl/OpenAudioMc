package com.craftmend.openaudiomc.spigot.modules.show.runnables;

import com.craftmend.openaudiomc.generic.redis.packets.ExecuteCommandPacket;
import com.craftmend.openaudiomc.spigot.OpenAudioMcSpigot;
import com.craftmend.openaudiomc.spigot.modules.show.fake.MockExecutor;
import com.craftmend.openaudiomc.spigot.modules.show.interfaces.ShowRunnable;
import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;
import org.bukkit.Bukkit;
import org.bukkit.World;

@AllArgsConstructor
@NoArgsConstructor
public class CommandRunnable extends ShowRunnable {

    private String command;
    private String worldName;
    private transient MockExecutor mockExecutor;

    @Override
    public void prepare(String serialized, World world) {
        this.command = serialized;
        this.worldName = world.getName();
        this.mockExecutor = new MockExecutor(worldName);
        if (this.command.startsWith("/")) this.command = this.command.replace("/" , "");
    }

    @Override
    public String serialize() {
        return command;
    }

    @Override
    public void run() {
        if (!isExecutedFromRedis() && !command.toLowerCase().startsWith("oa show")) new ExecuteCommandPacket(command).send();

        Bukkit.getScheduler().runTask(OpenAudioMcSpigot.getInstance(), () -> {
            Bukkit.getServer().dispatchCommand(Bukkit.getConsoleSender(), command);
        });

        /*
        todo, figure out why console senders autistic
        if (worldName == null) {
            Bukkit.getScheduler().runTask(OpenAudioMcSpigot.getInstance(), () -> {
                Bukkit.getServer().dispatchCommand(Bukkit.getConsoleSender(), command);
            });
        } else {
            Bukkit.getScheduler().runTask(OpenAudioMcSpigot.getInstance(), () -> {
                Bukkit.getServer().dispatchCommand(mockExecutor, command);
            });
        }
        */
    }
}
