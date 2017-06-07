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
package net.openaudiomc.speakersystem;

import com.google.common.collect.Maps;
import java.io.File;
import java.io.FileNotFoundException;
import java.io.IOException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.Map;
import java.util.Set;

import lombok.Getter;
import net.openaudiomc.speakersystem.objects.AudioSpeaker;
import org.bukkit.*;
import org.bukkit.block.Block;
import org.bukkit.block.Skull;
import org.bukkit.configuration.InvalidConfigurationException;
import org.bukkit.configuration.file.FileConfiguration;
import org.bukkit.configuration.file.YamlConfiguration;
import org.bukkit.entity.Player;
import org.bukkit.event.block.Action;
import org.bukkit.event.block.BlockBreakEvent;
import org.bukkit.event.block.BlockPlaceEvent;
import org.bukkit.event.player.PlayerInteractEvent;
import org.bukkit.inventory.ItemStack;
import org.bukkit.SkullType;
import org.bukkit.inventory.meta.SkullMeta;

import net.openaudiomc.core.Main;
import net.openaudiomc.speakersystem.managers.AudioSpeakerManager;

public class SpeakerMain {
  @Getter private static Map<Player, String> placer = Maps.newHashMap();
  @Getter private static Map<Player, ArrayList<AudioSpeaker>> selection = Maps.newHashMap();

  public static void giveSpeaker(Player p, String file) {
    placer.put(p, file);
    ItemStack skull = new ItemStack(Material.SKULL_ITEM);
    skull.setDurability((short) 3);
    SkullMeta sm = (SkullMeta) skull.getItemMeta();
    sm.setOwner("OpenAudioMc");
    sm.setDisplayName(ChatColor.AQUA + "OpenAudioMc Speaker");
    skull.setItemMeta(sm);
    p.getInventory().addItem(skull);
  }

  public static void saveSound(String src) {
    File savedFile =
        new File("plugins/OpenAudio/speakers/sounds", src.replaceAll("/", "_slash_") + ".yml");
    if (!savedFile.exists()) {
      try {
        try {
          savedFile.createNewFile();
        } catch (IOException e) {
        }
        FileConfiguration regionsFileInst = YamlConfiguration.loadConfiguration(savedFile);
        regionsFileInst.set("src", src);
        try {
          regionsFileInst.save(savedFile);
        } catch (IOException e) {
        }
      } catch (NullPointerException e) {

      }
    }
  }

  public static void loadSounds() {
    try {
      YamlConfiguration config = new YamlConfiguration();
      File[] files = new File("plugins/OpenAudio/speakers/sounds").listFiles();
      for (File file : files) {
        try {
          config.load(file);
          AudioSpeakerManager.get()
              .createSound(config.getString("src") + "_sound", config.getString("src"),
                  config.getInt("volume"), null, file);
        } catch (FileNotFoundException e) {
        } catch (IOException e) {
        } catch (InvalidConfigurationException e) {
        }
      }
    } catch (NullPointerException e) {

    }
  }

  public static void loadSpeaker() {
    try {
      YamlConfiguration config = new YamlConfiguration();
      File[] files = new File("plugins/OpenAudio/speakers/speakers").listFiles();
      for (File file : files) {
        try {
          config.load(file);
          AudioSpeakerManager.get()
              .createSpeaker(config.getString("src") + "_speaker",
                  config.getString("src") + "_sound",
                  new Location(Bukkit.getWorld(config.getString("world")), config.getLong("x"),
                      config.getLong("y"), config.getLong("z")));
        } catch (FileNotFoundException e) {
        } catch (IOException e) {
        } catch (InvalidConfigurationException e) {
        }
      }
    } catch (NullPointerException e) {

    }
  }

  public static void saveSpeaker(String src, String g, double X, double Y, double Z) {
    File savedFile =
        new File("plugins/OpenAudio/speakers/speakers", X + "-" + Y + "-" + Z + ".yml");
    if (!savedFile.exists()) {
      try {
        savedFile.createNewFile();
      } catch (IOException e) {
      }
      FileConfiguration regionsFileInst = YamlConfiguration.loadConfiguration(savedFile);
      regionsFileInst.set("src", src);
      regionsFileInst.set("x", X);
      regionsFileInst.set("y", Y);
      regionsFileInst.set("z", Z);
      regionsFileInst.set("world", g);
      try {
        regionsFileInst.save(savedFile);
      } catch (IOException e) {
      }
    }
  }

