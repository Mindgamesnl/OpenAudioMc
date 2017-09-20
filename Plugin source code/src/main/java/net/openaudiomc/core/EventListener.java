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

import net.openaudiomc.actions.Command;
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
import org.bukkit.entity.Player;
import org.bukkit.event.EventHandler;
import org.bukkit.event.Listener;
import org.bukkit.event.block.BlockBreakEvent;
import org.bukkit.event.block.BlockPlaceEvent;
import org.bukkit.event.player.PlayerInteractEvent;
import org.bukkit.event.player.PlayerJoinEvent;
import org.bukkit.event.player.PlayerQuitEvent;
import org.bukkit.event.player.PlayerTeleportEvent;

import org.json.JSONException;
import org.json.JSONObject;

import java.util.ArrayList;

public class EventListener implements Listener {
    public static ArrayList<String> connected = new ArrayList<>();

    @EventHandler
    public void onSocketWhisperEvent(SocketWhisperEvent event) {
        Player player = Bukkit.getPlayer(event.getPlayerName());

        Bukkit.getServer().getPluginManager().callEvent(new me.mindgamesnl.openaudiomc.publicApi.SocketWhisperEvent(Bukkit.getPlayer(event.getPlayerName()), event.getData()));

        switch (event.getData()) {
            case "hueConnected":
                player.sendMessage(Main.getFormattedMessage(Main.get().getWebConfig().getHueConnectedMessage()));
                Bukkit.getServer().getPluginManager().callEvent(new me.mindgamesnl.openaudiomc.publicApi.HueConnectEvent(Bukkit.getPlayer(event.getPlayerName())));
                break;
            case "eventMinni":
                player.sendMessage(Main.getFormattedMessage(Main.get().getWebConfig().getConnectWarning()));
                Bukkit.getServer().getPluginManager().callEvent(new me.mindgamesnl.openaudiomc.publicApi.HueConnectEvent(Bukkit.getPlayer(event.getPlayerName())));
                break;
            default:
                try {
                    JSONObject jsonObject = new JSONObject(event.getData());
                    if (jsonObject.getString("command").equals("SoundEnded")) {
                        Bukkit.getServer().getPluginManager().callEvent(new me.mindgamesnl.openaudiomc.publicApi.SoundEndEvent(Bukkit.getPlayer(event.getPlayerName()), jsonObject.getString("id")));
                    }
                } catch (JSONException e) {
                    e.printStackTrace();
                }
                break;
        }
    }

    @EventHandler
    public void onSocketUserConnectEvent(SocketUserConnectEvent event) {
        OfflinePlayer player = Bukkit.getOfflinePlayer(event.getName());
        if (player.isOnline()) {
            if (event.getKey().equals(Sessions.getSession(event.getName()))) {
                AudioSpeakerManager.get().getListeners().put(event.getName(), false);
                Player client = Bukkit.getPlayer(event.getName());
                UserManager.addPlayer(client);
                client.sendMessage(Main.getFormattedMessage(Main.get().getWebConfig().getConnectedMessage()));
                if (Main.get().getWebConfig().getStartSound() != null && !Main.get().getWebConfig().getStartSound().equals("")) {
                    Command.playNormalSound(event.getName(), Main.get().getWebConfig().getStartSound());
                }


                Emitter.connectedInServer(event.getName());
                connected.add(client.getName());
                UserManager.getPlayer(client).syncSounds();
                Main.get().handleRegionListener(client);
                Bukkit.getServer().getPluginManager().callEvent(new me.mindgamesnl.openaudiomc.publicApi.WebConnectEvent(Bukkit.getPlayer(event.getName())));
            } else {
                Emitter.KickPlayerConnection(event.getName());
            }
        }
    }

    @EventHandler
    public void onSocketUserDisconnectEvent(SocketUserDisconnectEvent event) {
        connected.remove(event.getName());
        Bukkit.getServer().getPluginManager().callEvent(new me.mindgamesnl.openaudiomc.publicApi.WebDisconnectEvent(Bukkit.getPlayer(event.getName())));

        String connector = event.getName();
        OfflinePlayer player = Bukkit.getOfflinePlayer(event.getName());
        if (player.isOnline()) {
            player.getPlayer().sendMessage(Main.getFormattedMessage(
                    Main.get().getWebConfig().getDisconnectedMessage()));
        }
        AudioSpeakerManager.get().stopForPlayer(connector);
    }

