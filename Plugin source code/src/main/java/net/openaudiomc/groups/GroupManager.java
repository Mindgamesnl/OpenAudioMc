package net.openaudiomc.groups;

import com.google.common.base.Optional;
import org.bukkit.entity.Player;

import java.util.HashMap;
import java.util.Map;

/**
 * Created by mats on 31-5-2017.
 * Pretty cool huh?
 */
public class GroupManager {
    private static GroupManager instance;

    public static GroupManager get() {
        return instance == null ? instance = new GroupManager() : instance;
    }

    private Map<String, PlayerGroup> groups = new HashMap<>();

    public void addToGroup(String group, Player p) {
        if (groups.get(group) == null) {
            groups.put(group, new PlayerGroup(group));
            groups.get(group).addMember(p);
        } else {
            groups.get(group).addMember(p);
        }
    }

    public void removeFromGroup(Player p) {
        for (PlayerGroup groups : groups.values()) {
            groups.removeMember(p);
        }
    }

    public Optional<PlayerGroup> getGroup(String group) {
        if (groups.get(group) == null) {
            return Optional.absent();
        } else {
            return Optional.of(groups.get(group));
        }
    }
}
