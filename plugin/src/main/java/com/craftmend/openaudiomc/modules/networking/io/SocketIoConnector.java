package com.craftmend.openaudiomc.modules.networking.io;

import com.craftmend.openaudiomc.OpenAudioMc;
import com.craftmend.openaudiomc.modules.networking.abstracts.AbstractPacket;
import com.craftmend.openaudiomc.modules.networking.packets.PacketAcknowledgeClientRequest;
import com.craftmend.openaudiomc.modules.networking.payloads.AcknowledgeClientPayload;
import com.craftmend.openaudiomc.modules.players.objects.Client;
import com.google.gson.Gson;
import io.socket.client.Ack;
import io.socket.client.IO;
import io.socket.client.Socket;
import io.socket.emitter.Emitter;
import lombok.Getter;
import okhttp3.OkHttpClient;
import org.json.JSONObject;

import java.net.URISyntaxException;
import java.security.KeyManagementException;
import java.security.NoSuchAlgorithmException;

public class SocketIoConnector {

    @Getter
    private Socket socket;
    @Getter
    private Boolean isConnected = false;
    private SSLHelper sslHelper;
    private Gson gson = new Gson();

    public SocketIoConnector(OpenAudioMc openAudioMc) throws KeyManagementException, NoSuchAlgorithmException, URISyntaxException {
        sslHelper = new SSLHelper();
        setupConnection();
        registerEvents();
    }

    private void setupConnection() throws URISyntaxException {
        System.out.println(OpenAudioMc.getLOG_PREFIX() + "Setting up Socket.IO connection.");
        if (isConnected) return;

        OkHttpClient okHttpClient = new OkHttpClient.Builder()
                .hostnameVerifier(sslHelper.getHostnameVerifier())
                .sslSocketFactory(sslHelper.getSslSocketFactory(), sslHelper.getTrustManager())
                .build();

        IO.Options opts = new IO.Options();
        opts.callFactory = okHttpClient;
        opts.webSocketFactory = okHttpClient;
        opts.query = "type=server&" +
                "secret=" + OpenAudioMc.getInstance().getAuthenticationModule().getServerKeySet().getPrivateKey().getValue() + "&" +
                "public=" + OpenAudioMc.getInstance().getAuthenticationModule().getServerKeySet().getPublicKey().getValue();

        socket = IO.socket(OpenAudioMc.getInstance().getConfigurationModule().getServer(), opts);
        socket.connect();
    }

    private void registerEvents() {
        socket.on(Socket.EVENT_CONNECT, args -> {
            //connected
            isConnected = true;
            System.out.println(OpenAudioMc.getLOG_PREFIX() + "Socket: Opened.");
        });

        socket.on(Socket.EVENT_DISCONNECT, args -> {
            //disconnected
            isConnected = false;
            System.out.println(OpenAudioMc.getLOG_PREFIX() + "Socket: closed.");
        });

        socket.on("acknowledgeClient", args -> {
            String data = ((JSONObject) args[0]).toString();
            AcknowledgeClientPayload payload = (AcknowledgeClientPayload) OpenAudioMc.getGson().fromJson(data, AbstractPacket.class).getData();

            Client client = OpenAudioMc.getInstance().getPlayerModule().getClient(payload.getUuid());
            Ack callback = (Ack) args[1];

            if (client == null) {
                callback.call(false);
            } else if (client.getPin().equals(payload.getToken())) {
                client.onConnect();
                callback.call(true);
            } else {
                callback.call(false);
            }
        });

        socket.on("data", args -> {
            String data = ((JSONObject) args[0]).toString();
            AbstractPacket abstractPacket = OpenAudioMc.getGson().fromJson(data, AbstractPacket.class);
            OpenAudioMc.getInstance().getNetworkingModule().triggerPacket(abstractPacket);
        });
    }
}