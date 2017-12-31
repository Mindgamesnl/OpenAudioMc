package net.openaudiomc.jclient.modules.socket;

import io.socket.client.IO;
import io.socket.client.Socket;

import lombok.Getter;

import net.openaudiomc.jclient.OpenAudioMc;
import net.openaudiomc.jclient.modules.player.objects.AudioListener;
import net.openaudiomc.jclient.modules.socket.enums.PacketCommand;
import net.openaudiomc.jclient.modules.socket.objects.KeyHolder;
import net.openaudiomc.jclient.modules.socket.objects.OaPacket;

import org.json.JSONException;
import org.json.JSONObject;

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
            System.out.println("[OpenAudioMc] starting socketio");
            SSLContext sc = SSLContext.getInstance("TLS");
            sc.init(null,  trustAllCerts, new SecureRandom());
            IO.setDefaultSSLContext(sc);

            HttpsURLConnection.setDefaultHostnameVerifier((s, sslSession) -> true);

            IO.Options options = new IO.Options();
            options.sslContext = sc;
            options.secure = true;
            options.port = plugin.getApiEndpoints().getPort();

            socket = IO.socket(plugin.getApiEndpoints().getSocket(), options);

            socket.on(Socket.EVENT_CONNECT, args -> {
                        JSONObject obj = new JSONObject();
                        try {
                            obj.put("pub", keyHolder.getPublickey());
                            obj.put("priv", keyHolder.getPrivatekey());
                        } catch (JSONException e) {
                            e.printStackTrace();
                        }
                        connected = true;
                        System.out.println("[openaudoimc] Authenticating to socket! they are shaking hands! i hope they will be friends some day!");
                        socket.emit("imaserver", obj.toString());
                    })
                    .on("onplayerconnect", (Object... args) -> {
                        JSONObject json = (JSONObject) args[0];
                        try {
                            String username = json.getString("name");
                            String key = json.getString("key");
                            AudioListener l = OpenAudioMc.getInstance().getPlayerModule().getListeners().get(username);
                            if (l != null && l.isAllowedConnection(key)) {
                                l.onConnect();
                                socket.emit("acceptpl", username);

                                if (!OpenAudioMc.getInstance().getConf().getWeb().getTitle().equals("-")) {
                                    l.sendPacket(new OaPacket()
                                            .setCommand(PacketCommand.SET_TITLE)
                                            .setValue(OpenAudioMc.getInstance().getConf().getWeb().getTitle()));
                                }

                                if (!OpenAudioMc.getInstance().getConf().getWeb().getBackground().equals("-")) {
                                    l.sendPacket(new OaPacket()
                                            .setCommand(PacketCommand.SET_BACKGROUND)
                                            .setValue(OpenAudioMc.getInstance().getConf().getWeb().getBackground()));
                                }

                                if (!OpenAudioMc.getInstance().getConf().getWeb().getStartSound().equals("-")) {
                                    l.sendPacket(new OaPacket()
                                            .setCommand(PacketCommand.PLAY)
                                            .setValue(OpenAudioMc.getInstance().getConf().getWeb().getStartSound()));
                                }

                            }
                        } catch (JSONException e) {
                            e.printStackTrace();
                        }
                    })
                    .on("onplayerdisconnect", (args) -> {
                        AudioListener l = OpenAudioMc.getInstance().getPlayerModule().getListeners().get(args[0]);
                        if (l != null && l.getIsConnected()) {
                            l.onDisconnect();
                        }
                    })
                    .on(Socket.EVENT_DISCONNECT, args -> {
                        for (AudioListener l : OpenAudioMc.getInstance().getPlayerModule().getListeners().values()) {
                            l.onDisconnect();
                        }
                        connected = false;
                    });
            socket.connect();
            System.out.println("[OpenAudioMc] socketio started!");
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
