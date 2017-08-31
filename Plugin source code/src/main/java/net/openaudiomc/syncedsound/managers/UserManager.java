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
package net.openaudiomc.syncedsound.managers;

import com.google.common.collect.Maps;

import java.util.Map;
import lombok.Getter;
import org.bukkit.entity.Player;

import net.openaudiomc.syncedsound.objects.UserData;

public class UserManager {
  @Getter private static Map<String, UserData> userMap = Maps.newHashMap();

  public static void addPlayer(Player player) {
    getUserMap().computeIfAbsent(player.getName(), k -> new UserData(player));
  }

  public static UserData getPlayer(Player player) {
    return getUserMap().get(player.getName());
  }

  public static void removePlayer(Player Player) {
    getUserMap().remove(Player.getName());
  }
}