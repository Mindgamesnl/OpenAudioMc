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

import java.security.SecureRandom;
import java.security.cert.CertificateException;
import java.security.cert.X509Certificate;
import javax.net.ssl.HttpsURLConnection;
import javax.net.ssl.SSLContext;
import javax.net.ssl.TrustManager;
import javax.net.ssl.X509TrustManager;

import net.openaudiomc.core.Main;
import net.openaudiomc.internal.events.SocketUserConnectEvent;
import net.openaudiomc.internal.events.SocketWhisperEvent;
import org.bukkit.Bukkit;
import org.json.simple.JSONObject;
import org.json.simple.JSONValue;

public class SocketioConnector {
    public static Object socket;

    public static void connect() {
        try {
            SSLContext sc = SSLContext.getInstance("TLS");
            sc.init(null, new TrustManager[]{
                    new X509TrustManager() {
                        @Override
                        public void checkClientTrusted(X509Certificate[] x509Certificates, String s) throws CertificateException {
                        }

                        @Override
                        public void checkServerTrusted(X509Certificate[] x509Certificates, String s) throws CertificateException {
                        }

                        @Override
                        public X509Certificate[] getAcceptedIssuers() {
                            return new X509Certificate[0];
                        }
                    }
            }, new SecureRandom());
            IO.setDefaultSSLContext(sc);

            HttpsURLConnection.setDefaultHostnameVerifier((s, sslSession) -> true);

            IO.Options options = new IO.Options();
            options.sslContext = sc;
            options.secure = true;
            options.port = 3000;

            socket = IO.socket(Main.get().getWebConfig().getSocketIp(), options);


            ((Emitter) socket)
                    .on(Socket.EVENT_CONNECT, args -> {
                        JSONObject obj = new JSONObject();
                        obj.put("type", "server");
                        obj.put("id", Authenticator.getID());
                        ((Socket) socket).emit("message", obj.toString());
                        Bukkit.getServer().getPluginManager().callEvent(new net.openaudiomc.internal.events.SocketConnectEvent());
                    })
                    .on("userconnect", args -> {
                        JSONObject json = (JSONObject) JSONValue.parse((String) args[0]);

                        Bukkit.getServer().getPluginManager().callEvent(new SocketUserConnectEvent((String) json.get("name"), (String) json.get("key")));
                    })
                    .on("userdisconnect", args -> {
                        Bukkit.getServer().getPluginManager().callEvent(new net.openaudiomc.internal.events.SocketUserDisconnectEvent((String) args[0]));
                    })
                    .on("whisperFromClient", args -> {
                        JSONObject json = (JSONObject) JSONValue.parse((String) args[0]);
                        Bukkit.getServer().getPluginManager().callEvent(new SocketWhisperEvent((String) json.get("sender"), (String) json.get("content")));
                    })
                    .on("command", args -> {
                        Bukkit.getServer().getPluginManager().callEvent(new net.openaudiomc.internal.events.SocketCommandEvent(args));
                    })
                    .on(Socket.EVENT_DISCONNECT, args -> {
                        Bukkit.getServer().getPluginManager().callEvent(new net.openaudiomc.internal.events.SocketDisconnectEvent());
                    });

            ((Socket) socket).connect();
        } catch (Exception exception) {
            exception.printStackTrace();
        }
    }

    public static void close() {
        if (socket != null) {
            ((Socket) socket).close();
            ((Socket) socket).disconnect();
        }
    }
}