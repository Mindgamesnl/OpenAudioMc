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
package net.openaudiomc.socket;

import io.socket.client.Socket;

import org.bukkit.Bukkit;
import org.bukkit.OfflinePlayer;
import org.bukkit.entity.Player;
import org.json.simple.JSONObject;

public class Emitter {

    public static void EmitToPlayer(String player, String message) {
        if (TimeoutManager.isConnected()) {
            try {
                if (player.equalsIgnoreCase("@a")) {
                    for (Player p : Bukkit.getServer().getOnlinePlayers()) {
                        JSONObject obj = new JSONObject();
                        obj.put("target", p.getName());
                        obj.put("commandobj", message);
                        ((Socket) SocketioConnector.socket).emit("send", obj.toString());
                    }
                } else {
                    OfflinePlayer p = Bukkit.getOfflinePlayer(player);
                    if (p.isOnline()) {
                        JSONObject obj = new JSONObject();
                        obj.put("target", player);
                        obj.put("commandobj", message);
                        ((Socket) SocketioConnector.socket).emit("send", obj.toString());
                    }
                }
            } catch (NullPointerException e) {
            }
            Bukkit.getServer().getPluginManager().callEvent(new me.mindgamesnl.openaudiomc.publicApi.WebsocketSendEvent(Bukkit.getPlayer(player), message));
        }
    }

    public static void KickPlayerConnection(String name) {
        ((Socket) SocketioConnector.socket).emit("kick", name);
    }

    public static void offlineInServer(String name) {
        if (TimeoutManager.isConnected()) {
            JSONObject obj = new JSONObject();
            obj.put("target", name);
            obj.put("commandobj", "not_in_server");
            ((Socket) SocketioConnector.socket).emit("send", obj.toString());
        }
    }

    public static void connectedInServer(String name) {
        if (TimeoutManager.isConnected()) {
            JSONObject obj = new JSONObject();
            obj.put("target", name);
            obj.put("commandobj", "connectionSuccess");

            ((Socket) SocketioConnector.socket).emit("send", obj.toString());
        }
    }
}