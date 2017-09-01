/*
 * Copyright (C) 2017 Mindgamesnl
 *
 * Licensed under the Apache License, Version 2.0 (the "License"); you may not use this file except
 * in compliance with the License. You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software distributed under the License
 * is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express
 * or implied. See the License for the specific language governing permissions and limitations under
 * the License.
 */
package net.openaudiomc.regions;

import com.google.common.collect.Maps;
import com.google.common.collect.Sets;
import com.sk89q.worldguard.bukkit.WorldGuardPlugin;
import com.sk89q.worldguard.protection.ApplicableRegionSet;
import com.sk89q.worldguard.protection.managers.RegionManager;
import com.sk89q.worldguard.protection.regions.ProtectedRegion;
import lombok.Getter;
import me.mindgamesnl.openaudiomc.publicApi.OpenAudioApi;
import net.openaudiomc.actions.Command;
import net.openaudiomc.internal.events.SocketUserDisconnectEvent;
import net.openaudiomc.core.Main;
import org.bukkit.Bukkit;
import org.bukkit.Location;
import org.bukkit.configuration.file.FileConfiguration;
import org.bukkit.configuration.file.YamlConfiguration;
import org.bukkit.entity.Player;
import org.bukkit.event.EventHandler;
import org.bukkit.event.Listener;
import org.bukkit.event.player.*;

import java.io.File;
import java.io.IOException;
import java.util.*;

public class RegionListener implements Listener {

  @Getter private Map<Player, Set<ProtectedRegion>> playerRegions = Maps.newHashMap();
  @Getter private static Map<Player, ArrayList<String>> history = Maps.newHashMap();
  public static Main plugin;
  @Getter private static WorldGuardPlugin wgPlugin;

  public static void setup(Main oapl, WorldGuardPlugin wgpg) {
    wgPlugin = wgpg;
    plugin = oapl;
  }

  private void start(final Player p, ApplicableRegionSet appRegions, Set<ProtectedRegion> regions) {
    final ProtectedRegion[] finalel = { null };
    final Integer[] priority = { 0 };
    final Integer[] foundNum = { 0 };
    final Boolean[] found = { false };
    appRegions.forEach(protectedRegion -> {
      getHistory().computeIfAbsent(p, k -> new ArrayList<>());

      if (!regions.contains(protectedRegion)) {

        if (isValidRegion(protectedRegion.getId())) {
          found[0] = true;

          foundNum[0]++;
          if (protectedRegion.getPriority() > priority[0]
              || protectedRegion.getPriority() == priority[0]) {
            priority[0] = protectedRegion.getPriority();
            finalel[0] = protectedRegion;
          }
          regions.add(protectedRegion);
        }
      }
    });
    if (found[0]) {
      for (String s : getHistory().get(p)) {
        if (!Objects.equals(getRegionFile(finalel[0].getId()), s)) {
          Command.stopRegion(p.getName(), s);
        }
      }

      if (finalel[0] != null && isValidRegion(finalel[0].getId())) {
        if (!getHistory().get(p).contains(getRegionFile(finalel[0].getId()))) {
          Command.playRegion(p.getName(), getRegionFile(finalel[0].getId()));
          getHistory().get(p).add(getRegionFile(finalel[0].getId()));
        } else if (finalel[0] != null) {
          if (getHistory().get(p).size() == 1 && getHistory().get(p)
              .contains(getRegionFile(finalel[0].getId()))) {
            getHistory().get(p).remove(getRegionFile(finalel[0].getId()));
            Command.playRegion(p.getName(), getRegionFile(finalel[0].getId()));
          }
        }
      }
    }
  }

  public void onSocketClose(SocketUserDisconnectEvent e) {
    String pName = e.getName();
    getPlayerRegions().get(pName).clear();
    getHistory().get(pName).clear();
  }

  private void end(Player p, ProtectedRegion region) {
    Command.stopRegion(p.getName(), getRegionFile(region.getId()));
    getHistory().get(p).clear();
    getPlayerRegions().get(p).clear();
  }

  @EventHandler public void onPlayerMove(PlayerMoveEvent e) {
    e.setCancelled(updateRegions(e.getPlayer(), e.getTo(), e));
  }

  @EventHandler public void onPlayerTeleport(PlayerTeleportEvent e) {
    e.setCancelled(updateRegions(e.getPlayer(), e.getTo(), e));
  }

