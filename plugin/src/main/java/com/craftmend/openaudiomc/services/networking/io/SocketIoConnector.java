package com.craftmend.openaudiomc.services.networking.io;

import com.craftmend.openaudiomc.OpenAudioMc;
import com.craftmend.openaudiomc.modules.players.objects.Session;
import com.craftmend.openaudiomc.services.networking.abstracts.AbstractPacket;
import com.craftmend.openaudiomc.services.networking.payloads.AcknowledgeClientPayload;
import com.craftmend.openaudiomc.modules.players.objects.Client;
import io.socket.client.Ack;
import io.socket.client.IO;
import io.socket.client.Socket;
import lombok.Getter;
import lombok.NoArgsConstructor;
import okhttp3.OkHttpClient;
import org.bukkit.Bukkit;

import java.net.URISyntaxException;

@NoArgsConstructor
public class SocketIoConnector {

    private Socket socket;
    @Getter private Boolean isConnected = false;
    @Getter private Boolean isConnecting = false;

    public void setupConnection() throws URISyntaxException {
        if (!canConnect()) return;

        OkHttpClient okHttpClient = new OkHttpClient.Builder().build();

        IO.Options opts = new IO.Options();
        opts.callFactory = okHttpClient;
        opts.webSocketFactory = okHttpClient;
        opts.query = "type=server&" +
                "secret=" + OpenAudioMc.getInstance().getAuthenticationService().getServerKeySet().getPrivateKey().getValue() + "&" +
                "public=" + OpenAudioMc.getInstance().getAuthenticationService().getServerKeySet().getPublicKey().getValue();

        socket = IO.socket(OpenAudioMc.getInstance().getConfigurationModule().getServer(), opts);

        isConnecting = true;
        registerEvents();
        socket.connect();
    }

    private void registerEvents() {
        socket.on(Socket.EVENT_CONNECT, args -> {
            //connected
            isConnected = true;
            isConnecting = false;
        });

        socket.on(Socket.EVENT_DISCONNECT, args -> {
            //disconnected
            isConnected = false;
            isConnecting = false;
        });

        socket.on(Socket.EVENT_CONNECT_TIMEOUT, args -> isConnecting = false);

        socket.on("time-update", args -> {
            String[] data = ((String) args[args.length - 1]).split(":");
            long timeStamp = Long.parseLong(data[0]);
            long offset = Long.parseLong(data[1]);
            OpenAudioMc.getInstance().getTimeService().pushServerUpdate(timeStamp, offset);
        });

        socket.on("acknowledgeClient", args -> {
            AcknowledgeClientPayload payload = (AcknowledgeClientPayload) OpenAudioMc.getGson().fromJson(args[0].toString(), AbstractPacket.class).getData();
            Client client = OpenAudioMc.getInstance().getPlayerModule().getClient(payload.getUuid());

            Ack callback = (Ack) args[1];

            if (client == null) {
                callback.call(false);
            } else if (client.getSession().getKey().equals(payload.getToken())) {
                client.onConnect();
                callback.call(true);
            } else {
                callback.call(false);
            }
        });

        socket.on("data", args -> {
            AbstractPacket abstractPacket = OpenAudioMc.getGson().fromJson(args[0].toString(), AbstractPacket.class);
            OpenAudioMc.getInstance().getNetworkingService().triggerPacket(abstractPacket);
        });
    }

    private Boolean canConnect() {
        return (!isConnecting && !isConnected);
    }

    public void send(Client client, AbstractPacket packet) {
        if (isConnected && client.getIsConnected()) {
            //check if the player is real, fake players aren't cool
            if (Bukkit.getPlayer(client.getPlayer().getUniqueId()) == null) return;
            packet.setClient(client.getPlayer().getUniqueId());
            socket.emit("data", OpenAudioMc.getGson().toJson(packet));
        }
    }
}