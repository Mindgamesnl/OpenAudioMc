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
package net.openaudiomc.syncedsound.objects;

import com.google.common.collect.Lists;

import java.util.List;
import lombok.Getter;
import net.openaudiomc.actions.Command;
import net.openaudiomc.syncedsound.managers.SyncedSoundManager;
import org.bukkit.entity.Player;

@Getter public class UserData {
  private Player player;
  private String name;
  private List<String> syncedSounds = Lists.newArrayList();

  public UserData(Player player) {
    this.player = player;
    this.name = player.getName();
  }

  public void stopSounds() {
    getSyncedSounds().forEach(
        id -> SyncedSoundManager.remove(SyncedSoundManager.getById(id).getId()));
  }

  public void syncSounds() {
    getSyncedSounds().forEach(id -> {
      SyncedSound target = SyncedSoundManager.getById(id);
      if (target != null) {
        if (target.isPlaying()) {
          Command.playFromTime(getPlayer().getName(), target.getSoundId(), target.getSource(),
              target.getTimeStamp() * 1000);
        } else {
          SyncedSoundManager.remove(target.getId());
        }
      }
    });
  }

  public void removeAllSyncedSounds() {
    getSyncedSounds().forEach(sound -> {
      if (!getSyncedSounds().isEmpty()) {
        getSyncedSounds().remove(sound);
      }
    });
  }

  public void addSyncedSound(String id) {
    getSyncedSounds().add(id);
  }

  public void removeSyncedSound(String id) {
    if (!getSyncedSounds().isEmpty()) {
      this.getSyncedSounds().remove(id);
    }
  }
}