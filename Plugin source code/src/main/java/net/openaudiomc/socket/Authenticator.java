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

import java.io.BufferedReader;
import java.io.File;
import java.io.InputStreamReader;
import java.net.URL;

import org.bukkit.configuration.file.FileConfiguration;
import org.bukkit.configuration.file.YamlConfiguration;
import org.json.JSONException;
import org.json.JSONObject;

public class Authenticator {
  private static String publicKey;

  public static String getID() {
    FileConfiguration cfg =
        YamlConfiguration.loadConfiguration(new File("plugins/OpenAudio", "serverData.yml"));
    return cfg.getString("serverID");
  }

  public static String getClientID() {
    if (publicKey == null) {
      try {
        System.out.println(
            "[OpenAudio] Requesting id for the first time (requesting static token)");
        JSONObject obj = new JSONObject(getClientToken());
        publicKey = obj.getString("cid");
        return obj.getString("cid");
      } catch (JSONException e) {
      } catch (Exception e) {
      }
    } else {
      return publicKey;
    }

    return null;
  }

  public static JSONObject getNewId() {
    try {
      JSONObject obj = new JSONObject(getClient());
      return obj;
    } catch (JSONException e) {
    } catch (Exception e) {
    }
    return null;
  }

  public static String getClientToken() throws Exception {
    URL url = new URL("http://api.openaudiomc.net/plugin/getInfo.php?token=" + getID());
    BufferedReader in = new BufferedReader(new InputStreamReader(url.openStream()));
    String str;
    while ((str = in.readLine()) != null) {
      return str;
    }
    in.close();
    return str;
  }

  public static String getNodeServer(String url_to_server) throws Exception {
    URL url = new URL(url_to_server.replace("https", "http"));
    BufferedReader in = new BufferedReader(new InputStreamReader(url.openStream()));
    String str;
    while ((str = in.readLine()) != null) {
      return str;
    }
    in.close();
    return str;
  }

  public static String getClient() throws Exception {
    URL url = new URL("http://api.openaudiomc.net/plugin/genKey.php");
    BufferedReader in = new BufferedReader(new InputStreamReader(url.openStream()));
    String str;
    while ((str = in.readLine()) != null) {
      return str;
    }
    in.close();
    return str;
  }
}
