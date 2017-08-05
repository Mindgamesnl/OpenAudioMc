package net.openaudiomc.speakersystem.objects;

import lombok.Getter;
import lombok.Setter;
import net.openaudiomc.core.Main;
import org.bukkit.Location;
import org.bukkit.Material;

public class AudioSpeaker {

  private String id;
  @Getter @Setter private Location location;
  @Getter @Setter private String soundid;
  @Setter @Getter private Integer volume = 100;
  @Setter @Getter private Boolean enabled = true;

  public AudioSpeaker(String id, Location loc, String sid) {
    if (loc.getBlock().getType() != Material.AIR) {
      Main.get().getLogger().info("New speaker. ID:" + sid + " BLOCK:" + loc.getBlock().getType());
      this.id = id;
      this.location = loc;
      this.soundid = sid;
    }
  }
}