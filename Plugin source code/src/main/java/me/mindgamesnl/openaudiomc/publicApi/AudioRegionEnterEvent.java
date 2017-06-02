package me.mindgamesnl.openaudiomc.publicApi;

import lombok.AllArgsConstructor;
import lombok.Getter;
import org.bukkit.event.Event;
import org.bukkit.entity.Player;
import org.bukkit.event.HandlerList;

@Getter @AllArgsConstructor public class AudioRegionEnterEvent extends Event {
  private Player player;
  private String sound;
  private String regionName;

  private static final HandlerList handlers = new HandlerList();

  public HandlerList getHandlers() {
    return handlers;
  }

  public static HandlerList getHandlerList() {
    return handlers;
  }
}