    @EventHandler
    public void onSocketConnected(SocketConnectEvent event) {
        Main.get().getLogger().info("Socket.io connected");
        Bukkit.getServer().getPluginManager().callEvent(new me.mindgamesnl.openaudiomc.publicApi.SocketIoConnectEvent());
    }

    @EventHandler
    public void onSocketDisconnected(SocketDisconnectEvent event) {
        Main.get().getLogger().info("Socket.io disconnected");

        Bukkit.getServer().getPluginManager().callEvent(new me.mindgamesnl.openaudiomc.publicApi.SocketIoDisconnectEvent());
    }

    @EventHandler
    public void onPlayerJoin(final PlayerJoinEvent event) {
        //delay for if the player joined via bungee
        TimeoutManager.updateCounter();
        Main.get().getServer().getScheduler().scheduleSyncDelayedTask(Main.get(), () -> {
            Emitter.connectedInServer(event.getPlayer().getName());
            UserManager.addPlayer(event.getPlayer());
            UserManager.getPlayer(event.getPlayer()).syncSounds();
            AudioSpeakerManager.get().getListeners().put(event.getPlayer().getName(), false);

            if (event.getPlayer().isOp()) {
                cm_callback.update();
                if (cm_callback.callbacks != 0) {
                    if (!Main.get().getDescription().getVersion().equals(cm_callback.lastVersion)) {
                        String currentVersion = Main.get().getDescription().getVersion();
                        String newVersion = cm_callback.lastVersion;
                        String updateTitle = cm_callback.updateTitle;
                        String message = Main.PREFIX + ChatColor.RESET + "Update is available!" + ChatColor.AQUA + " your version: " + currentVersion + " new version: " + newVersion + ChatColor.RESET + " Updating is recommend";
                        event.getPlayer().sendMessage(message);
                    }
                    String broadcast = cm_callback.broadcast;
                    if (!broadcast.equals("")) {
                        event.getPlayer()
                                .sendMessage(Main.PREFIX + "Important message: " + ChatColor.RESET + broadcast);
                    }
                }
            }
        }, 20);
    }

    @EventHandler
    public void onBlockPlaceEvent(BlockPlaceEvent event) {
        SpeakerMain.onPlace(event);
    }

    @EventHandler
    public void BlockBreakEvent(BlockBreakEvent event) {
        SpeakerMain.onBreak(event);
    }

    @EventHandler
    public void PlayerInteractEvent(PlayerInteractEvent event) {
        SpeakerMain.PlayerInteractEvent(event);
    }

    @EventHandler
    public void onPlayerQuit(PlayerQuitEvent event) {
        Player p = event.getPlayer();
        Command.stop(p.getName());
        Command.stopAllRegions(p.getName());
        Emitter.offlineInServer(p.getName());
        AudioSpeakerManager.get().stopForPlayer(event.getPlayer().getName());
        if (RegionListener.getHistory().get(p) != null) {
            RegionListener.getHistory().get(p).clear();
        }
        AudioSpeakerManager.get().getListeners().put(event.getPlayer().getName(), false);
        Main.get().getGroupManager().getGroups().keySet().forEach(s -> {
            if (Main.get().getGroupManager().getGroup(s).isPresent()) {
                if (Main.get().getGroupManager().getGroup(s).get().getMembers().contains(p.getUniqueId())) {
                    Main.get().getGroupManager().getGroup(s).get().removeMember(p.getUniqueId());
                }
            }
        });
        Main.get().getServer().getScheduler().runTaskLaterAsynchronously(Main.get(), () -> TimeoutManager.updateCounter(), 5);
    }

    @EventHandler
    public void onPlayerTeleport(PlayerTeleportEvent event) {
        if (Main.get().getWebConfig().getStopOnTeleport()) {
            Command.stopAll(event.getPlayer().getName());
        }
    }
}
