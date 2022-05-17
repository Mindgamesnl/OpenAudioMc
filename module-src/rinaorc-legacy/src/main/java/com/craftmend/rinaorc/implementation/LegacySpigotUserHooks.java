package com.craftmend.rinaorc.implementation;

import com.craftmend.openaudiomc.OpenAudioMc;
import com.craftmend.openaudiomc.generic.networking.interfaces.NetworkingService;
import com.craftmend.openaudiomc.generic.proxy.SpigotUserHooks;
import com.craftmend.openaudiomc.generic.proxy.interfaces.UserHooks;
import com.craftmend.openaudiomc.generic.proxy.messages.PacketPlayer;
import com.craftmend.openaudiomc.generic.proxy.messages.StandardPacket;
import com.craftmend.openaudiomc.generic.proxy.models.ProxyNode;
import com.craftmend.openaudiomc.generic.user.User;
import com.craftmend.openaudiomc.generic.user.adapters.CommandSenderUserAdapter;
import com.craftmend.openaudiomc.generic.user.adapters.SpigotUserAdapter;
import com.craftmend.openaudiomc.spigot.modules.proxy.service.ProxyNetworkingService;
import org.bukkit.Bukkit;
import org.bukkit.command.CommandSender;
import org.bukkit.entity.Player;

import java.util.ArrayList;
import java.util.Collection;
import java.util.List;
import java.util.UUID;

@Deprecated
public class LegacySpigotUserHooks implements UserHooks {

    private SpigotUserHooks modernHooks = new SpigotUserHooks();

    @Override
    public Collection<ProxyNode> getNodes() {
        return new ArrayList<>();
    }

    @Override
    public Collection<User> getOnlineUsers() {
        List<User> users = new ArrayList<>();
        for (Player onlinePlayer : Bukkit.getOnlinePlayers()) {
            users.add(new LegacySpigotUserAdapter(onlinePlayer));
        }
        return users;
    }

    @Override
    public void sendPacket(User user, StandardPacket packet) {
        modernHooks.sendPacket(user, packet);
    }

    @Override
    public User byUuid(UUID uuid) {
        Player player = Bukkit.getPlayer(uuid);
        if (player == null) return null;
        return new LegacySpigotUserAdapter(player);
    }

    @Override
    public User fromCommandSender(CommandSender commandSender) {
        if (commandSender instanceof Player) {
            return byUuid(((Player) commandSender).getUniqueId());
        }
        return new CommandSenderUserAdapter(commandSender);
    }
}
