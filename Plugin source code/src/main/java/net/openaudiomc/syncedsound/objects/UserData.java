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
import java.util.ArrayList;
import java.util.ConcurrentModificationException;

import java.util.List;
import net.openaudiomc.actions.Command;
import net.openaudiomc.syncedsound.managers.SyncedSoundManager;
import org.bukkit.entity.Player;

public class UserData {
  private Player player;
  private String name;
  private List<String> syncedSouncs = Lists.newArrayList();

  public UserData(Player p) {
    this.player = p;
    this.name = p.getName();
  }

  public void stopSounds() {
    for (String id : getSyncedSounds()) {
      SyncedSoundManager.remove(SyncedSoundManager.getById(id).getId());
    }
  }

  public void syncSounds() {
    for (String id : getSyncedSounds()) {
      SyncedSound target = SyncedSoundManager.getById(id);

      Integer miliSeconds = target.getTimeStamp() * 1000;
      String src = target.getSource();
      if (target.isPlaying()) {
        Command.playFromTime(this.player.getName(), SyncedSoundManager.getById(id).getSoundId(),
            src, miliSeconds);
      } else {
        SyncedSoundManager.remove(target.getId());
      }
    }
  }

  public Player getPlayer() {
    return this.player;
  }

  public String getName() {
    return this.name;
  }

  public void removeAllSyncedSounds() {
    try {
      for (String sound : getSyncedSounds()) {
        if (!syncedSouncs.isEmpty()) {
          syncedSouncs.remove(sound);
        }
      }
    } catch (ConcurrentModificationException e) {
    }
  }

  public List<String> getSyncedSounds() {
    return this.syncedSouncs;
  }

  public String getSoundId() {
    return this.getSoundId();
  }

  public void addSyncedSound(String id) {
    this.syncedSouncs.add(id);
  }

  public void removeSyncedSound(String id) {
    if (!syncedSouncs.isEmpty()) {
      this.syncedSouncs.remove(id);
    }
  }
}