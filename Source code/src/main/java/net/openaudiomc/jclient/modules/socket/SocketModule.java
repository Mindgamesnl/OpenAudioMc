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

        connect();
    }

    public void requestClose() {
        Boolean inUse = false;
        for (AudioListener l : OpenAudioMc.getInstance().getPlayerModule().getListeners().values()) {
            if (l.getIsConnected()) inUse = true;
        }
        if (!inUse) closeConnection();
    }

    public void closeConnection() {
        if (connected) {
            System.out.println("[OpenAudioMc] stopping socketio");
            socket.close();
            connected = false;
        }
    }

    public void kickUser(String s) {
        if (connected) socket.emit("kickuser", s);
    }

    public void connect() {
        if (!connected) {
            try {
                System.out.println("[OpenAudioMc] starting socketio");
                SSLContext sc = SSLContext.getInstance("TLS");
                sc.init(null, trustAllCerts, new SecureRandom());
                IO.setDefaultSSLContext(sc);

                HttpsURLConnection.setDefaultHostnameVerifier((s, sslSession) -> true);

                IO.Options options = new IO.Options();
                options.sslContext = sc;
                options.secure = true;
                options.port = OpenAudioMc.getInstance().getApiEndpoints().getPort();

                socket = IO.socket(OpenAudioMc.getInstance().getApiEndpoints().getSocket(), options);

                registerEvents();

                socket.connect();
                System.out.println("[OpenAudioMc] socketio started!");
            } catch (Exception exception) {
                exception.printStackTrace();
            }
        }
    }

    private void registerEvents() {
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
        });

        socket.on(Socket.EVENT_DISCONNECT, args -> {
            connected = false;
        });

        socket.on("onplayerconnect", (Object... args) -> {
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

                    if (!OpenAudioMc.getInstance().getConf().getWeb().getAmbianceSound().equals("-")) {
                        l.sendPacket(new OaPacket()
                                .setCommand(PacketCommand.SET_AMBIANCE_SOUND)
                                .setValue(OpenAudioMc.getInstance().getConf().getWeb().getAmbianceSound()));
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
        });

        socket.on("onplayerdisconnect", (args) -> {
            AudioListener l = OpenAudioMc.getInstance().getPlayerModule().getListeners().get(args[0]);
            if (l != null && l.getIsConnected()) {
                l.onDisconnect();
            }
        });

        socket.on(Socket.EVENT_DISCONNECT, args -> {
            for (AudioListener l : OpenAudioMc.getInstance().getPlayerModule().getListeners().values()) {
                l.onDisconnect();
            }
            connected = false;
        });
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
