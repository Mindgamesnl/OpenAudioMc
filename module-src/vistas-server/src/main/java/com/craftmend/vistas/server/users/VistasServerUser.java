package com.craftmend.vistas.server.users;

import com.craftmend.openaudiomc.OpenAudioMc;
import com.craftmend.openaudiomc.generic.client.helpers.SerializableClient;
import com.craftmend.openaudiomc.generic.logging.OpenAudioLogger;
import com.craftmend.openaudiomc.generic.networking.interfaces.NetworkingService;
import com.craftmend.openaudiomc.generic.platform.Platform;
import com.craftmend.openaudiomc.generic.proxy.ProxyHostService;
import com.craftmend.openaudiomc.generic.user.User;
import com.craftmend.vistas.client.packets.InvokeUserPacket;
import com.craftmend.vistas.client.reflection.SerializedCall;
import com.craftmend.vistas.client.reflection.SerializedParameter;
import com.craftmend.vistas.server.networking.VistasNetworkServer;
import lombok.Getter;
import lombok.Setter;
import net.md_5.bungee.api.chat.TextComponent;

import java.time.Instant;
import java.util.HashSet;
import java.util.Set;
import java.util.UUID;

public class VistasServerUser implements User {

    private String name;
    private UUID uuid;

    @Getter
    @Setter
    private UUID lastSeenServer = null;
    @Getter private Instant offlineSince = Instant.now();
    @Getter private Set<UUID> currentServers = new HashSet<>();
    private boolean isSpigot = false;
    private User original = null;

    public VistasServerUser(String name, UUID uuid) {
        this.name = name;
        this.uuid = uuid;
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
        OpenAudioLogger.toConsole("Handling disconnect for " + getName());
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
    public boolean isAdministrator() {
        if (isSpigot) {
            return original.isAdministrator();
        }
        return true;
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
            OpenAudioMc.getService(VistasNetworkServer.class).sendPacket(
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
            OpenAudioMc.getService(VistasNetworkServer.class).sendPacket(
                    new InvokeUserPacket(c, uuid),
                    lastSeenServer
            );
        }
    }

    @Override
    public void sendClickableCommandMessage(String s, String s1, String s2) {
        if (isSpigot) {
            OpenAudioLogger.toConsole(s);
            OpenAudioLogger.toConsole(s1);
            OpenAudioLogger.toConsole(s2);
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
            OpenAudioMc.getService(VistasNetworkServer.class).sendPacket(
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
            OpenAudioMc.getService(VistasNetworkServer.class).sendPacket(
                    new InvokeUserPacket(c, uuid),
                    lastSeenServer
            );
        }
    }
}