  @EventHandler public void onPlayerJoin(PlayerJoinEvent e) {
    updateRegions(e.getPlayer(), e.getPlayer().getLocation(), e);
  }

  @EventHandler public void onPlayerRespawn(PlayerRespawnEvent e) {
    updateRegions(e.getPlayer(), e.getRespawnLocation(), e);
  }

  private synchronized boolean updateRegions(final Player player,
      Location to, final PlayerEvent event) {
    if (OpenAudioApi.isConnected(player)) {
      Set<ProtectedRegion> regions;
      if (getPlayerRegions().get(player) == null) {
        regions = Sets.newHashSet();
      } else {
        regions = Sets.newHashSet(getPlayerRegions().get(player));
      }
      Set<ProtectedRegion> oldRegions = Sets.newHashSet(regions);

      RegionManager rm = getWgPlugin().getRegionManager(to.getWorld());
      if (rm == null) {
        return false;
      }
      ApplicableRegionSet appRegions = rm.getApplicableRegions(to);

      //for ding
      start(player, appRegions, regions);

      Collection<ProtectedRegion> app = appRegions.getRegions();
      Object itr = regions.iterator();
      while (((Iterator) itr).hasNext()) {
        final ProtectedRegion region = (ProtectedRegion) ((Iterator) itr).next();
        if (!app.contains(region)) {
          if (rm.getRegion(region.getId()) != region) {
            ((Iterator) itr).remove();
          } else {

            Bukkit.getScheduler().runTaskLater(plugin, () -> end(player, region), 1L);
            ((Iterator) itr).remove();
          }
        }
      }
      getPlayerRegions().put(player, regions);
      return false;
    }
    return false;
  }

  //returns file of a region
  public static String getRegionFile(String regionName) {
    if (isValidRegion(regionName)) {
      return net.openaudiomc.regions.File.getString("region.src." + getRegionConfigName(regionName));
    } else {
      return "InvalidSource";
    }
  }

  public static String getRegionWorld(String regionName) {
    if (net.openaudiomc.regions.File.getString("world." + getRegionConfigName(regionName)) != null
        && net.openaudiomc.regions.File.getString("region.isvalid." + getRegionConfigName(regionName)).equals("true")) {
      return net.openaudiomc.regions.File.getString("world." + getRegionConfigName(regionName));
    } else {
      return "<none>";
    }
  }

  //check if a region ia know to openaudio (true = valid)
  public static Boolean isValidRegion(String regionName) {
    return net.openaudiomc.regions.File.getString("region.isvalid." + getRegionConfigName(regionName)) != null
        && net.openaudiomc.regions.File.getString("region.isvalid." + getRegionConfigName(regionName)).equals("true");
  }

  private static String getRegionConfigName(String name) {
    FileConfiguration cfg =
        YamlConfiguration.loadConfiguration(new File("plugins/OpenAudio", "regions.yml"));
    for(String s : cfg.getConfigurationSection("region.isvalid").getKeys(false)) {
      if(s.equalsIgnoreCase(name)) {
        return s;
      }
    }
    return name;
  }

  public static void registerRegion(String regionName, String src, Player p) {
    FileConfiguration cfg =
        YamlConfiguration.loadConfiguration(new File("plugins/OpenAudio", "regions.yml"));
    File regionsFile = new File("plugins/OpenAudio", "regions.yml");
    cfg.set("region.isvalid." + regionName, "true");
    cfg.set("region.src." + regionName, src);
    cfg.set("world." + regionName, p.getLocation().getWorld().getName());
    try {
      cfg.save(regionsFile);
    } catch (IOException e) {
      // TODO Auto-generated catch block
      e.printStackTrace();
    }
  }

  public static void deleteRegion(String regionName) {
    FileConfiguration cfg =
        YamlConfiguration.loadConfiguration(new File("plugins/OpenAudio", "regions.yml"));
    File regionsFile = new File("plugins/OpenAudio", "regions.yml");
    cfg.set("region.isvalid." + getRegionConfigName(regionName), "false");
    cfg.set("region.src." + getRegionConfigName(regionName), "<deleted>");
    try {
      cfg.save(regionsFile);
    } catch (IOException e) {
      // TODO Auto-generated catch block
      e.printStackTrace();
    }
  }
}
