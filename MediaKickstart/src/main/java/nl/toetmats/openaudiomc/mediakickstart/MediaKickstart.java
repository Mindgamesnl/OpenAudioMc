package nl.toetmats.openaudiomc.mediakickstart;

import com.craftmend.openaudiomc.spigot.OpenAudioMcSpigot;
import org.bukkit.plugin.java.JavaPlugin;

import java.time.Instant;

public final class MediaKickstart extends JavaPlugin {

    @Override
    public void onEnable() {
        // Plugin startup logic
        getLogger().info("Preparing regions...");
        Instant boot = Instant.now();
        OpenAudioMcSpigot.getInstance().getRegionModule().getRegionPropertiesMap().forEach((name, values) -> {
            values.getMedia().setStartInstant(boot.toEpochMilli());
        });

        getServer().getScheduler().scheduleAsyncRepeatingTask(this, () -> {
            OpenAudioMcSpigot.getInstance().getRegionModule().getRegionPropertiesMap().forEach((name, values) -> {
                values.getMedia().setStartInstant(boot.toEpochMilli());
            });
        }, 20, 20);
    }

    @Override
    public void onDisable() {
        // Plugin shutdown logic
    }
}
