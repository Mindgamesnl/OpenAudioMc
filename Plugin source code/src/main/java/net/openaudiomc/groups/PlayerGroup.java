package net.openaudiomc.groups;

import lombok.Getter;
import org.bukkit.entity.Player;

import java.util.ArrayList;
import java.util.List;

/**
 * Created by mats on 31-5-2017.
 * Pretty cool huh?
 */
@Getter
public class PlayerGroup {

    @Getter
    private List<Player> members = new ArrayList<>();
    private String name;


    PlayerGroup(String name) {
        this.name = name;
    }

    public void addMember(Player p) {
        this.members.add(p);
    }

    public void removeMember(Player p) {
        this.members.remove(p);
    }
}