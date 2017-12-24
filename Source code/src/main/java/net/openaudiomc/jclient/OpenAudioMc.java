package net.openaudiomc.jclient;

import lombok.Getter;
import net.openaudiomc.jclient.modules.commands.CommandsModule;
import net.openaudiomc.jclient.modules.player.PlayerModule;
import net.openaudiomc.jclient.modules.socket.SocketModule;
import net.openaudiomc.jclient.modules.socket.objects.ApiEndpoints;
import net.openaudiomc.jclient.utils.Reflection;
import org.bukkit.plugin.java.JavaPlugin;

import java.io.File;

    public final class OpenAudioMc extends JavaPlugin {

    @Getter private PlayerModule playerModule;
    @Getter private SocketModule socketModule;
    @Getter private CommandsModule commandsModule;
    @Getter private static OpenAudioMc instance;
    @Getter private ApiEndpoints apiEndpoints;
    @Getter private Reflection reflection;

    @Override
    public void onEnable() {
        apiEndpoints = new ApiEndpoints();

        if (!new File(getDataFolder(), "config.yml").exists()) {
            saveResource("config.yml", false);
        }

        reloadConfig();

        playerModule = new PlayerModule(this);
        socketModule = new SocketModule(this);
        commandsModule = new CommandsModule(this);
        reflection = new Reflection(this);
        instance = this;
    }

    @Override
    public void onDisable() {
        socketModule.getSocket().close();
        // Plugin shutdown logic
    }
}
