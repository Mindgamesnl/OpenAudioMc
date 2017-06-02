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

import net.openaudiomc.core.Main;
import net.openaudiomc.utils.CallbackNoReturn;
import net.openaudiomc.utils.WebUtils;
import org.json.JSONObject;

public class cm_callback {
  /**
   * IMPORTANT FILE!
   * this class requests some important invormation from the cm server!
   * data that gets requested in this version
   * - VERSION
   * - SPEAKER TICKS (to prevent lag on our side)
   * - BROADCAST (More info down below)
   * - CHANGE LOG
   *
   * It only gets requested every so often so should not imparct your preformance.
   *
   * Feel free to remove it :/
   *
   * Why the broadcast you may ask, well this is used for letting you know about server outages or
   * give-away's ;)
   * (keep an eye on your twitter to get notified when this will happen)
   */

  public static String lastVersion = "UNKNOWN";
  public static String updateTitle = "UNKNOWN";
  public static Integer speakerTick = 20;
  public static Integer connections_made = 0;
  public static Integer connections_closed = 0;
  public static String broadcast = "UNKNOWN";
  public static Integer callbacks = 0;

  public static void update() {
    CallbackNoReturn<String> callback = new CallbackNoReturn<String>() {
      public void execute(String b) {
        JSONObject jsonObject = new JSONObject(b);
        lastVersion = jsonObject.getString("lastupdate");
        updateTitle = jsonObject.getString("updatetitle");
        speakerTick = jsonObject.getInt("speakertick");
        broadcast = jsonObject.getString("broadcast");
        callbacks++;
      }
    };

    String id = Authenticator.getClientID();
    WebUtils.asyncHttpRequestNoReturn("http://api.openaudiomc.net/status.php?id="
        + id
        + "&version="
        + Main.getPL().getDescription().getVersion(), callback);
  }
}