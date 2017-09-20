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

import java.io.File;
import java.io.IOException;

import net.openaudiomc.utils.WebUtils;
import org.bukkit.configuration.file.FileConfiguration;
import org.bukkit.configuration.file.YamlConfiguration;
import org.json.JSONException;
import org.json.JSONObject;

public class Authenticator {

    public static String getID() {
        FileConfiguration cfg = YamlConfiguration.loadConfiguration(new File("plugins/OpenAudio", "serverData.yml"));
        return cfg.getString("serverID");
    }

    public static String getClientID() {
        FileConfiguration cfg = YamlConfiguration.loadConfiguration(new File("plugins/OpenAudio", "serverData.yml"));
        return cfg.getString("clientId");
    }

    public static JSONObject getNewId() {
        try {
            return new JSONObject(WebUtils.getText("http://api.openaudiomc.net/plugin/genKey.php"));
        } catch (IOException | JSONException ignored) {
        }
        return null;
    }

    public static String getOauthId() {
        String serverid = Authenticator.getID();
        try {
            return WebUtils.getText("http://api.openaudiomc.net/oauth/request_key?serverid=" + serverid);
        } catch (IOException e) {
            return "Error while requesting key.";
        }
    }
}
