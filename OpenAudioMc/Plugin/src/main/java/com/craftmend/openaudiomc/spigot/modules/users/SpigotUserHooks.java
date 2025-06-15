package com.craftmend.openaudiomc.spigot.modules.users;

import com.craftmend.openaudiomc.OpenAudioMc;
import com.craftmend.openaudiomc.generic.logging.OpenAudioLogger;
import com.craftmend.openaudiomc.generic.networking.interfaces.NetworkingService;
import com.craftmend.openaudiomc.generic.proxy.interfaces.UserHooks;
import com.craftmend.openaudiomc.generic.proxy.messages.PacketPlayer;
import com.craftmend.openaudiomc.generic.proxy.messages.StandardPacket;
import com.craftmend.openaudiomc.generic.proxy.models.ProxyNode;
import com.craftmend.openaudiomc.generic.user.User;
import com.craftmend.openaudiomc.generic.user.adapters.CommandSenderUserAdapter;
import com.craftmend.openaudiomc.spigot.modules.proxy.service.ProxyNetworkingService;
import com.craftmend.openaudiomc.spigot.modules.users.adapters.LegacySpigotUserAdapter;
import com.craftmend.openaudiomc.spigot.modules.users.adapters.SpigotUserAdapter;
import com.craftmend.openaudiomc.spigot.modules.users.interfaces.SpigotUserProvider;
import net.md_5.bungee.api.ChatMessageType;
import net.md_5.bungee.api.chat.BaseComponent;
import net.md_5.bungee.api.chat.TextComponent;
import org.bukkit.Bukkit;
import org.bukkit.command.CommandSender;
import org.bukkit.entity.Player;

import java.lang.reflect.Method;
import java.util.*;

public class SpigotUserHooks implements UserHooks {

    private final SpigotUserProvider userProvider;

    public SpigotUserHooks() {
        if (isLegacy()) {
            userProvider = LegacySpigotUserAdapter::new;
        } else {
            userProvider = SpigotUserAdapter::new;
        }
    }

    /**
     * Determine if the server is running a legacy version of Spigot.
     * @return true if the server is running a legacy version of Spigot, false otherwise
     */
    private boolean isLegacy() {
        // Check if player and player.spigot contain 'modern' methods.
        // This is a bit of a hack, but it's the best way to check if the server is running 1.8 or 1.9+ while also
        // taking servers with custom (backported) versions into account.
        Class<CommandSender> commandSender = CommandSender.class;

        if (methodByNameExists(commandSender, "spigot")) {
            Class<CommandSender.Spigot> spigotCommandSender = CommandSender.Spigot.class;
            boolean hasBungeeChat = classExists("net.md_5.bungee.api.ChatMessageType")
                    && classExists("net.md_5.bungee.api.chat.BaseComponent");
            if (hasBungeeChat) {
                boolean actionBarOk = enumConstantExists(ChatMessageType.class, "ACTION_BAR");
                boolean sendMessageOk = methodByNameExists(spigotCommandSender, "sendMessage", BaseComponent.class)
                        // new versions only support one single overload of sendMessage
                        || methodByNameExists(spigotCommandSender, "sendMessage", BaseComponent[].class);

                if (actionBarOk && sendMessageOk) {
                    // md_5 chat is there, so it's 1.9+
                    OpenAudioLogger.info("Detected md_5 chat support, using default user adapter");
                    return false;
                } else {
                    // md_5 chat is there, but it's 1.8
                    OpenAudioLogger.info("Detected legacy server by missing bungee chat methods, falling back to legacy mode (" + (actionBarOk ? "sendMessage" : "ACTION_BAR") + " not found)");
                    return true;
                }
            } else {
                // md_5 chat ain't even there, so it's 1.8
                OpenAudioLogger.info("Detected legacy server by missing bungee chat classes, falling back to legacy mode");
                return true;
            }
        } else {
            // legacy, don't even try
            OpenAudioLogger.info("Detected legacy server by missing spigot method, falling back to legacy mode");
            return true;
        }
    }

    /**
     * Check if a class exists.
     * @param className the name of the class to check
     * @return true if the class exists, false otherwise
     */
    private boolean classExists(String className) {
        try {
            Class.forName(className);
            return true;
        } catch (ClassNotFoundException e) {
            return false;
        }
    }

    /**
     * Check if an enum constant exists.
     * @param clazz the class to check
     * @param constantName the name of the constant to check
     * @return true if the constant exists, false otherwise
     */
    private boolean enumConstantExists(Class<?> clazz, String constantName) {
        for (Object constant : clazz.getEnumConstants()) {
            if (constant.toString().equals(constantName)) {
                return true;
            }
        }
        return false;
    }

    /**
     * Check if a method exists.
     * @param clazz the class to check
     * @param methodName the name of the method to check
     * @param parameterTypes the parameter types of the method to check, optional
     * @return true if the method exists, false otherwise
     */
    private boolean methodByNameExists(Class<?> clazz, String methodName, Class<?>... parameterTypes) {
        for (Method method : clazz.getMethods()) {
            if (method.getName().equals(methodName)) {
                if (parameterTypes.length == 0 && method.getParameterCount() == 0) {
                    return true;
                }
                if (method.getParameterCount() >= parameterTypes.length) {
                    boolean allMatch = true;
                    for (int i = 0; i < parameterTypes.length; i++) {
                        if (method.getParameterTypes()[i] != parameterTypes[i]) {
                            // is the parameter type a subclass of the expected type?
                            if (parameterTypes[i].isAssignableFrom(method.getParameterTypes()[i])) {
                                // if so, it's still a match
                                return true;
                            } else if (method.getParameterTypes()[i].isArray()) {
                                // its an array, so we need to check the component type
                                if (method.getParameterTypes()[i].getComponentType() == parameterTypes[i]) {
                                    // match on optional array technically
                                    return true;
                                }
                            }
                            allMatch = false;
                        }
                    }
                    if (allMatch) {
                        return true;
                    }
                }
            }
        }
        OpenAudioLogger.warn("Failed to find method " + methodName + " in class " + clazz.getName() + " with parameter types " + Arrays.toString(parameterTypes));
        return false;
    }

    @Override
    public Collection<ProxyNode> getNodes() {
        return new ArrayList<>();
    }

    @Override
    public Collection<User> getOnlineUsers() {
        List<User> users = new ArrayList<>();
        for (Player onlinePlayer : Bukkit.getOnlinePlayers()) {
            users.add(userProvider.buildFor(onlinePlayer));
        }
        return users;
    }

    @Override
    public void sendPacket(User user, StandardPacket packet) {
        // do nothing
        NetworkingService ns = OpenAudioMc.getService(NetworkingService.class);
        if (ns instanceof ProxyNetworkingService) {
            ((ProxyNetworkingService) ns).getPacketManager().sendPacket(new PacketPlayer(
                            (Player) user.getOriginal()),
                    packet
            );
        }
    }

    @Override
    public User byUuid(UUID uuid) {
        Player player = Bukkit.getPlayer(uuid);
        if (player == null) return null;
        return userProvider.buildFor(player);
    }

    @Override
    public User fromCommandSender(CommandSender commandSender) {
        if (commandSender instanceof Player) {
            return byUuid(((Player) commandSender).getUniqueId());
        }
        return new CommandSenderUserAdapter(commandSender);
    }
}