  public static void PlayerInteractEvent(PlayerInteractEvent event) {
    Player p = event.getPlayer();
    if (event.getAction() == Action.RIGHT_CLICK_BLOCK) {
      if (p.hasPermission("openaudio.speakers.interact")) {
        if (event.getClickedBlock().getType() == Material.SKULL
            || event.getClickedBlock().getType() == Material.NOTE_BLOCK) {
          if (AudioSpeakerManager.get().getSpeakers().get(event.getClickedBlock().getLocation())
              != null) {
            if (selection.get(p) != null) {
              if (!selection.get(p)
                  .contains(AudioSpeakerManager.get()
                      .getSpeakers()
                      .get(event.getClickedBlock().getLocation()))) {
                selection.get(p)
                    .add(AudioSpeakerManager.get()
                        .getSpeakers()
                        .get(event.getClickedBlock().getLocation()));
                p.sendMessage(Main.PREFIX + "Added speaker to selection. Url:" + AudioSpeakerManager
                    .get()
                    .getSounds()
                    .get(AudioSpeakerManager.get()
                        .getSpeakers()
                        .get(event.getClickedBlock().getLocation())
                        .getSoundid())
                    .getSource());
              } else {
                selection.get(p)
                    .remove(AudioSpeakerManager.get()
                        .getSpeakers()
                        .get(event.getClickedBlock().getLocation()));
                p.sendMessage(Main.PREFIX + "Removed speaker from selection.");
              }
            } else {
              ArrayList<AudioSpeaker> selected = new ArrayList<AudioSpeaker>();
              selected.add(AudioSpeakerManager.get()
                  .getSpeakers()
                  .get(event.getClickedBlock().getLocation()));
              selection.put(p, selected);
              p.sendMessage(Main.PREFIX + "Added speaker to selection.");
            }
          } else {
            p.sendMessage(Main.PREFIX + "This block is not a speaker.");
          }
        }
      }
    }
  }

  public static void onBreak(BlockBreakEvent event) {
    if (event.getBlock().getType() == Material.SKULL) {
      Skull skull = (Skull) event.getBlock().getState();
      try {
        if (skull.getOwner().equalsIgnoreCase("OpenAudioMc")) {
          if (AudioSpeakerManager.get().getSpeakers().get(event.getBlock().getLocation()) != null) {

            String sound = AudioSpeakerManager.get()
                .getSounds()
                .get(AudioSpeakerManager.get()
                    .getSpeakers()
                    .get(event.getBlock().getLocation())
                    .getSoundid())
                .getSource();
            File speakerfile = new File("plugins/OpenAudio/speakers/speakers/"
                + event.getBlock().getLocation().getBlockX()
                + ".0-"
                + event.getBlock().getLocation().getBlockY()
                + ".0-"
                + event.getBlock().getLocation().getBlockZ()
                + ".0.yml");

            AudioSpeakerManager.get().getSpeakers().remove(event.getBlock().getLocation());

            if (speakerfile.delete()) {
              event.getPlayer()
                  .sendMessage(Main.PREFIX + ChatColor.GREEN + "Successfully removed speaker!");
            } else {
              event.getPlayer()
                  .sendMessage(Main.PREFIX + ChatColor.RED + "Failed to remove speaker!");
              event.setCancelled(true);
            }
          } else {
            event.getPlayer()
                .sendMessage(Main.PREFIX
                    + ChatColor.RED
                    + "Did not remove speaker, no sound assigned to this speaker.");
          }
        }
      } catch (NullPointerException e) {

      }
    } else if (event.getBlock().getType() == Material.NOTE_BLOCK) {
      if (AudioSpeakerManager.get().getSpeakers().get(event.getBlock().getLocation()) != null) {

        String sound = AudioSpeakerManager.get()
            .getSounds()
            .get(AudioSpeakerManager.get()
                .getSpeakers()
                .get(event.getBlock().getLocation())
                .getSoundid())
            .getSource();
        File speakerfile = new File("plugins/OpenAudio/speakers/speakers/"
            + event.getBlock().getLocation().getBlockX()
            + ".0-"
            + event.getBlock().getLocation().getBlockY()
            + ".0-"
            + event.getBlock().getLocation().getBlockZ()
            + ".0.yml");

        AudioSpeakerManager.get().getSpeakers().remove(event.getBlock().getLocation());

        if (speakerfile.delete()) {
          event.getPlayer()
              .sendMessage(Main.PREFIX + ChatColor.GREEN + "Successfully removed speaker!");
        } else {
          event.getPlayer().sendMessage(Main.PREFIX + ChatColor.RED + "Failed to remove speaker!");
          event.setCancelled(true);
        }
      } else {
        event.getPlayer()
            .sendMessage(Main.PREFIX
                + ChatColor.RED
                + "Did not remove speaker, no sound assigned to this speaker.");
      }
    }
  }

