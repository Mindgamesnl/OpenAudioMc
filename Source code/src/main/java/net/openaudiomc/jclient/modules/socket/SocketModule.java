package net.openaudiomc.jclient.modules.socket;

import io.socket.client.IO;
import io.socket.client.Socket;

import lombok.Getter;

import net.openaudiomc.jclient.OpenAudioMc;
import net.openaudiomc.jclient.modules.player.objects.AudioListener;
import net.openaudiomc.jclient.modules.socket.enums.PacketCommand;
import net.openaudiomc.jclient.modules.socket.enums.PacketType;
import net.openaudiomc.jclient.modules.socket.objects.KeyHolder;
import net.openaudiomc.jclient.modules.socket.objects.OaPacket;

import org.json.JSONException;
import org.json.JSONObject;
import org.json.simple.JSONValue;

import javax.net.ssl.HttpsURLConnection;
import javax.net.ssl.SSLContext;
import javax.net.ssl.TrustManager;
import javax.net.ssl.X509TrustManager;

import java.security.SecureRandom;
import java.security.cert.CertificateException;
import java.security.cert.X509Certificate;

public class SocketModule {

    @Getter private Socket socket;
    @Getter private KeyHolder keyHolder;
    @Getter private Boolean connected = false;

    public SocketModule(OpenAudioMc plugin) {

        keyHolder = new KeyHolder(plugin);

        try {
            SSLContext sc = SSLContext.getInstance("TLS");
            sc.init(null,  trustAllCerts, new SecureRandom());
            IO.setDefaultSSLContext(sc);

            HttpsURLConnection.setDefaultHostnameVerifier((s, sslSession) -> true);

            IO.Options options = new IO.Options();
            options.sslContext = sc;
            options.secure = true;
            options.port = 3000;

            socket = IO.socket("api server url TODO LOOOOOOOLLLZ", options);

            socket.on(Socket.EVENT_CONNECT, args -> {

                        OaPacket p = new OaPacket()
                                .setType(PacketType.APISERVER)
                                .setCommand(PacketCommand.REGISTERSERVER)
                                .setValue(keyHolder.getPublickey());

                        send(p);
                        connected = true;

                    })
                    .on("userconnect", args -> {
                        JSONObject json = (JSONObject) JSONValue.parse((String) args[0]);

                        try {
                            String username = json.getString("name");
                            String key = json.getString("key");
                        } catch (JSONException e) {
                            e.printStackTrace();
                        }
                    })
                    .on("userdisconnect", (Object... args) -> {
                        OpenAudioMc.getInstance().getPlayerModule().getListeners().get(args[0]).closeConnection();
                    })
                    .on(Socket.EVENT_DISCONNECT, args -> {
                        connected = false;
                    });

            socket.connect();
        } catch (Exception exception) {
            exception.printStackTrace();
        }
    }

    public void closeConnection() {
        socket.close();
    }

    public void send(OaPacket o) {
        socket.emit("packet", o.serialize());
    }

    private TrustManager[] trustAllCerts = new TrustManager[]{
            new X509TrustManager() {
                public java.security.cert.X509Certificate[] getAcceptedIssuers() {
                    return new java.security.cert.X509Certificate[]{};
                }

                public void checkClientTrusted(X509Certificate[] chain, String authType)
                        throws CertificateException {
                }

                public void checkServerTrusted(X509Certificate[] chain, String authType)
                        throws CertificateException {
                }
            }
    };

}
