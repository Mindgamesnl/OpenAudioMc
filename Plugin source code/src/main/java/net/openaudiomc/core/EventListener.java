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
package net.openaudiomc.core;

import com.google.common.collect.Maps;
import com.sk89q.worldguard.bukkit.WGBukkit;
import com.sk89q.worldguard.protection.regions.ProtectedRegion;
import net.openaudiomc.actions.Command;
import net.openaudiomc.actions.Spy;
import net.openaudiomc.files.Messages;
import net.openaudiomc.groups.GroupManager;
import net.openaudiomc.internal.events.*;
import net.openaudiomc.players.Sessions;
import net.openaudiomc.regions.RegionListener;
import net.openaudiomc.socket.Emitter;
import net.openaudiomc.socket.TimeoutManager;
import net.openaudiomc.socket.cm_callback;
import net.openaudiomc.speakersystem.SpeakerMain;
import net.openaudiomc.speakersystem.managers.AudioSpeakerManager;
import net.openaudiomc.syncedsound.managers.UserManager;
import org.bukkit.Bukkit;
import org.bukkit.ChatColor;
import org.bukkit.OfflinePlayer;
import org.bukkit.configuration.file.FileConfiguration;
import org.bukkit.configuration.file.YamlConfiguration;
import org.bukkit.entity.Player;
import org.bukkit.event.EventHandler;
import org.bukkit.event.Listener;
import org.bukkit.event.block.BlockBreakEvent;
import org.bukkit.event.block.BlockPlaceEvent;
import org.bukkit.event.player.PlayerInteractEvent;
import org.bukkit.event.player.PlayerJoinEvent;
import org.bukkit.event.player.PlayerQuitEvent;
import org.bukkit.event.player.PlayerTeleportEvent;
import org.json.JSONObject;

import java.io.File;
import java.util.HashMap;

public class EventListener implements Listener {
  public static HashMap<String, Boolean> isConnected = Maps.newHashMap();

  @EventHandler public void onSocketWhisperEvent(SocketWhisperEvent event) {
    Player player = Bukkit.getPlayer(event.getPlayerName());

    Bukkit.getServer()
        .getPluginManager()
        .callEvent(new me.mindgamesnl.openaudiomc.publicApi.SocketWhisperEvent(
            Bukkit.getPlayer(event.getPlayerName()), event.getData()));

    if (event.getData().equals("hueConnected")) {
      player.sendMessage(Messages.getColor("hue-connected-message"));
      Bukkit.getServer()
          .getPluginManager()
          .callEvent(new me.mindgamesnl.openaudiomc.publicApi.HueConnectEvent(
              Bukkit.getPlayer(event.getPlayerName())));
    } else {
      JSONObject jsonObject = new JSONObject(event.getData());
      if (jsonObject.getString("command").equals("SoundEnded")) {
        Bukkit.getServer()
            .getPluginManager()
            .callEvent(new me.mindgamesnl.openaudiomc.publicApi.SoundEndEvent(
                Bukkit.getPlayer(event.getPlayerName()), jsonObject.getString("id")));
      }
    }
  }

