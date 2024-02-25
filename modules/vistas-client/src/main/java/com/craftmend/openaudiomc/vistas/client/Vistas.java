package com.craftmend.openaudiomc.vistas.client;

import com.craftmend.openaudiomc.OpenAudioMc;
import com.craftmend.openaudiomc.api.enums.ModuleEvent;
import com.craftmend.openaudiomc.api.interfaces.ExternalModule;
import com.craftmend.openaudiomc.generic.commands.CommandService;
import com.craftmend.openaudiomc.generic.commands.enums.CommandContext;
import com.craftmend.openaudiomc.generic.environment.MagicValue;
import com.craftmend.openaudiomc.generic.proxy.interfaces.UserHooks;
import com.craftmend.openaudiomc.generic.state.StateService;
import com.craftmend.openaudiomc.generic.user.User;
import com.craftmend.openaudiomc.spigot.OpenAudioMcSpigot;
import com.craftmend.openaudiomc.spigot.modules.proxy.ProxyModule;
import com.craftmend.openaudiomc.vistas.client.client.ClientUserHooks;
import com.craftmend.openaudiomc.vistas.client.client.VistasRedisClient;
import com.craftmend.openaudiomc.vistas.client.commands.VistasEvalCommand;
import com.craftmend.openaudiomc.vistas.client.commands.VistasLinkCommand;
import com.craftmend.openaudiomc.vistas.client.listeners.PlayerListener;
import com.craftmend.openaudiomc.vistas.client.redis.packets.ServerClosePacket;
import com.craftmend.openaudiomc.vistas.client.redis.packets.ServerRegisterPacket;
import com.craftmend.openaudiomc.vistas.client.redis.packets.UserJoinPacket;
import lombok.Getter;
import org.bukkit.Bukkit;
import org.bukkit.entity.Player;
import org.bukkit.event.Listener;

import java.util.UUID;

public final class Vistas extends ExternalModule implements Listener {

    @Getter
    private static Vistas instance;
    @Getter
    private UUID serverId = UUID.randomUUID();

    public Vistas() {
        instance = this;
        MagicValue.overWrite(MagicValue.NOTIFY_VOICECHAT_SLOT_DEPLETION, false);
        MagicValue.overWrite(MagicValue.FORCE_SERVER_NODE, true);
        OpenAudioMc.getService(ProxyModule.class).refresh();
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
        OpenAudioMc.getService(ProxyModule.class).refresh();
    }

    @Override
    public void on(ModuleEvent event) {
        OpenAudioMc.getService(StateService.class).setState(new VistasNodeState());
        OpenAudioMc.getService(ProxyModule.class).refresh();
        if (event == ModuleEvent.PLATFORM_LOADED) {
            // finished startup
            OpenAudioMc.getService(CommandService.class).registerSubCommands(
                    CommandContext.OPENAUDIOMC,
                    new VistasEvalCommand(),
                    new VistasLinkCommand()
            );
        }

        if (event == ModuleEvent.MODULES_LOADED) {
            OpenAudioMc.getInstance().getServiceManager().registerDependency(UserHooks.class, new ClientUserHooks());
        }

        if (event == ModuleEvent.SERVICES_LOADED) {
            // mid boot
            OpenAudioMc.getInstance().getServiceManager().loadServices(VistasRedisClient.class);
            OpenAudioMcSpigot s = OpenAudioMcSpigot.getInstance();
            s.getServer().getPluginManager().registerEvents(new PlayerListener(this), s);

            // register self after a bit
            Bukkit.getScheduler().runTaskLater(OpenAudioMcSpigot.getInstance(), this::registerSelf, 80); // 4 seconds
        }

        if (event == ModuleEvent.SHUTDOWN) {
            OpenAudioMc.getService(VistasRedisClient.class).sendPacket(new ServerClosePacket(serverId));
        }
    }

    public void registerSelf() {
        OpenAudioMc.getService(VistasRedisClient.class).sendPacket(new ServerRegisterPacket(serverId));
        for (Player onlinePlayer : Bukkit.getOnlinePlayers()) {
            User user = OpenAudioMc.resolveDependency(UserHooks.class).byUuid(onlinePlayer.getUniqueId());

            if (user == null) {
                continue;
            }

            OpenAudioMc.getService(VistasRedisClient.class).sendPacket(
                    new UserJoinPacket(
                            onlinePlayer.getName(),
                            onlinePlayer.getUniqueId(),
                            serverId,
                            user.getIpAddress()
                    )
            );
        }
    }

}
