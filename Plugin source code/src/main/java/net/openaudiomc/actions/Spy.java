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

import com.google.common.collect.Maps;
import java.util.HashMap;

import java.util.Map;
import lombok.Getter;
import me.mindgamesnl.openaudiomc.publicApi.WebConnectEvent;
import me.mindgamesnl.openaudiomc.publicApi.WebDisconnectEvent;
import net.openaudiomc.core.Main;
import org.bukkit.Bukkit;
import org.bukkit.ChatColor;
import org.bukkit.entity.Player;
import org.bukkit.event.EventHandler;
import org.bukkit.event.Listener;

public class Spy implements Listener {

  @Getter private static Map<Player, Boolean> spyMap = Maps.newHashMap();

  public static void toggleSpy(Player sender) {
    if (getSpyMap().get(sender) != null) {
      if (getSpyMap().get(sender)) {
        //is on
        getSpyMap().put(sender, false);
        sender.sendMessage(Main.PREFIX + "Connection spy is " + ChatColor.RED + "Disabled");
      } else {
        //is off
        getSpyMap().put(sender, true);
        sender.sendMessage(Main.PREFIX + "Connection spy is " + ChatColor.GREEN + "Enabled");
      }
    } else {
      getSpyMap().put(sender, true);
      sender.sendMessage(Main.PREFIX + "Connection spy is " + ChatColor.GREEN + "Enabled");
    }
  }

  @EventHandler public void onWebDisconnectEvent(WebDisconnectEvent event) {
    String connector = event.getPlayer().getName();
    Bukkit.getOnlinePlayers().forEach(player -> {
      if (getSpyMap().get(player) != null) {
        if (getSpyMap().get(player)) {
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
              + " disconnected from OpenAudio.");
        }
      }
    });
  }

  @EventHandler public void onWebConnectEvent(WebConnectEvent event) {
    String user = event.getPlayer().getName();
    Bukkit.getOnlinePlayers().forEach(player -> {
      if (getSpyMap().get(player) != null) {
        if (getSpyMap().get(player)) {
          player.sendMessage(""
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
              + " connected to OpenAudio.");
        }
      }
    });
  }
}