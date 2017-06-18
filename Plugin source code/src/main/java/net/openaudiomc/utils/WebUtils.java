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
package net.openaudiomc.utils;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.net.*;

import lombok.Cleanup;
import net.openaudiomc.core.Main;
import org.bukkit.scheduler.BukkitRunnable;

import static com.google.common.net.HttpHeaders.USER_AGENT;

public class WebUtils {

    public static String getText(String url) throws Exception {
        URL website = new URL(url);
        URLConnection connection = website.openConnection();
        BufferedReader in = new BufferedReader(
                new InputStreamReader(
                        connection.getInputStream()));

        StringBuilder response = new StringBuilder();
        String inputLine;

        while ((inputLine = in.readLine()) != null)
            response.append(inputLine);

        in.close();
        return response.toString();
    }


    public static String textFromUrl(String request) throws IOException {

        URL obj = new URL(request);
        CookieHandler.setDefault(new CookieManager(null, CookiePolicy.ACCEPT_ALL));
        @Cleanup("disconnect") HttpURLConnection con = (HttpURLConnection) obj.openConnection();

        con.setRequestMethod("GET");
        con.setRequestProperty("User-Agent", USER_AGENT);

        int responseCode = con.getResponseCode();

        BufferedReader in = new BufferedReader(new InputStreamReader(con.getInputStream()));
        String inputLine;
        StringBuilder response = new StringBuilder();

        while ((inputLine = in.readLine()) != null) {
            response.append(inputLine);
        }
        in.close();

        return response.toString();
    }

    public static void asyncHttpRequest(final String request, final Callback<String> callback) {
        new BukkitRunnable() {
            @Override
            public void run() {
                try {
                    URL url = new URL(request);

                    BufferedReader in = new BufferedReader(new InputStreamReader(url.openStream()));

                    final String string = in.readLine();
                    in.close();
                    new BukkitRunnable() {
                        @Override
                        public void run() {
                            callback.execute(string);
                        }
                    }.runTask(Main.get());

                } catch (IOException e) {
                }
            }
        }.runTaskAsynchronously(Main.get());
    }

    public static void asyncHttpRequestNoReturn(final String request, final CallbackNoReturn<String> callback) {
        new BukkitRunnable() {
            @Override
            public void run() {
                try {
                    URL url;
                    url = new URL(request);

                    BufferedReader in = new BufferedReader(new InputStreamReader(url.openStream()));

                    final String string = in.readLine();
                    in.close();
                    new BukkitRunnable() {
                        @Override
                        public void run() {
                            callback.execute(string);
                        }
                    }.runTask(Main.get());

                } catch (IOException e) {
                }
            }
        }.runTaskAsynchronously(Main.get());
    }
}