package net.openaudiomc.utils;

import com.sk89q.worldguard.bukkit.WGBukkit;
import com.sk89q.worldguard.protection.regions.ProtectedRegion;
import net.openaudiomc.groups.GroupManager;
import net.openaudiomc.core.Main;
import org.bukkit.Bukkit;
import org.bukkit.command.CommandSender;
import org.bukkit.entity.Player;

import java.util.ArrayList;

public class Selector {

    public static ArrayList<Player> playerSelector(CommandSender sender, String query) {
        ArrayList<Player> list = new ArrayList<Player>();

        if (query.startsWith("permission:")) {
            String permission = query.replace("permission:", "");
            for (Player p : Bukkit.getOnlinePlayers()) {
                if (p.hasPermission(permission)) {
                    list.add(p);
                }
            }
        } else if (query.startsWith("region:")) {
            String region = query.replace("region:", "");
            for (Player p : Bukkit.getOnlinePlayers()) {
                for (ProtectedRegion r : WGBukkit.getRegionManager(p.getWorld()).getApplicableRegions(p.getLocation())) {
                    if (region.equalsIgnoreCase(r.getId())) {
                        list.add(p);
                    }
                }
            }
        } else if (query.startsWith("group:")) {
            String target = query.replace("group:", "");
            if (GroupManager.get().getGroup(target).isPresent()) {
                for (Player p : GroupManager.get().getGroup(target).get().getMembers()) {
                    list.add(p);
                }
            }
        } else if (query.equalsIgnoreCase("@a")) {
            for (Player p : Bukkit.getOnlinePlayers()) {
                list.add(p);
            }
        } else if (query.toLowerCase().contains(":".toLowerCase())) {
            sender.sendMessage(Main.prefix + "Invalid selector.");
        } else {
            list.add(Bukkit.getPlayer(query));
        }

        return list;
    }

}