  @EventHandler public void onSocketUserConnectEvent(SocketUserConnectEvent event) {
    OfflinePlayer player = Bukkit.getOfflinePlayer(event.getName());
    if (player.isOnline()) {
      if (event.getKey().equals(Sessions.getOld(event.getName()))) {
        //good client
        AudioSpeakerManager.get().getListeners().put(event.getName(), false);
        Player client = Bukkit.getPlayer(event.getName());
        UserManager.addPlayer(client);
        client.sendMessage(Messages.getColor("connected-message"));
        if (Messages.get("start-sound") != null && Messages.get("start-sound") != "") {
          Command.playNormalSound(event.getName(), Messages.get("start-sound"));
        }

        Emitter.connectedInServer(event.getName());
        isConnected.put(client.getName(), true);
        UserManager.getPlayer(client).syncSounds();
        String connector = event.getName();
        for (Player p : Bukkit.getOnlinePlayers()) {
          if (Spy.getSpyMap().get(p) != null) {
            if (Spy.getSpyMap().get(p)) {
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
                  + connector
                  + ChatColor.GRAY
                  + ChatColor.ITALIC
                  + " connected to openaudio.");
            }
          }
        }

        if (GetDep.getStatus()) {
          String regionNu = "-";
          for (ProtectedRegion r : WGBukkit.getRegionManager(client.getWorld())
              .getApplicableRegions(client.getLocation())) {
            regionNu = r.getId();
            if (RegionListener.isValidRegion(regionNu)) {
              Command.playRegion(client.getName(), RegionListener.getRegionFile(regionNu));
            }
          }
        }
        Bukkit.getServer()
            .getPluginManager()
            .callEvent(new me.mindgamesnl.openaudiomc.publicApi.WebConnectEvent(
                Bukkit.getPlayer(event.getName())));
      } else {
        Emitter.KickPlayerConnection(event.getName());
      }
    }
  }

  @EventHandler public void onSocketUserDisconnectEvent(SocketUserDisconnectEvent event) {
    isConnected.put((String) event.getName(), false);
    Bukkit.getServer()
        .getPluginManager()
        .callEvent(new me.mindgamesnl.openaudiomc.publicApi.WebDisconnectEvent(
            Bukkit.getPlayer((String) event.getName())));

    String connector = (String) event.getName();
    OfflinePlayer player =
        Bukkit.getOfflinePlayer((String) event.getName());
    if (player.isOnline()) {
      Bukkit.getPlayer(connector).sendMessage(Messages.getColor("disconnect-message"));
    }

    AudioSpeakerManager.get().stopForPlayer((String) event.getName());

    for (Player p : Bukkit.getOnlinePlayers()) {
      if (Spy.getSpyMap().get(p) != null) {
        if (Spy.getSpyMap().get(p)) {
          p.sendMessage(""
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

  @EventHandler public void onSocketConnected(SocketConnectEvent event) {
    System.out.println("[OpenAudio] Socket.io connected");
    Bukkit.getServer()
        .getPluginManager()
        .callEvent(new me.mindgamesnl.openaudiomc.publicApi.SocketIoConnectEvent());
  }

  @EventHandler public void onSocketDisconnected(SocketDisconnectEvent event) {
    System.out.println("[OpenAudio] Socket.io disconnected");
    Bukkit.getServer()
        .getPluginManager()
        .callEvent(new me.mindgamesnl.openaudiomc.publicApi.SocketIoDisconnectEvent());
  }

  @EventHandler public void onPlayerJoin(final PlayerJoinEvent event) {
    //delay for if the player joined via bungee
    TimeoutManager.updateCounter();
    Main.getPL().getServer().getScheduler().scheduleSyncDelayedTask(Main.getPL(), new Runnable() {
      public void run() {
        Emitter.connectedInServer(event.getPlayer().getName());
        UserManager.addPlayer(event.getPlayer());
        UserManager.getPlayer(event.getPlayer()).syncSounds();
        AudioSpeakerManager.get().getListeners().put(event.getPlayer().getName(), false);

        if (event.getPlayer().isOp()) {
          cm_callback.update();
          if (cm_callback.callbacks != 0) {
            if (!Main.getPL().getDescription().getVersion().equals(cm_callback.lastVersion)) {
              String currentVersion = Main.getPL().getDescription().getVersion();
              String newVersion = cm_callback.lastVersion;
              String updateTitle = cm_callback.updateTitle;
              String message = Main.prefix
                  + ChatColor.RESET
                  + "Update is available!"
                  + ChatColor.AQUA
                  + " your version: "
                  + currentVersion
                  + " new version: "
                  + newVersion
                  + ChatColor.RESET
                  + " Updating is recommend";
              event.getPlayer().sendMessage(message);
            }
            String broadcast = cm_callback.broadcast;
            if (!broadcast.equals("")) {
              event.getPlayer()
                  .sendMessage(Main.prefix + "Important message: " + ChatColor.RESET + broadcast);
            }
          }
        }
      }
    }, 20);
  }

  @EventHandler public void onBlockPlaceEvent(BlockPlaceEvent event) {
    SpeakerMain.onPlace(event);
  }

  @EventHandler public void BlockBreakEvent(BlockBreakEvent event) {
    SpeakerMain.onBreak(event);
  }

  @EventHandler public void PlayerInteractEvent(PlayerInteractEvent event) {
    SpeakerMain.PlayerInteractEvent(event);
  }

  @EventHandler public void onPlayerQuit(PlayerQuitEvent event) {
    Player p = event.getPlayer();
    Command.stop(p.getName());
    Command.stopAllRegions(p.getName());
    Emitter.offlineInServer(p.getName());
    AudioSpeakerManager.get().stopForPlayer(event.getPlayer().getName());
    /* CAN BE NULL */
    if (RegionListener.history.get(p) != null) {
        RegionListener.history.get(p).clear();
    }
    AudioSpeakerManager.get().getListeners().put(event.getPlayer().getName(), false);
    GroupManager.get().removeFromGroup(event.getPlayer());
    Main.getPL().getServer().getScheduler().runTaskLaterAsynchronously(Main.getPL(), new Runnable() {
      @Override public void run() {
        TimeoutManager.updateCounter();
      }
    }, 5);
  }

  @EventHandler public void onPlayerTeleport(PlayerTeleportEvent event) {
    Player p = event.getPlayer();
    FileConfiguration cfg =
        YamlConfiguration.loadConfiguration(new File("plugins/OpenAudio", "messages.yml"));
    if (cfg.getBoolean("stop-on-teleport")) {
      Command.stopAll(p.getName());
    }
  }

  public static Boolean isConnected(String name) {
    if (isConnected.get(name) != null) {
      if (!isConnected.get(name)) {
        return false;
      } else {
        return true;
      }
    } else {
      return false;
    }
  }
}
