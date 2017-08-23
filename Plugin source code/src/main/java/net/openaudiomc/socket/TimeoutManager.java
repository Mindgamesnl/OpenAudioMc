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

import com.google.common.collect.Lists;
import lombok.Getter;
import net.openaudiomc.internal.events.SocketConnectEvent;
import net.openaudiomc.internal.events.SocketDisconnectEvent;
import net.openaudiomc.core.EventListener;
import org.bukkit.Bukkit;
import org.bukkit.entity.Player;
import org.bukkit.event.EventHandler;
import org.bukkit.event.Listener;

import java.util.ArrayList;
import java.util.List;

public class TimeoutManager implements Listener {
    @Getter
    private static boolean connected = false;
    @Getter
    private static boolean ready = false;
    @Getter
    private static boolean connecting = false;

    @EventHandler
    public void onSocketConnected(SocketConnectEvent event) {
        connecting = false;
        connected = true;
        ready = true;
        cm_callback.callbacks++;
    }

    public static void requestConnect() {
        try {
            if (!isConnected()) {
                cm_callback.update();
                Bukkit.getLogger().info("Reconnecting to the openaudiomc socket server.");
                if (!connecting) {
                    connecting = true;
                    SocketioConnector.connect();
                }
            }
        } catch (Exception e) {
            Bukkit.getLogger()
                    .info(
                            "Failed to connect to the socket.io server, openaudio will not work correctly.");
        }
    }

    public static void updateCounter() {
        Integer connectedPlayersCount = 0;
        List<Boolean> list = Lists.newArrayList(EventListener.isConnected.values());
        for (Boolean value : list) {
            if (value) {
                connectedPlayersCount++;
            }
        }

        if (connectedPlayersCount == 0) {
            if (isConnected()) {
                cm_callback.update();
                Bukkit.getLogger().info("Closing connection with the socket server.");
                SocketioConnector.close();
            }
            return;
        }
        if (Bukkit.getOnlinePlayers().size() == 0) {
            if (isConnected()) {
                cm_callback.update();
                Bukkit.getLogger().info("Closing connection with the socket server.");
                SocketioConnector.close();
            } else {
                Bukkit.getLogger()
                        .info(
                                "Connection with socket server is already closed, skipping closing thingy.");
            }
        }
    }

    @EventHandler
    public void onSocketDisconnected(SocketDisconnectEvent event) {
        connected = false;
        cm_callback.connectionsClosed++;
    }
}