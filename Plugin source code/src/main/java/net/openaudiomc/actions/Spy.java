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
package net.openaudiomc.actions;

import java.util.HashMap;

import lombok.Getter;
import me.mindgamesnl.openaudiomc.publicApi.WebConnectEvent;
import me.mindgamesnl.openaudiomc.publicApi.WebDisconnectEvent;
import net.openaudiomc.core.Main;
import org.bukkit.Bukkit;
import org.bukkit.ChatColor;
import org.bukkit.entity.Player;
import org.bukkit.event.EventHandler;

public class Spy {

  @Getter private static HashMap<Player, Boolean> spyMap = new HashMap<>();

  public static void Toggle(Player sender) {
    if (spyMap.get(sender) != null) {
      if (spyMap.get(sender)) {
        //is on
        spyMap.put(sender, false);
        sender.sendMessage(Main.prefix + "Connection spy is " + ChatColor.RED + "Disabled");
      } else {
        //is off
        spyMap.put(sender, true);
        sender.sendMessage(Main.prefix + "Connection spy is " + ChatColor.GREEN + "Enabled");
      }
    } else {
      spyMap.put(sender, true);
      sender.sendMessage(Main.prefix + "Connection spy is " + ChatColor.GREEN + "Enabled");
    }
  }

  @EventHandler public void onWebDisconnectEvent(WebDisconnectEvent event) {
    String connector = event.getPlayer().getName();
    for (Player player : Bukkit.getOnlinePlayers()) {
      if (spyMap.get(player) != null) {
        if (spyMap.get(player)) {
          player.sendMessage(""
              + ChatColor.AQUA
              + "["
              + ChatColor.DARK_RED
              + "-"
              + ChatColor.AQUA
              + "]"
              + ChatColor.YELLOW
              + ChatColor.ITALIC
              + " "
              + connector
              + ChatColor.GRAY
              + ChatColor.ITALIC
              + " disconnected from openaudio.");
        }
      }
    }
  }

  @EventHandler public void onWebConnectEvent(WebConnectEvent event) {
    String user = event.getPlayer().getName();
    for (Player p : Bukkit.getOnlinePlayers()) {
      if (spyMap.get(p) != null) {
        if (spyMap.get(p)) {
          p.sendMessage(""
              + ChatColor.AQUA
              + "["
              + ChatColor.GREEN
              + "+"
              + ChatColor.AQUA
              + "]"
              + ChatColor.YELLOW
              + ChatColor.ITALIC
              + " "
              + user
              + ChatColor.GRAY
              + ChatColor.ITALIC
              + " connected to openaudio.");
        }
      }
    }
  }
}