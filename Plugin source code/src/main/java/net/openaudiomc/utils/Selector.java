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
package net.openaudiomc.utils;

import com.sk89q.worldguard.bukkit.WGBukkit;
import com.sk89q.worldguard.protection.regions.ProtectedRegion;
import java.util.List;
import net.openaudiomc.groups.GroupManager;
import net.openaudiomc.core.Main;
import org.bukkit.Bukkit;
import org.bukkit.command.CommandSender;
import org.bukkit.entity.Player;

import java.util.ArrayList;

public class Selector {

  public static List<Player> playerSelector(CommandSender sender, String query) {
    List<Player> list = new ArrayList<>();
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
        for (ProtectedRegion r : WGBukkit.getRegionManager(p.getWorld())
            .getApplicableRegions(p.getLocation())) {
          if (region.equalsIgnoreCase(r.getId())) {
            list.add(p);
          }
        }
      }
    } else if (query.startsWith("group:")) {
      String target = query.replace("group:", "");
      if (GroupManager.get().getGroup(target).isPresent()) {
        list.addAll(GroupManager.get().getGroup(target).get().getMembers());
      }
    } else if (query.equalsIgnoreCase("@a")) {
      list.addAll(Bukkit.getOnlinePlayers());
    } else if (query.toLowerCase().contains(":".toLowerCase())) {
      sender.sendMessage(Main.prefix + "Invalid selector.");
    } else {
      list.add(Bukkit.getPlayer(query));
    }
    return list;
  }
}