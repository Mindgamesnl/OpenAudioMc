package com.craftmend.openaudiomc.services.networking.io;

import com.craftmend.openaudiomc.OpenAudioMc;
import com.craftmend.openaudiomc.services.networking.abstracts.AbstractPacket;
import com.craftmend.openaudiomc.services.networking.payloads.AcknowledgeClientPayload;
import com.craftmend.openaudiomc.modules.players.objects.Client;
import com.craftmend.openaudiomc.services.state.states.ConnectedState;
import com.craftmend.openaudiomc.services.state.states.ConnectingState;
import com.craftmend.openaudiomc.services.state.states.IdleState;
import io.socket.client.Ack;
import io.socket.client.IO;
import io.socket.client.Socket;
import lombok.RequiredArgsConstructor;
import okhttp3.OkHttpClient;
import org.bukkit.Bukkit;

import java.net.URISyntaxException;

@RequiredArgsConstructor
public class SocketIoConnector {

    private final OpenAudioMc openAudioMc;
    private Socket socket;

    public void setupConnection() throws URISyntaxException {
        if (!openAudioMc.getStateService().getCurrentState().canConnect()) return;

        OkHttpClient okHttpClient = new OkHttpClient.Builder().build();

        IO.Options opts = new IO.Options();
        opts.callFactory = okHttpClient;
        opts.webSocketFactory = okHttpClient;

        // authentication headers
        opts.query = "type=server&" +
                "secret=" + OpenAudioMc.getInstance().getAuthenticationService().getServerKeySet().getPrivateKey().getValue() + "&" +
                "public=" + OpenAudioMc.getInstance().getAuthenticationService().getServerKeySet().getPublicKey().getValue();

        socket = IO.socket(OpenAudioMc.getInstance().getConfigurationModule().getServer(), opts);

        // register state to be connecting
        openAudioMc.getStateService().setState(new ConnectingState());

        // attempt to setup
        registerEvents();
        socket.connect();
    }

    private void registerEvents() {
        socket.on(Socket.EVENT_CONNECT, args -> {
            // connected with success
            openAudioMc.getStateService().setState(new ConnectedState());
        });

        socket.on(Socket.EVENT_DISCONNECT, args -> {
            // disconnected, probably with a reason or something
            openAudioMc.getStateService().setState(new IdleState("Disconnected from the socket"));
        });

        socket.on(Socket.EVENT_CONNECT_TIMEOUT, args -> {
            // failed to connect
            openAudioMc.getStateService().setState(new IdleState("Connecting timed out, something wrong with the api, network or token?"));
        });

        socket.on("time-update", args -> {
            String[] data = ((String) args[args.length - 1]).split(":");
            long timeStamp = Long.parseLong(data[0]);
            long offset = Long.parseLong(data[1]);
            OpenAudioMc.getInstance().getTimeService().pushServerUpdate(timeStamp, offset);
        });

        socket.on("acknowledgeClient", args -> {
            AcknowledgeClientPayload payload = (AcknowledgeClientPayload)OpenAudioMc.getGson().fromJson(
                    args[0].toString(),
                    AbstractPacket.class
            ).getData();

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

    public void disconnect() {
        this.socket.disconnect();
    }

    public void send(Client client, AbstractPacket packet) {
        // only send the packet if the client is online, valid and the plugin is connected
        if (client.getIsConnected() && openAudioMc.getStateService().getCurrentState().isConnected()) {
            //check if the player is real, fake players aren't cool
            if (Bukkit.getPlayer(client.getPlayer().getUniqueId()) == null) return;
            packet.setClient(client.getPlayer().getUniqueId());
            socket.emit("data", OpenAudioMc.getGson().toJson(packet));
        }
    }
}
