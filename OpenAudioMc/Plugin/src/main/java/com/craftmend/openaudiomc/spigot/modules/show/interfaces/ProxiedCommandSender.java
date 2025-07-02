package com.craftmend.openaudiomc.spigot.modules.show.interfaces;

import org.bukkit.World;
import org.bukkit.command.CommandSender;

import java.lang.reflect.Proxy;

public class ProxiedCommandSender {

    public static CommandSender makeForWorld(World world) {
        return (CommandSender) Proxy.newProxyInstance(
                ProxiedCommandSender.class.getClassLoader(),
                new Class[]{CommandSender.class, WorldHolderCommandSender.class},
                (proxy, method, args) -> {
                    switch (method.getName()) {
                        case "getWorld":
                            return world;
                        case "getName":
                            return "ProxiedCommandSender";
                        case "sendMessage":
                            // Do nothing for sendMessage
                            return null;
                        case "isOp":
                            // Return false for isOp
                            return true;
                        case "isPermissionSet":
                            return true;
                        case "hasPermission":
                            return true;
                    }
                    return method.invoke(proxy, args);
                }
        );
    }

}
