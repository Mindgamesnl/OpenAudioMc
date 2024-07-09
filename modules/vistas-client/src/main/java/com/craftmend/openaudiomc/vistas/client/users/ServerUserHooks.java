package com.craftmend.openaudiomc.vistas.client.users;

import com.craftmend.openaudiomc.OpenAudioMc;
import com.craftmend.openaudiomc.generic.logging.OpenAudioLogger;
import com.craftmend.openaudiomc.generic.networking.interfaces.NetworkingService;
import com.craftmend.openaudiomc.generic.platform.interfaces.TaskService;
import com.craftmend.openaudiomc.generic.proxy.interfaces.UserHooks;
import com.craftmend.openaudiomc.generic.proxy.messages.StandardPacket;
import com.craftmend.openaudiomc.generic.proxy.models.ProxyNode;
import com.craftmend.openaudiomc.generic.user.User;
import com.craftmend.openaudiomc.generic.user.adapters.CommandSenderUserAdapter;
import lombok.Getter;
import org.bukkit.entity.Player;

import java.time.Duration;
import java.time.Instant;
import java.util.*;
import java.util.concurrent.ConcurrentHashMap;
import java.util.stream.Collectors;

@Getter
public class ServerUserHooks implements UserHooks {

    private Map<UUID, VistasUser> remoteUsers = new ConcurrentHashMap<>();
    @Getter
    private Map<UUID, MinecraftServer> remoteInstallation = new ConcurrentHashMap<>();

    public void startGc() {
        OpenAudioMc.resolveDependency(TaskService.class).scheduleSyncRepeatingTask(() -> {
            Set<VistasUser> removeMe = new HashSet<>();
            for (Map.Entry<UUID, VistasUser> entry : remoteUsers.entrySet()) {
                UUID n = entry.getKey();
                VistasUser u = entry.getValue();
                if (u.getLastSeenServer() == null) {
                    if (Duration.between(u.getOfflineSince(), Instant.now()).getSeconds() > 2) {
                        removeMe.add(u);
                    }
                }
            }

            for (VistasUser vistasUser : removeMe) {
                OpenAudioLogger.info("Kicking garbage connection for " + vistasUser.getName());
                vistasUser.handleDefiniteDisconnect();
                OpenAudioMc.getService(NetworkingService.class).remove(vistasUser.getUniqueId());
                remoteUsers.remove(vistasUser.getUniqueId());
            }
        }, 20, 20);
    }

    @Override
    public Collection<ProxyNode> getNodes() {
        return remoteInstallation.values().stream().map(v -> (ProxyNode) v).collect(Collectors.toList());
    }

    @Override
    public Collection<User> getOnlineUsers() {
        return remoteUsers.values().stream().map(v -> (User) v).collect(Collectors.toList());
    }

    @Override
    public void sendPacket(User user, StandardPacket standardPacket) {
        VistasUser du = (VistasUser) user;
        ProxyNode remote = remoteInstallation.get(du.getLastSeenServer());
        if (remote != null) {
            MinecraftServer pl = (MinecraftServer) remote;
            pl.sendPacket(user, standardPacket);
        }
    }

    @Override
    public User byUuid(UUID uuid) {
        return remoteUsers.get(uuid);
    }

    @Override
    public User fromCommandSender(org.bukkit.command.CommandSender commandSender) {
        if (commandSender instanceof Player) {
            return byUuid(((Player) commandSender).getUniqueId());
        }
        return new CommandSenderUserAdapter(commandSender);
    }

    @Deprecated
    public VistasUser registerUserIfNew(UUID playerId, String name) {
        return registerUserIfNew(playerId, name, "unknown:vistas");
    }

    public VistasUser registerUserIfNew(UUID playerId, String name, String ip) {
        if (remoteUsers.containsKey(playerId)) {
            return remoteUsers.get(playerId);
        }
        VistasUser du = new VistasUser(name, playerId, ip);
        remoteUsers.put(playerId, du);
        OpenAudioMc.getService(NetworkingService.class).register(du, null);
        return du;
    }

    public void registerServer(UUID serverId) {
        MinecraftServer c = new MinecraftServer("remote-" + serverId, serverId);
        remoteInstallation.put(serverId, c);
        System.out.println("Registering remote server " + c.getName());
    }

    public MinecraftServer registerServerIfNew(UUID serverId) {
        if (serverId == null) {
            return null;
        }
        if (remoteInstallation.containsKey(serverId)) {
            return remoteInstallation.get(serverId);
        }
        registerServer(serverId);
        return registerServerIfNew(serverId);
    }

    public void unregisterServer(UUID serverId) {
        for (VistasUser value : remoteUsers.values()) {
            if (value.getLastSeenServer() != null && value.getLastSeenServer().equals(serverId)) {
                value.setLastSeenServer(null);
            }
        }
        remoteInstallation.remove(serverId);
    }

    public void onUserJoin(String playerName, UUID playerUuid, UUID serverId, String ip) {
        MinecraftServer dpi = remoteInstallation.get(serverId);
        VistasUser du = registerUserIfNew(playerUuid, playerName, ip);
        du.registerInServer(serverId);
        OpenAudioLogger.info(playerName + " got claimed by server " + serverId.toString());
    }

    public void onUserLeave(String playerName, UUID playerUuid, UUID serverId) {
        MinecraftServer dpi = remoteInstallation.get(serverId);
        VistasUser du = registerUserIfNew(playerUuid, playerName);
        du.removeServer(serverId);
        OpenAudioLogger.info(playerName + " left server " + serverId.toString());
    }
}
