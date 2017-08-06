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

import io.socket.client.IO;
import io.socket.client.Socket;
import io.socket.emitter.Emitter;
import java.io.File;
import java.net.URISyntaxException;
import java.security.SecureRandom;
import java.security.cert.CertificateException;
import java.security.cert.X509Certificate;
import javax.net.ssl.HostnameVerifier;
import javax.net.ssl.HttpsURLConnection;
import javax.net.ssl.SSLContext;
import javax.net.ssl.SSLSession;
import javax.net.ssl.TrustManager;
import javax.net.ssl.X509TrustManager;

import net.openaudiomc.internal.events.SocketUserConnectEvent;
import net.openaudiomc.internal.events.SocketWhisperEvent;
import org.bukkit.Bukkit;
import org.bukkit.configuration.file.FileConfiguration;
import org.bukkit.configuration.file.YamlConfiguration;
import org.json.simple.JSONObject;
import org.json.simple.JSONValue;

public class SocketioConnector {
  public static Object socket;

  public static void connect() {
    try {
      FileConfiguration cfg = YamlConfiguration.loadConfiguration(
          new File("plugins/OpenAudio/advanced", "advancedConfig.yml"));
      String apiResponse = Authenticator.getWebResponse(cfg.getString("host").replace("https", "http"));

      JSONObject jsonObject = (JSONObject) JSONValue.parse(apiResponse);

      SSLContext sc = SSLContext.getInstance("TLS");
      sc.init(null, trustAllCerts, new SecureRandom());
      IO.setDefaultSSLContext(sc);
      HttpsURLConnection.setDefaultHostnameVerifier(new RelaxedHostNameVerifier());

      IO.Options options = new IO.Options();
      options.sslContext = sc;
      options.secure = true;
      options.port = 3000;

      socket = IO.socket((String) jsonObject.get("secureSocket"), options);

      ((Emitter) socket).on(Socket.EVENT_CONNECT, args -> {
        JSONObject obj = new JSONObject();
        obj.put("type", "server");
        obj.put("id", Authenticator.getID());
        ((Socket) socket).emit("message", obj.toString());
        SocketConnect();
      })
          .on("userconnect", args -> ConnectEvent(args[0]))
          .on("userdisconnect", args -> DisconnectEvent(args[0]))
          .on("whisperFromClient", args -> whisper(args[0]))
          .on("command", args -> SocketCommandEvent(args[0]))
          .on(Socket.EVENT_DISCONNECT, args -> SocketDisconnect());
      ((Socket) socket).connect();
    } catch (Exception exception) {
      exception.printStackTrace();
    }
  }

  public static void close() {
    if(socket != null) {
      ((Socket) socket).close();
      ((Socket) socket).disconnect();
    }
  }

  private static void SocketConnect() {
    Bukkit.getServer()
        .getPluginManager()
        .callEvent(new net.openaudiomc.internal.events.SocketConnectEvent());
  }

  private static void SocketDisconnect() {
    Bukkit.getServer()
        .getPluginManager()
        .callEvent(new net.openaudiomc.internal.events.SocketDisconnectEvent());
  }

  private static void whisper(Object args) {
    String request = (String) args;
    JSONObject jsonObject = (JSONObject) JSONValue.parse(request);

    String sender = (String) jsonObject.get("sender");
    String content = (String) jsonObject.get("content");

    SocketWhisperEvent whisperEvent = new SocketWhisperEvent(sender, content);
    Bukkit.getServer().getPluginManager().callEvent(whisperEvent);
  }

  private static void ConnectEvent(Object args) {
    String request = (String) args;
    JSONObject jsonObject = (JSONObject) JSONValue.parse(request);

    String name = (String) jsonObject.get("name");
    String key = (String) jsonObject.get("key");

    SocketUserConnectEvent connectEvent = new SocketUserConnectEvent(name, key);
    Bukkit.getServer().getPluginManager().callEvent(connectEvent);
  }

  private static void DisconnectEvent(Object args) {
    Bukkit.getServer()
        .getPluginManager()
        .callEvent(new net.openaudiomc.internal.events.SocketUserDisconnectEvent(args));
  }

  private static void SocketCommandEvent(Object args) {
    Bukkit.getServer()
        .getPluginManager()
        .callEvent(new net.openaudiomc.internal.events.SocketCommandEvent(args));
  }

  private static TrustManager[] trustAllCerts = new TrustManager[] {
      new X509TrustManager() {
        public java.security.cert.X509Certificate[] getAcceptedIssuers() {
          return new java.security.cert.X509Certificate[] {};
        }

        public void checkClientTrusted(X509Certificate[] chain, String authType)
            throws CertificateException {
        }

        public void checkServerTrusted(X509Certificate[] chain, String authType)
            throws CertificateException {
        }
      }
  };

  public static class RelaxedHostNameVerifier implements HostnameVerifier {
    public boolean verify(String hostname, SSLSession session) {
      return true;
    }
  }
}