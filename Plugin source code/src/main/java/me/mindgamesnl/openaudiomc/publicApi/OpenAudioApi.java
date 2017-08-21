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
package me.mindgamesnl.openaudiomc.publicApi;

import lombok.experimental.UtilityClass;
import net.openaudiomc.actions.Command;
import net.openaudiomc.core.EventListener;
import net.openaudiomc.regions.RegionListener;
import net.openaudiomc.socket.Emitter;
import org.bukkit.entity.Player;
import org.json.simple.JSONObject;

@UtilityClass
public class OpenAudioApi {

    /**
     * Play sound normally
     *
     * @param player the Player to play the music to
     * @param source the source of the music
     */
    public void playSound(Player player, String source) {
        playSound(player.getName(), source);
    }

    /**
     * Play sound normally.
     *
     * @param name the Player name
     * @param source the source of the music
     */
    public void playSound(String name, String source) {
        JSONObject obj = new JSONObject();
        obj.put("command", "play_normal");
        obj.put("src", source);
        String command = obj.toString();
        Emitter.EmitToPlayer(name, getCleanURL(command));
    }

    /**
     * Stop the sound that's playing for that player.
     *
     * @param player the Player which you want to stop the music for
     */
    public void stopSound(Player player) {
        stopSound(player.getName());
    }

    /**
     * Stop the sound that's playing for that player.
     *
     * @param name the name of the Player which you want to stop the music for
     */
    public void stopSound(String name) {
        JSONObject obj = new JSONObject();
        obj.put("command", "stop");
        String command = obj.toString();
        Emitter.EmitToPlayer(name, getCleanURL(command));
    }

    public void sendMessage(Player p, String message) {
        Command.sendMessage(p.getName(), message);
    }

    public void setHue(Player p, String rgba) {
        Command.hueSet(p.getName(), rgba);
    }

    public void setBg(Player p, String bg) {
        Command.setBg(p.getName(), bg);
    }

    public void setVolume(Player p, Integer volume) {
        if (volume > 100 || volume < -1) {
        } else {
            String vol = volume.toString();
            Command.setVolume(p.getName(), vol);
        }
    }

    public void sendJson(Player p, String json) {
        Command.sendJSON(p.getName(), json);
    }

    public Boolean isConnected(Player p) {
        return EventListener.isConnected(p.getName());
    }

    public String getRegionSound(String region) {
        return RegionListener.getRegionFile(region);
    }

    public void playRegion(String region_name, String sourcefile) {
        Command.playRegion(region_name, sourcefile);
    }

    public void playLoop(Player p, String src) {
        Command.playLoop(p.getName(), src);
    }

    private String getCleanURL(String url) {
        return url.replaceAll("\\\\", "").trim();
    }
}