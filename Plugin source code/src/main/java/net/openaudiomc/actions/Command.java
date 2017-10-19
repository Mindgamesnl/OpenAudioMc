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
package net.openaudiomc.actions;

import lombok.experimental.UtilityClass;
import net.openaudiomc.socket.Emitter;
import org.json.simple.JSONArray;
import org.json.simple.JSONObject;

/**
 * The Class command.
 */
@UtilityClass public class Command {

  /**
   * Play normal sound.
   *
   * @param name the name
   * @param src the src
   */
  public void playNormalSound(String name, String src) {
    JSONObject obj = new JSONObject();
    obj.put("command", "play_normal");
    obj.put("src", src);
    String command = obj.toString();
    Emitter.EmitToPlayer(name, getCleanURL(command));
  }

  /**
   * Stop.
   *
   * @param name the name
   */
  public void stop(String name) {
    JSONObject obj = new JSONObject();
    obj.put("command", "stop");
    String command = obj.toString();
    Emitter.EmitToPlayer(name, getCleanURL(command));
  }

  /**
   * Sets the volume.
   *
   * @param name the name
   * @param volume the volume
   */
  public void setVolume(String name, String volume) {
    JSONObject obj = new JSONObject();
    obj.put("command", "ui");
    obj.put("command", "volume");
    obj.put("volume", volume);
    String command = obj.toString();
    Emitter.EmitToPlayer(name, getCleanURL(command));
  }

  public void forcevolume(String name, String volume) {
    JSONObject obj = new JSONObject();
    obj.put("command", "forcevolume");
    obj.put("volume", volume);
    String command = obj.toString();
    Emitter.EmitToPlayer(name, getCleanURL(command));
  }

  /**
   * Play region.
   *
   * @param name the name
   * @param src the src
   */
  public void playRegion(String name, String src) {
    JSONObject obj = new JSONObject();
    obj.put("type", "region");
    obj.put("command", "startRegion");
    obj.put("src", src);
    obj.put("id", src.replaceAll("[-+.^:,]", "").replaceAll("/", ""));
    String command = obj.toString();
    Emitter.EmitToPlayer(name, getCleanURL(command));
  }

  /**
   * Stop old region.
   *
   * @param name the name
   */
  public void stopRegion(String name, String src) {
    JSONObject obj = new JSONObject();
    obj.put("type", "region");
    obj.put("command", "stopOldRegion");
    obj.put("id", src.replaceAll("[-+.^:,]", "").replaceAll("/", ""));
    String command = obj.toString();
    Emitter.EmitToPlayer(name, getCleanURL(command));
  }

  /**
   * Stop region.
   *
   * @param name the name
   */
  public void stopAllRegions(String name) {
    JSONObject obj = new JSONObject();
    obj.put("type", "region");
    obj.put("command", "stopRegion");
    String command = obj.toString();
    Emitter.EmitToPlayer(name, getCleanURL(command));
  }

  /**
   * Creates the buffer.
   *
   * @param name the name
   * @param src the src
   */
  public void createBuffer(String name, String src) {
    JSONObject obj = new JSONObject();
    obj.put("type", "buffer");
    obj.put("command", "create");
    obj.put("src", src);
    String command = obj.toString();
    Emitter.EmitToPlayer(name, getCleanURL(command));
  }

  /**
   * Play buffer.
   *
   * @param name the name
   */
  public void playBuffer(String name) {
    JSONObject obj = new JSONObject();
    obj.put("type", "buffer");
    obj.put("command", "play");
    String command = obj.toString();
    Emitter.EmitToPlayer(name, getCleanURL(command));
  }

  /**
   * Send message.
   *
   * @param name the name
   * @param message the message
   */
  public void sendMessage(String name, String message) {
    JSONObject obj = new JSONObject();
    obj.put("type", "ui");
    obj.put("command", "message");
    obj.put("string", message);
    String command = obj.toString();
    Emitter.EmitToPlayer(name, getCleanURL(command));
  }

  public void enableHue(String name) {
    JSONObject obj = new JSONObject();
    obj.put("command", "hue");
    obj.put("type", "init");
    String command = obj.toString();
    Emitter.EmitToPlayer(name, getCleanURL(command));
  }

