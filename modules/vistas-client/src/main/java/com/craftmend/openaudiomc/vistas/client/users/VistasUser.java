package com.craftmend.openaudiomc.vistas.client.users;

import com.craftmend.openaudiomc.OpenAudioMc;
import com.craftmend.openaudiomc.generic.client.helpers.SerializableClient;
import com.craftmend.openaudiomc.generic.logging.OpenAudioLogger;
import com.craftmend.openaudiomc.generic.networking.interfaces.NetworkingService;
import com.craftmend.openaudiomc.generic.platform.Platform;
import com.craftmend.openaudiomc.generic.proxy.ProxyHostService;
import com.craftmend.openaudiomc.generic.user.User;
import com.craftmend.openaudiomc.vistas.client.redis.packets.InvokeUserPacket;
import com.craftmend.openaudiomc.vistas.client.reflection.SerializedCall;
import com.craftmend.openaudiomc.vistas.client.reflection.SerializedParameter;
import com.craftmend.openaudiomc.vistas.client.server.networking.VistasRedisServer;
import lombok.Getter;
import lombok.Setter;
import net.md_5.bungee.api.chat.TextComponent;

import java.time.Instant;
import java.util.HashSet;
import java.util.Set;
import java.util.UUID;

public class VistasUser implements User<Object> {

    private String name;
    private UUID uuid;
    private String ip;

    @Getter
    @Setter
    private UUID lastSeenServer = null;
    @Getter private Instant offlineSince = Instant.now();
    @Getter private Set<UUID> currentServers = new HashSet<>();
    private boolean isSpigot = false;
    private User<?> original = null;

    public VistasUser(String name, UUID uuid, String ip) {
        this.name = name;
        this.uuid = uuid;
        this.ip = ip;
    }

    public VistasUser(String name, UUID uuid, User<?> player) {
        this.name = name;
        this.uuid = uuid;
        this.isSpigot = true;
        this.original = player;
        this.ip = player.getIpAddress();
    }

    public void registerInServer(UUID s) {
        if (currentServers.size() == 0) {
            // I joined
        }

        if (lastSeenServer !=  s) {
            // handle switch
            OpenAudioMc.getService(ProxyHostService.class).onServerSwitch(
                    this,
                    OpenAudioMc.resolveDependency(ServerUserHooks.class).registerServerIfNew(lastSeenServer),
                    OpenAudioMc.resolveDependency(ServerUserHooks.class).registerServerIfNew(s)
            );
        }

        currentServers.add(s);
        lastSeenServer = s;
    }

    public void removeServer(UUID s) {
        if (lastSeenServer != null && lastSeenServer.equals(s)) {
            lastSeenServer = null;
            offlineSince = Instant.now();
        }
        currentServers.remove(s);

        if (currentServers.size() == 0) {
            // I disconnected
        }
    }

    public void handleDefiniteDisconnect() {
        OpenAudioLogger.info("Handling disconnect for " + getName());
        OpenAudioMc.getService(NetworkingService.class).getClient(uuid).kickConnection();
    }

    public SerializableClient getState() {
        return OpenAudioMc.getService(NetworkingService.class).getClient(uuid).getSession().asSerializableCopy();
    }

    @Override
    public Object getOriginal() {
        if (isSpigot) {
            return original.getOriginal();
        }
        return this;
    }

    @Override
    public String getName() {
        return name;
    }

    @Override
    public UUID getUniqueId() {
        return uuid;
    }

    @Override
    public String getIpAddress() {
        if (isSpigot) {
            return original.getIpAddress();
        }
        return ip;
    }

    @Override
    public boolean isAdministrator() {
        if (isSpigot) {
            return original.isAdministrator();
        }
        return false;
    }

    @Override
    public boolean hasPermission(String s) {
        if (isSpigot) {
            return original.hasPermission(s);
        }
        return true;
    }

    @Override
    public void makeExecuteCommand(String s) {
        if (isSpigot) {
            original.makeExecuteCommand(s);
            return;
        }

        SerializedCall c = new SerializedCall(
                "makeExecuteCommand"
        ).addParam(SerializedParameter.toParam(String.class, s));
    }

    @Override
    public void sendMessage(String s) {
        if (isSpigot) {
            original.sendMessage(Platform.translateColors(s));
            return;
        }

        SerializedCall c = new SerializedCall(
                "sendMessage"
        ).addParam(SerializedParameter.toParam(String.class, s));

        if (lastSeenServer != null) {
            OpenAudioMc.getService(VistasRedisServer.class).sendPacket(
                    new InvokeUserPacket(c, uuid),
                    lastSeenServer
            );
        }
    }

    @Override
    public void sendTitle(String title, String subtitle, int fadeIn, int stay, int fadeOut) {
        if (isSpigot) {
            original.sendTitle(title, subtitle, fadeIn, stay, fadeOut);
            return;
        }

        SerializedCall c = new SerializedCall(
                "sendTitle"
        )
                .addParam(SerializedParameter.toParam(String.class, title))
                .addParam(SerializedParameter.toParam(String.class, subtitle))
                .addParam(SerializedParameter.toParam(Integer.class, fadeIn))
                .addParam(SerializedParameter.toParam(Integer.class, stay))
                .addParam(SerializedParameter.toParam(Integer.class, fadeOut));

        if (lastSeenServer != null) {
            OpenAudioMc.getService(VistasRedisServer.class).sendPacket(
                    new InvokeUserPacket(c, uuid),
                    lastSeenServer
            );
        }
    }

    @Override
    public void sendMessage(TextComponent textComponent) {
        if (isSpigot) {
            original.sendMessage(textComponent);
            return;
        }

        SerializedCall c = new SerializedCall(
                "sendMessage"
        ).addParam(SerializedParameter.toParam(TextComponent.class, textComponent));

        if (lastSeenServer != null) {
            OpenAudioMc.getService(VistasRedisServer.class).sendPacket(
                    new InvokeUserPacket(c, uuid),
                    lastSeenServer
            );
        }
    }

    @Override
    public void sendClickableCommandMessage(String s, String s1, String s2) {
        if (isSpigot) {
            original.sendClickableCommandMessage(s, s1, s2);
            return;
        }


        SerializedCall c = new SerializedCall(
                "sendClickableCommandMessage"
        )
                .addParam(SerializedParameter.toParam(String.class, s))
                .addParam(SerializedParameter.toParam(String.class, s1))
                .addParam(SerializedParameter.toParam(String.class, s2));

        if (lastSeenServer != null) {
            OpenAudioMc.getService(VistasRedisServer.class).sendPacket(
                    new InvokeUserPacket(c, uuid),
                    lastSeenServer
            );
        }
    }

    @Override
    public void sendClickableUrlMessage(String s, String s1, String s2) {
        if (isSpigot) {
            original.sendClickableUrlMessage(s, s1, s2);
            return;
        }

        SerializedCall c = new SerializedCall(
                "sendClickableUrlMessage"
        )
                .addParam(SerializedParameter.toParam(String.class, s2))
                .addParam(SerializedParameter.toParam(String.class, s1))
                .addParam(SerializedParameter.toParam(String.class, s));

        if (lastSeenServer != null) {
            OpenAudioMc.getService(VistasRedisServer.class).sendPacket(
                    new InvokeUserPacket(c, uuid),
                    lastSeenServer
            );
        }
    }

    @Override
    public void sendActionbarMessage(String message) {
        if (isSpigot) {
            original.sendActionbarMessage(message);
            return;
        }
        original.sendMessage(message);
    }
}
