package net.openaudiomc.groups;

import lombok.Getter;
import org.bukkit.entity.Player;

import java.util.ArrayList;

/**
 * Created by mats on 31-5-2017.
 * Pretty cool huh?
 */
@Getter
public class playerGroup {

    @Getter private ArrayList<Player> members = new ArrayList<Player>();
    private String name;

    public playerGroup(String name) {
        this.name = name;
    }

    public void addMember(Player p) {
        this.members.add(p);
    }

    public void removeMember(Player p) {
        this.members.remove(p);
    }



}