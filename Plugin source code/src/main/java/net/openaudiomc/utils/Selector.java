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

import com.google.common.base.Preconditions;
import com.google.common.collect.Lists;
import com.sk89q.worldguard.bukkit.WGBukkit;
import com.sk89q.worldguard.protection.regions.ProtectedRegion;
import java.util.List;
import lombok.experimental.UtilityClass;
import net.openaudiomc.groups.GroupManager;
import net.openaudiomc.core.Main;
import org.apache.commons.lang.Validate;
import org.bukkit.Bukkit;
import org.bukkit.command.CommandSender;
import org.bukkit.entity.Player;

import java.util.ArrayList;

@UtilityClass public class Selector {

  public List<Player> playerSelector(CommandSender sender, String query) {
    Preconditions.checkNotNull(sender, "Sender can't be null!");
    Preconditions.checkNotNull(query, "Query can't be null!");

    List<Player> list = Lists.newArrayList();
    if (Bukkit.getPlayer(query) != null) {
      list.add(Bukkit.getPlayer(query));
    } else if (query.startsWith("permission:")) {
      String permission = query.replace("permission:", "");
      Bukkit.getOnlinePlayers().forEach(player -> {
        if (player.hasPermission(permission)) {
          list.add(player);
        }
      });
    } else if (query.startsWith("region:")) {
      String region = query.replace("region:", "");
      Bukkit.getOnlinePlayers()
          .forEach(player -> WGBukkit.getRegionManager(player.getWorld())
              .getApplicableRegions(player.getLocation())
              .forEach(protectedRegion -> {
                if (region.equalsIgnoreCase(protectedRegion.getId())) {
                  list.add(player);
                }
              }));
    } else if (query.startsWith("group:")) {
      String target = query.replace("group:", "");
      if (GroupManager.get().getGroup(target).isPresent()) {
        list.addAll(GroupManager.get().getGroup(target).get().getMembers());
      }
    } else if (query.equalsIgnoreCase("@a")) {
      list.addAll(Bukkit.getOnlinePlayers());
    } else if (query.toLowerCase().contains(":")) {
      sender.sendMessage(Main.PREFIX + "Invalid selector.");
    }
    return list;
  }
}