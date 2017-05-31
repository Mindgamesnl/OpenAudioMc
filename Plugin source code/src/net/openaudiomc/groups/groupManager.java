package net.openaudiomc.groups;

import org.bukkit.entity.Player;

import java.util.HashMap;

/**
 * Created by mats on 31-5-2017.
 * Pretty cool huh?
 */
public class groupManager {

    public static HashMap<String, playerGroup> groups = new HashMap<String, playerGroup>();

    public static void addToGroup(String group, Player p) {
        if (groups.get(group) == null) {
            groups.put(group, new playerGroup(group));
            groups.get(group).addMember(p);
        } else {
            groups.get(group).addMember(p);
        }
    }

    public static void removeFromGroup(Player p) {
        for (playerGroup g : groups.values()) {
            g.removeMember(p);
        }
    }
}
