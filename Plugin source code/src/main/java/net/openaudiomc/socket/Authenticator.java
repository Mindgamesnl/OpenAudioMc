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
import java.io.IOException;
import java.io.InputStreamReader;
import java.net.URL;

import net.openaudiomc.core.Main;
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
        Main.get().getLogger().info("Requesting id for the first time (requesting static token)");
        JSONObject obj = new JSONObject(getWebResponse("http://api.openaudiomc.net/plugin/getInfo.php?token=" + getID()));
        publicKey = obj.getString("cid");
        return obj.getString("cid");
      } catch (Exception ignored) {
      }
    } else {
      return publicKey;
    }

    return null;
  }

  public static JSONObject getNewId() {
    try {
      return new JSONObject(getWebResponse("http://api.openaudiomc.net/plugin/genKey.php"));
    } catch (Exception ignored) {
    }
    return null;
  }

  public static String getWebResponse(String url) throws IOException {
    URL urlObject = new URL(url);
    BufferedReader in = new BufferedReader(new InputStreamReader(urlObject.openStream()));
    String response = in.readLine();
    in.close();
    return response;
  }
}
