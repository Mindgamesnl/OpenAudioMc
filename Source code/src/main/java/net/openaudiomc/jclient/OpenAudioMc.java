    package net.openaudiomc.jclient;

import lombok.Getter;
import net.openaudiomc.jclient.modules.player.PlayerModule;
import net.openaudiomc.jclient.modules.socket.SocketModule;
import org.bukkit.plugin.java.JavaPlugin;

public final class OpenAudioMc extends JavaPlugin {

    @Getter private PlayerModule playerModule;
    @Getter private SocketModule socketModule;
    @Getter private static OpenAudioMc instance;

    @Override
    public void onEnable() {
        playerModule = new PlayerModule(this);
        socketModule = new SocketModule(this);
        instance = this;
    }

    @Override
    public void onDisable() {
        // Plugin shutdown logic
    }
}