  /**
   * Hue set.
   *
   * @param name the name
   * @param color the color
   */
  public void hueSet(String name, String color) {
    JSONObject obj = new JSONObject();
    obj.put("command", "hue");
    obj.put("type", "set");
    obj.put("target", color);
    String command = obj.toString();
    Emitter.EmitToPlayer(name, getCleanURL(command));
  }

  /**
   * Hue reset.
   *
   * @param name the name
   */
  public void hueReset(String name) {
    JSONObject obj = new JSONObject();
    obj.put("command", "hue");
    obj.put("type", "reset");
    String command = obj.toString();
    Emitter.EmitToPlayer(name, getCleanURL(command));
  }

  /**
   * Hue blink.
   *
   * @param name the name
   */
  public void hueBlink(String name) {
    JSONObject obj = new JSONObject();
    obj.put("command", "hue");
    obj.put("type", "blink");
    String command = obj.toString();
    Emitter.EmitToPlayer(name, getCleanURL(command));
  }

  /**
   * Hue cycle.
   *
   * @param name the name
   */
  public void hueCycle(String name) {
    JSONObject obj = new JSONObject();
    obj.put("command", "hue");
    obj.put("type", "cyclecolors");
    String command = obj.toString();
    Emitter.EmitToPlayer(name, getCleanURL(command));
  }

  /**
   * Hue stop effect.
   *
   * @param name the name
   */
  public void hueStopEffect(String name) {
    JSONObject obj = new JSONObject();
    obj.put("command", "hue");
    obj.put("type", "stop");
    String command = obj.toString();
    Emitter.EmitToPlayer(name, getCleanURL(command));
  }

  /**
   * Sets the bg.
   *
   * @param name the name
   * @param target the target
   */
  public void setBg(String name, String target) {
    JSONObject obj = new JSONObject();
    obj.put("command", "setbg");
    obj.put("type", "set");
    obj.put("target", target);
    String command = obj.toString();
    Emitter.EmitToPlayer(name, getCleanURL(command));
  }

  /**
   * Reset bg.
   *
   * @param name the name
   */
  public void resetBg(String name) {
    JSONObject obj = new JSONObject();
    obj.put("command", "setbg");
    obj.put("type", "reset");
    String command = obj.toString();
    Emitter.EmitToPlayer(name, getCleanURL(command));
  }

  /**
   * Play Loop.
   *
   * @param name the name
   * @param src the src
   */
  public void playLoop(String name, String src) {
    JSONObject obj = new JSONObject();
    obj.put("command", "loop");
    obj.put("src", src);
    String command = obj.toString();
    Emitter.EmitToPlayer(name, getCleanURL(command));
  }

  /**
   * Send JSON String.
   *
   * @param name the name
   * @param src the src
   */
  public void sendJSON(String name, String src) {
    JSONObject obj = new JSONObject();
    obj.put("command", "custom");
    obj.put("string", src);
    String command = obj.toString();
    Emitter.EmitToPlayer(name, getCleanURL(command));
  }

  /**
   * Set Volume ID.
   *
   * @param name the name
   * @param id the id
   * @param args the args
   */
  public void setVolumeID(String name, String id, String args) {
    JSONObject obj = new JSONObject();
    obj.put("command", "setvolumeid");
    obj.put("id", id);
    obj.put("volume", args);
    String command = obj.toString();
    Emitter.EmitToPlayer(name, getCleanURL(command));
  }

  /**
   * Play Normal Sound.
   *
   * @param name the name
   * @param src the src
   * @param id the id
   */
  public void playNormalSoundID(String name, String src, String id) {
    JSONObject obj = new JSONObject();
    obj.put("command", "play_normal_id");
    obj.put("src", src);
    obj.put("id", id);
    String command = obj.toString();
    Emitter.EmitToPlayer(name, getCleanURL(command));
  }

  /**
   * Stop ID.
   *
   * @param name the name
   * @param id the id
   */
  public void StopID(String name, String id) {
    JSONObject obj = new JSONObject();
    obj.put("command", "stop_id");
    obj.put("id", id);
    String command = obj.toString();
    Emitter.EmitToPlayer(name, getCleanURL(command));
  }

