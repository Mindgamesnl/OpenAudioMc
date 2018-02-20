package net.openaudiomc.jclient;

import lombok.Getter;

import net.openaudiomc.jclient.modules.commands.CommandsModule;
import net.openaudiomc.jclient.modules.media.MediaModule;
import net.openaudiomc.jclient.modules.player.PlayerModule;
import net.openaudiomc.jclient.modules.socket.SocketModule;
import net.openaudiomc.jclient.modules.socket.objects.ApiEndpoints;
import net.openaudiomc.jclient.utils.config.Config;
import net.openaudiomc.jclient.utils.Reflection;

import org.bukkit.plugin.java.JavaPlugin;

public final class OpenAudioMc extends JavaPlugin {

    //yek static
    @Getter private static OpenAudioMc instance;

    //config
    @Getter private Config conf;

    //modules
    @Getter private PlayerModule playerModule;
    @Getter private SocketModule socketModule;
    @Getter private CommandsModule commandsModule;
    @Getter private ApiEndpoints apiEndpoints;
    @Getter private Reflection reflection;
    @Getter private MediaModule mediaModule;

    @Override
    public void onEnable() {
        instance = this;

        conf = new Config();
        conf.load();

        apiEndpoints = new ApiEndpoints();

        playerModule = new PlayerModule(this);
        socketModule = new SocketModule(this);
        commandsModule = new CommandsModule(this);
        reflection = new Reflection(this);
        mediaModule = new MediaModule(this);
    }

    @Override
    public void onDisable() {
        socketModule.closeConnection();
        //conf.save();
        // Plugin shutdown logic
    }
}
