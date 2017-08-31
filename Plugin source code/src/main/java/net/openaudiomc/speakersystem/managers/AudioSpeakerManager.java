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
package net.openaudiomc.speakersystem.managers;

import com.google.common.collect.Maps;
import java.io.File;
import java.text.DateFormat;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import java.util.Map;
import lombok.Getter;
import me.mindgamesnl.openaudiomc.publicApi.OpenAudioApi;
import net.openaudiomc.actions.Command;
import net.openaudiomc.utils.Callback;
import net.openaudiomc.utils.WebUtils;
import org.bukkit.Bukkit;
import org.bukkit.Location;
import org.bukkit.Material;
import org.bukkit.block.Block;
import org.bukkit.block.Skull;
import org.bukkit.entity.Player;
import net.openaudiomc.core.Main;
import net.openaudiomc.speakersystem.objects.AudioSpeaker;
import net.openaudiomc.speakersystem.objects.AudioSpeakerSound;
import net.openaudiomc.socket.cm_callback;

@Getter public class AudioSpeakerManager {
  private static AudioSpeakerManager instance;
  private Map<String, AudioSpeakerSound> sounds = Maps.newHashMap();
  private Map<Location, AudioSpeaker> speakers = Maps.newHashMap();
  private Map<String, Boolean> listeners = Maps.newHashMap();
  private Map<String, Integer> Volumes = Maps.newHashMap();
  private boolean running = false;
  private int timer;

  public void createSound(final String id, final String src, final Integer volume,
      final Integer range, final File file) {
    Callback<String> callback = (b) -> {
      try {
        DateFormat dateFormat = new SimpleDateFormat("HH:mm:ss");
        Date reference = dateFormat.parse("00:00:00");
        Date date = dateFormat.parse(b);
        Integer _volume = 100;
        Integer _range = 9;
        if (volume == null) {
          _volume = volume;
        }
        if (range == null) {
          _range = 9;
        }
        AudioSpeakerSound netitem =
                new AudioSpeakerSound(src, (date.getTime() - reference.getTime()) / 1000L, _volume,
                        _range, file);
        sounds.put(id, netitem);
      } catch (ParseException e) {
      }
    };
    WebUtils.asyncHttpRequest("http://api.openaudiomc.net/plugin/mp3_info.php?s=" + src, callback);
  }

  public void createSpeaker(String id, String soundid, Location loc) {
    AudioSpeaker newitem = new AudioSpeaker(id, loc, soundid);
    speakers.put(loc, newitem);
  }

  public void stopForPlayer(String name) {
    Command.stopAllSpeakers(name);
  }

  public void stop() {
    running = false;
    Bukkit.getScheduler().cancelTask(timer);
  }

  public void processSpeaker(Player p, AudioSpeaker as) {
    double dist = as.getLocation().distance(p.getLocation());
    dist = dist * sounds.get(as.getSoundid()).getVolume();
    int a = (int) Math.round(dist);
    a = a / 10;
    int volume = sounds.get(as.getSoundid()).getVolume() - a;
    String fullvolume = volume + "";
    fullvolume = fullvolume.replaceAll("-", "");

    if (listeners.get(p.getName()) == null || !listeners.get(p.getName())) {

      //start
      Command.playNewSpeaker(p.getName(), sounds.get(as.getSoundid()).getSource(),
          sounds.get(as.getSoundid()).getTimestamp(), fullvolume);
      listeners.put(p.getName(), true);
    } else {
      //update
      if (Volumes.get(p.getName()) == null || Volumes.get(p.getName()) != Integer.parseInt(
          fullvolume)) {
        Command.updateSpeakerVolume(p.getName(), sounds.get(as.getSoundid()).getSource(),
            fullvolume);
        Volumes.put(p.getName(), Integer.parseInt(fullvolume));
      }
    }
  }

  public void init() {
    running = true;
    timer = Bukkit.getScheduler().scheduleAsyncRepeatingTask(Main.get(), () -> {
      for (Player p : Bukkit.getOnlinePlayers()) {
        if (OpenAudioApi.isConnected(p)) {
          Boolean found = false;
          double highest = 0;
          Integer iterations = 0;
          AudioSpeaker selected = null;
          for (Block b : getNearbyBlocks(p.getLocation(), 10)) {
            if (b.getType() == Material.NOTE_BLOCK) {
              if (speakers.get(b.getLocation()).getSoundid() != null) {
                if (speakers.get(b.getLocation()).getEnabled()) {
                  if (Math.abs(
                      speakers.get(b.getLocation()).getLocation().distance(p.getLocation()))
                      < highest || iterations == 0) {
                    if (Math.abs(
                        speakers.get(b.getLocation()).getLocation().distance(p.getLocation()))
                        < highest || iterations == 0) {
                      found = true;
                      selected = speakers.get(b.getLocation());
                      iterations++;
                      highest = Math.abs(
                          speakers.get(b.getLocation()).getLocation().distance(p.getLocation()));
                    }
                  }
                }
              }
            } else if (b.getType() == Material.SKULL) {
              try {
                Skull skull = (Skull) b.getState();
                if (skull.getOwner().equalsIgnoreCase("OpenAudioMc")) {
                  if (speakers.get(b.getLocation()).getSoundid() != null && speakers.get(
                      b.getLocation()).getEnabled()) {
                    if (Math.abs(
                        speakers.get(b.getLocation()).getLocation().distance(p.getLocation()))
                        < highest || iterations == 0) {
                      if (sounds.get(speakers.get(b.getLocation()).getSoundid()).getEnabled()) {
                        found = true;
                        selected = speakers.get(b.getLocation());
                        iterations++;
                        highest = Math.abs(speakers.get(b.getLocation())
                            .getLocation()
                            .distance(p.getLocation()));
                      }
                    }
                  }
                }
              } catch (NullPointerException ignored) {
              }
            }
          }

          if (found) {
            processSpeaker(p, selected);
          } else {
            if (listeners.get(p.getName())) {
              listeners.put(p.getName(), false);
              Command.stopAllSpeakers(p.getName());
            }
          }
        }
      }
    }, 0, cm_callback.speakerTick);
  }

  public List<Block> getNearbyBlocks(Location location, int radius) {
    List<Block> blocks = new ArrayList<>();
    for (int x = location.getBlockX() - radius; x <= location.getBlockX() + radius; x++) {
      for (int y = location.getBlockY() - radius; y <= location.getBlockY() + radius; y++) {
        for (int z = location.getBlockZ() - radius; z <= location.getBlockZ() + radius; z++) {
          blocks.add(location.getWorld().getBlockAt(x, y, z));
        }
      }
    }
    return blocks;
  }

  public static AudioSpeakerManager get() {
    return instance == null ? instance = new AudioSpeakerManager() : instance;
  }
}