  /**
   * Toggle ID.
   *
   * @param name the name
   * @param id the id
   */
  public void ToggleID(String name, String id) {
    JSONObject obj = new JSONObject();
    obj.put("command", "toggle");
    obj.put("id", id);
    String command = obj.toString();
    Emitter.EmitToPlayer(name, getCleanURL(command));
  }

  /**
   * Play List.
   *
   * @param name the name
   * @param jsonArray the jsonArray
   */
  public void playList(String name, JSONArray jsonArray) {
    JSONObject obj = new JSONObject();
    obj.put("command", "playlist");
    obj.put("array", jsonArray);
    String command = obj.toString();
    Emitter.EmitToPlayer(name, getCleanURL(command));
  }

  /**
   * Skip To.
   *
   * @param name the name
   * @param id the id
   * @param timestamp the timestamp
   */
  public void skipTo(String name, String id, String timestamp) {
    JSONObject obj = new JSONObject();
    obj.put("command", "skipto");
    obj.put("id", id);
    obj.put("timeStamp", timestamp);
    String command = obj.toString();
    Emitter.EmitToPlayer(name, getCleanURL(command));
  }

  /**
   * Add Javascript.
   *
   * @param name the name
   * @param src the src
   */
  public void addJs(String name, String src) {
    JSONObject obj = new JSONObject();
    obj.put("command", "loadmod");
    obj.put("type", "js");
    obj.put("src", src);
    String command = obj.toString();
    Emitter.EmitToPlayer(name, getCleanURL(command));
  }

  /**
   * Stop All.
   *
   * @param name the name
   */
  public void stopAll(String name) {
    Command.stop(name);
    Command.stopAllRegions(name);
  }

  /**
   * Add CSS.
   *
   * @param name the name
   * @param src the src
   *
   * @deprecated as of 3.0. Load CSS in {@link #addJs(String, String)} file.
   */
  @Deprecated
  public void addCss(String name, String src) {
    JSONObject obj = new JSONObject();
    obj.put("command", "loadmod");
    obj.put("type", "css");
    obj.put("src", src);
    String command = obj.toString();
    Emitter.EmitToPlayer(name, getCleanURL(command));
  }

  /**
   * Play From Time.
   *
   * @param name the name
   * @param id the id
   * @param src the src
   * @param time the time
   */
  public void playFromTime(String name, String id, String src, Integer time) {
    JSONObject obj = new JSONObject();
    obj.put("command", "play_normal_id");
    obj.put("src", src);
    obj.put("id", id);
    obj.put("time", time);
    String command = obj.toString();
    Emitter.EmitToPlayer(name, getCleanURL(command));
  }

  /**
   * Play New Speaker.
   *
   * @param name the name
   * @param src the src
   * @param l the l
   * @param fullvolume the fullvolume
   */
  public void playNewSpeaker(String name, String src, long l, String fullvolume) {
    JSONObject obj = new JSONObject();
    obj.put("command", "speaker");
    obj.put("type", "add");
    obj.put("src", src);
    obj.put("time", l);
    obj.put("volume", fullvolume);
    String command = obj.toString();
    Emitter.EmitToPlayer(name, getCleanURL(command));
  }

  /**
   * updateSpeakerVolume.
   *
   * @param name the name
   * @param src the src
   * @param fullvolume the fullvolume
   */
  public void updateSpeakerVolume(String name, String src, String fullvolume) {
    JSONObject obj = new JSONObject();
    obj.put("command", "speaker");
    obj.put("type", "volume");
    obj.put("src", src);

    obj.put("volume", fullvolume);
    String command = obj.toString();
    Emitter.EmitToPlayer(name, getCleanURL(command));
  }

  /**
   * Stop all speakers.
   *
   * @param name the url
   */
  public void stopAllSpeakers(String name) {
    JSONObject obj = new JSONObject();
    obj.put("command", "speaker");
    obj.put("type", "stopall");
    String command = obj.toString();
    Emitter.EmitToPlayer(name, getCleanURL(command));
  }

  /**
   * Gets the clean URL.
   *
   * @param url the url
   * @return the clean URL
   */
  public String getCleanURL(String url) {
    return url.replaceAll("\\\\", "").trim();
  }
}