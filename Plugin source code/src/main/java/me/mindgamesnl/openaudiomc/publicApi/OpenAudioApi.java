package me.mindgamesnl.openaudiomc.publicApi;

import lombok.experimental.UtilityClass;
import net.openaudiomc.actions.Command;
import net.openaudiomc.core.EventListener;
import net.openaudiomc.regions.RegionListener;
import org.bukkit.entity.Player;

@UtilityClass public class OpenAudioApi {
  public void playSound(Player p, String source) {
    Command.playNormalSound(p.getName(), source);
  }

  public void stopSound(Player p) {
    Command.stop(p.getName());
  }

  public void sendMessage(Player p, String message) {
    Command.sendMessage(p.getName(), message);
  }

  public void switchServer(Player p, String newhost) {
    //for backwards compatibilety
  }

  public void setHue(Player p, String rgba) {
    Command.hueSet(p.getName(), rgba);
  }

  public void kickPlayer(Player p) {
    //for backwards compatibilety
  }

  public void setBg(Player p, String bg) {
    Command.setBg(p.getName(), bg);
  }

  public void setVolume(Player p, Integer volume) {
    if (volume > 100 || volume < -1) {
    } else {
      String vol = volume.toString();
      Command.setVolume(p.getName(), vol);
    }
  }

  public void sendJson(Player p, String json) {
    Command.sendJSON(p.getName(), json);
  }

  public Boolean isConnected(Player p) {
    return EventListener.isConnected(p.getName());
  }

  public String getRegionSound(String region) {
    return RegionListener.getRegionFile(region);
  }

  public String getSessionKey(Player p) {
    //for backwards compatibilety
    return null;
  }

  public String getHost(Player p) {
    //for backwards compatibilety
    return null;
  }

  public void playRegion(String region_name, String sourcefile) {
    Command.playRegion(region_name, sourcefile);
  }

  public void playLoop(Player p, String src) {
    Command.playLoop(p.getName(), src);
  }
}