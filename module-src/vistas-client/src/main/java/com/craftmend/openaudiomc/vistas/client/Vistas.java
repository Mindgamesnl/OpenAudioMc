package com.craftmend.openaudiomc.vistas.client;

import com.craftmend.openaudiomc.OpenAudioMc;
import com.craftmend.openaudiomc.api.enums.ModuleEvent;
import com.craftmend.openaudiomc.api.interfaces.ExternalModule;
import com.craftmend.openaudiomc.generic.commands.CommandService;
import com.craftmend.openaudiomc.generic.environment.MagicValue;
import com.craftmend.openaudiomc.generic.proxy.interfaces.UserHooks;
import com.craftmend.openaudiomc.spigot.OpenAudioMcSpigot;
import com.craftmend.openaudiomc.vistas.client.client.ClientUserHooks;
import com.craftmend.openaudiomc.vistas.client.client.VistasRedisClient;
import com.craftmend.openaudiomc.vistas.client.commands.VistasEvalCommand;
import com.craftmend.openaudiomc.vistas.client.listeners.PlayerListener;
import com.craftmend.openaudiomc.vistas.client.redis.packets.ServerRegisterPacket;
import com.craftmend.openaudiomc.vistas.client.redis.packets.UserJoinPacket;
import lombok.Getter;
import org.bukkit.Bukkit;
import org.bukkit.entity.Player;
import org.bukkit.event.Listener;

import java.util.UUID;

public final class Vistas extends ExternalModule implements Listener {

    @Getter private static Vistas instance;
    @Getter private UUID serverId = UUID.randomUUID();

    public Vistas() {
        instance = this;
        MagicValue.overWrite(MagicValue.NOTIFY_VOICECHAT_SLOT_DEPLETION, false);
        MagicValue.overWrite(MagicValue.FORCE_SERVER_NODE, true);
    }

    @Override
    public String getName() {
        return "Vistas-Client";
    }

    @Override
    public String getDescription() {
        return "A vista client implementation.";
    }

    @Override
    public void onInitialize() {
        log("Injecting Vista networking modules");
    }

    @Override
    public void on(ModuleEvent event) {
        if (event == ModuleEvent.PLATFORM_LOADED) {
            // finished startup
            OpenAudioMc.getService(CommandService.class).registerSubCommand(new VistasEvalCommand());
        }

        if (event == ModuleEvent.SERVICES_LOADED) {
            // mid boot
            OpenAudioMc.getInstance().getServiceManager().loadServices(VistasRedisClient.class);
            OpenAudioMc.getInstance().getServiceManager().registerDependency(UserHooks.class, new ClientUserHooks());
            OpenAudioMcSpigot s = OpenAudioMcSpigot.getInstance();
            s.getServer().getPluginManager().registerEvents(new PlayerListener(this), s);
        }
    }

    public void registerSelf() {
        OpenAudioMc.getService(VistasRedisClient.class).sendPacket(new ServerRegisterPacket(serverId));
        for (Player onlinePlayer : Bukkit.getOnlinePlayers()) {
            OpenAudioMc.getService(VistasRedisClient.class).sendPacket(
                    new UserJoinPacket(
                            onlinePlayer.getName(),
                            onlinePlayer.getUniqueId(),
                            serverId
                    )
            );
        }
    }

}