  public static void selectPlayer(Player p) {
    Block target = p.getTargetBlock((Set<Material>) null, 5);
    if (target != null) {
      if (target.getType() == Material.SKULL) {
        Skull skull = (Skull) target.getState();
        if (skull.getSkullType() == SkullType.PLAYER) {
          if (skull.getOwner().equalsIgnoreCase("OpenAudioMc")) {
            if (selection.get(p) != null) {
              if (!selection.get(p)
                  .contains(AudioSpeakerManager.get().getSpeakers().get(target.getLocation()))) {
                selection.get(p)
                    .add(AudioSpeakerManager.get().getSpeakers().get(target.getLocation()));
                p.sendMessage(Main.PREFIX + "Added speaker to selection. Url:" + AudioSpeakerManager
                    .get()
                    .getSounds()
                    .get(AudioSpeakerManager.get()
                        .getSpeakers()
                        .get(target.getLocation())
                        .getSoundid())
                    .getSource());
              } else {
                selection.get(p)
                    .remove(AudioSpeakerManager.get().getSpeakers().get(target.getLocation()));
                p.sendMessage(Main.PREFIX + "Removed speaker from selection.");
              }
            } else {
              ArrayList<AudioSpeaker> selected = new ArrayList<AudioSpeaker>();
              selected.add(AudioSpeakerManager.get().getSpeakers().get(target.getLocation()));
              selection.put(p, selected);
              p.sendMessage(Main.PREFIX + "Added speaker to selection.");
            }
          }
        }
      }
    }
  }

  public static void onPlace(BlockPlaceEvent event) {
    try {
      if (event.getBlock().getType() == Material.SKULL) {
        Skull skull = (Skull) event.getBlock().getState();
        if (skull.getSkullType() == SkullType.PLAYER) {
          if (skull.hasOwner()) {
            if (skull.getOwner().equalsIgnoreCase("OpenAudioMc")) {
              if (placer.get(event.getPlayer()) != null
                  && placer.get(event.getPlayer()) != "olditem") {

                if (AudioSpeakerManager.get().getSounds().get(placer.get(event.getPlayer()))
                    == null) {
                  saveSound(placer.get(event.getPlayer()));
                  AudioSpeakerManager.get()
                      .createSound(placer.get(event.getPlayer()) + "_sound",
                          placer.get(event.getPlayer()), null, null, null);
                }

                saveSpeaker(placer.get(event.getPlayer()),
                    event.getBlock().getLocation().getWorld().getName(),
                    event.getBlock().getLocation().getX(), event.getBlock().getLocation().getY(),
                    event.getBlock().getLocation().getZ());

                event.getPlayer()
                    .sendMessage(
                        Main.PREFIX
                            + ChatColor.GREEN
                            + "Created speaker on X:"
                            + event.getBlock()
                            .getLocation()
                            .getBlockX()
                            + " Y:"
                            + event.getBlock().getLocation().getBlockY()
                            + " Z:"
                            + event.getBlock().getLocation().getBlockZ()
                            + ".");

                AudioSpeakerManager.get()
                    .createSpeaker(placer.get(event.getPlayer()) + "_speaker",
                        placer.get(event.getPlayer()) + "_sound",
                        new Location(event.getBlock().getLocation().getWorld(),
                            event.getBlock().getLocation().getX(),
                            event.getBlock().getLocation().getY(),
                            event.getBlock().getLocation().getZ()));

                placer.put(event.getPlayer(), "olditem");
              } else {
                event.getPlayer()
                    .sendMessage(Main.PREFIX
                        + ChatColor.RED
                        + "This speaker does not have a sound, please add a new speaker.");
                event.setCancelled(true);
              }
              ItemStack removeskull = new ItemStack(Material.SKULL_ITEM);
              removeskull.setDurability((short) 3);
              SkullMeta sm = (SkullMeta) removeskull.getItemMeta();
              sm.setOwner("OpenAudioMc");
              sm.setDisplayName(ChatColor.AQUA + "OpenAudioMc Speaker");
              removeskull.setItemMeta(sm);
              event.getPlayer().getInventory().remove(removeskull);
            }
          }
        }
      }
    } catch (NullPointerException e) {
      //event.getPlayer().sendMessage(Main.prefix + ChatColor.RED + "Placing the skull failed some how, please send a screenshot of " + ChatColor.GREEN + "/oa debug" + ChatColor.RED + " to the developers.");
    }
  }
}