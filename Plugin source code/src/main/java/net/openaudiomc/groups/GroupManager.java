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
package net.openaudiomc.groups;

import com.google.common.collect.Maps;
import java.util.Optional;
import lombok.Getter;
import org.bukkit.entity.Player;
import java.util.Map;

/**
 * Created by mats on 31-5-2017.
 * Pretty cool huh?
 */
public class GroupManager {

  @Getter private Map<String, Group> groups = Maps.newHashMap();

  public Optional<Group> getGroup(String group) {
    if (groups.get(group) == null) {
      return Optional.empty();
    } else {
      return Optional.of(groups.get(group));
    }
  }
}