package net.openaudiomc.speakersystem.objects;

import lombok.Getter;
import lombok.Setter;
import org.bukkit.Location;
import org.bukkit.Material;

/**
 * Created by mats on 23-4-2017.
 */

@Getter
@Setter
public class AudioSpeaker {

    private String id;
    @Getter @Setter private Location location;
    @Getter @Setter private String soundid;
    @Setter @Getter private Integer volume = 100;
	@Setter @Getter private Boolean enabled = true;

    public AudioSpeaker(String id, Location loc, String sid) {
        if (loc.getBlock().getType() != Material.AIR) {
            System.out.println("New speaker. ID:"+sid + " BLOCK:"+loc.getBlock().getType());
            this.id = id;
            this.location = loc;
            this.soundid = sid;
        }

    }

}
