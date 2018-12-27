package com.craftmend.openaudiomc.modules.networking.io;

import com.craftmend.openaudiomc.OpenAudioMc;
import com.craftmend.openaudiomc.modules.networking.abstracts.AbstractPacket;
import com.google.gson.Gson;
import io.socket.client.IO;
import io.socket.client.Socket;
import lombok.Getter;
import okhttp3.OkHttpClient;

import java.net.URISyntaxException;
import java.security.KeyManagementException;
import java.security.NoSuchAlgorithmException;

public class SocketIoConnector {

    @Getter private Socket socket;
    @Getter private Boolean isConnected = false;
    private SSLHelper sslHelper;
    private String server;
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

        socket = IO.socket(server, opts);
    }

    private void registerEvents() {
        socket.on(Socket.EVENT_CONNECT, args -> {
            //connected
        });

        socket.on(Socket.EVENT_DISCONNECT, args -> {
            //disconnected
        });

        socket.on("data", args -> {
            AbstractPacket abstractPacket = gson.fromJson((String) args[0], AbstractPacket.class);
            OpenAudioMc.getInstance().getNetworkingModule().triggerPacket(abstractPacket);
        });
    }
}