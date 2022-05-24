package com.craftmend.vistas.server.users;

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

    private Map<UUID, VistasServerUser> remoteUsers = new ConcurrentHashMap<>();
    private Map<UUID, MinecraftServer> remoteInstallation = new ConcurrentHashMap<>();

    public void startGc() {
        OpenAudioMc.resolveDependency(TaskService.class).scheduleSyncRepeatingTask(() -> {
            Set<VistasServerUser> removeMe = new HashSet<>();
            for (Map.Entry<UUID, VistasServerUser> entry : remoteUsers.entrySet()) {
                UUID n = entry.getKey();
                VistasServerUser u = entry.getValue();
                if (u.getLastSeenServer() == null) {
                    if (Duration.between(u.getOfflineSince(), Instant.now()).getSeconds() > 2) {
                        removeMe.add(u);
                    }
                }
            }

            for (VistasServerUser deputyUser : removeMe) {
                OpenAudioLogger.toConsole("Kicking garbage connection for " + deputyUser.getName());
                deputyUser.handleDefiniteDisconnect();
                OpenAudioMc.getService(NetworkingService.class).remove(deputyUser.getUniqueId());
                remoteUsers.remove(deputyUser.getUniqueId());
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
        VistasServerUser du = (VistasServerUser) user;
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

    public VistasServerUser registerUserIfNew(UUID playerId, String name) {
        if (remoteUsers.containsKey(playerId)) {
            return remoteUsers.get(playerId);
        }
        VistasServerUser du = new VistasServerUser(name, playerId);
        remoteUsers.put(playerId, du);
        OpenAudioMc.getService(NetworkingService.class).register(du, null);
        return du;
    }

    public void registerServer(UUID serverId) {
        remoteInstallation.put(serverId, new MinecraftServer("remote-" + serverId, serverId));
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
        for (VistasServerUser value : remoteUsers.values()) {
            if (value.getLastSeenServer() != null && value.getLastSeenServer().equals(serverId)) {
                value.setLastSeenServer(null);
            }
        }
        remoteInstallation.remove(serverId);
    }

    public void onUserJoin(String playerName, UUID playerUuid, UUID serverId) {
        MinecraftServer dpi = remoteInstallation.get(serverId);
        VistasServerUser du = registerUserIfNew(playerUuid, playerName);
        du.registerInServer(serverId);
        OpenAudioLogger.toConsole(playerName + " got claimed by server " + serverId.toString());
    }

    public void onUserLeave(String playerName, UUID playerUuid, UUID serverId) {
        MinecraftServer dpi = remoteInstallation.get(serverId);
        VistasServerUser du = registerUserIfNew(playerUuid, playerName);
        du.removeServer(serverId);
        OpenAudioLogger.toConsole(playerName + " left server " + serverId.toString());
    }
}
