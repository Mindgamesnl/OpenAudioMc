package com.craftmend.openaudiomc.spigot.modules.show.runnables;

import com.craftmend.openaudiomc.spigot.OpenAudioMcSpigot;
import com.craftmend.openaudiomc.spigot.modules.show.fake.MockExecutor;
import com.craftmend.openaudiomc.spigot.modules.show.interfaces.ShowRunnable;
import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;
import org.bukkit.Bukkit;

@AllArgsConstructor
@NoArgsConstructor
public class CommandRunnable extends ShowRunnable {

    private String command;
    private MockExecutor mockExecutor = new MockExecutor();

    @Override
    public void prepare(String serialized) {
        this.command = serialized;
        if (this.command.startsWith("/")) this.command = this.command.replace("/" , "");
    }

    @Override
    public String serialize() {
        return command;
    }

    @Override
    public void run() {
        Bukkit.getScheduler().runTask(OpenAudioMcSpigot.getInstance(), () -> {
            Bukkit.getServer().dispatchCommand(Bukkit.getConsoleSender(), command);
        });
    }
}
