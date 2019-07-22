package com.craftmend.openaudiomc.generic.networking.io;

import com.craftmend.openaudiomc.OpenAudioMcCore;
import com.craftmend.openaudiomc.spigot.OpenAudioMcSpigot;
import com.craftmend.openaudiomc.generic.networking.abstracts.AbstractPacket;
import com.craftmend.openaudiomc.generic.networking.addapter.GenericApiResponse;
import com.craftmend.openaudiomc.generic.networking.addapter.RelayHost;
import com.craftmend.openaudiomc.generic.networking.payloads.AcknowledgeClientPayload;
import com.craftmend.openaudiomc.spigot.modules.players.objects.Client;
import com.craftmend.openaudiomc.generic.networking.rest.RestRequest;
import com.craftmend.openaudiomc.spigot.services.state.states.AssigningRelayState;
import com.craftmend.openaudiomc.spigot.services.state.states.ConnectedState;
import com.craftmend.openaudiomc.spigot.services.state.states.ConnectingState;
import com.craftmend.openaudiomc.spigot.services.state.states.IdleState;

import io.socket.client.Ack;
import io.socket.client.IO;
import io.socket.client.Socket;
import lombok.RequiredArgsConstructor;
import okhttp3.OkHttpClient;
import org.bukkit.Bukkit;

import java.io.IOException;
import java.net.URISyntaxException;

@RequiredArgsConstructor
public class SocketIoConnector {

    private Socket socket;

    public void setupConnection() throws URISyntaxException, IOException {
        if (!OpenAudioMcCore.getInstance().getStateService().getCurrentState().canConnect()) return;

        OkHttpClient okHttpClient = new OkHttpClient.Builder().build();

        IO.Options opts = new IO.Options();
        opts.callFactory = okHttpClient;
        opts.webSocketFactory = okHttpClient;

        // update state
        OpenAudioMcCore.getInstance().getStateService().setState(new AssigningRelayState());

        // load keys
        String privateKey = OpenAudioMcSpigot.getInstance().getAuthenticationService().getServerKeySet().getPrivateKey().getValue();
        String publicKey = OpenAudioMcSpigot.getInstance().getAuthenticationService().getServerKeySet().getPublicKey().getValue();

        // authentication headers
        opts.query = "type=server&" +
                "private=" + privateKey +
                "&public=" + publicKey;

        // request a relay server
        GenericApiResponse genericApiResponse = new RestRequest("/login")
                .setQuery("private", privateKey)
                .setQuery("public", publicKey)
                .execute();

        // check if relay request has errors
        if (genericApiResponse.getErrors().size() != 0) {
            System.out.println(OpenAudioMcSpigot.getLOG_PREFIX() + "Failed to get relay host.");
            System.out.println(OpenAudioMcSpigot.getLOG_PREFIX() + " - message: " + genericApiResponse.getErrors().get(0).getMessage());
            System.out.println(OpenAudioMcSpigot.getLOG_PREFIX() + " - code: " + genericApiResponse.getErrors().get(0).getCode());
            throw new IOException("Failed to get relay! see console for error information");
        }

        // get the relay
        RelayHost relayHost = genericApiResponse.getData().get(0).findInsecureRelay();

        // setup socketio connection
        socket = IO.socket(relayHost.getUrl(), opts);

        // register state to be connecting
        openAudioMcSpigot.getStateService().setState(new ConnectingState());

        // attempt to setup
        registerEvents();
        socket.connect();
    }

    private void registerEvents() {
        socket.on(Socket.EVENT_CONNECT, args -> {
            // connected with success
            openAudioMcSpigot.getStateService().setState(new ConnectedState());
        });

        socket.on(Socket.EVENT_DISCONNECT, args -> {
            // disconnected, probably with a reason or something
            openAudioMcSpigot.getStateService().setState(new IdleState("Disconnected from the socket"));
        });

        socket.on(Socket.EVENT_CONNECT_TIMEOUT, args -> {
            // failed to connect
            openAudioMcSpigot.getStateService().setState(new IdleState("Connecting timed out, something wrong with the api, network or token?"));
        });

        socket.on("time-update", args -> {
            String[] data = ((String) args[args.length - 1]).split(":");
            long timeStamp = Long.parseLong(data[0]);
            long offset = Long.parseLong(data[1]);
            OpenAudioMcSpigot.getInstance().getTimeService().pushServerUpdate(timeStamp, offset);
        });

        socket.on("acknowledgeClient", args -> {
            AcknowledgeClientPayload payload = (AcknowledgeClientPayload) OpenAudioMcSpigot.getGson().fromJson(
                    args[0].toString(),
                    AbstractPacket.class
            ).getData();

            Client client = OpenAudioMcSpigot.getInstance().getPlayerModule().getClient(payload.getUuid());

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
            AbstractPacket abstractPacket = OpenAudioMcSpigot.getGson().fromJson(args[0].toString(), AbstractPacket.class);
            OpenAudioMcSpigot.getInstance().getNetworkingService().triggerPacket(abstractPacket);
        });
    }

    public void disconnect() {
        this.socket.disconnect();
    }

    public void send(Client client, AbstractPacket packet) {
        // only send the packet if the client is online, valid and the plugin is connected
        if (client.getIsConnected() && openAudioMcSpigot.getStateService().getCurrentState().isConnected()) {
            //check if the player is real, fake players aren't cool
            if (Bukkit.getPlayer(client.getPlayer().getUniqueId()) == null) return;
            packet.setClient(client.getPlayer().getUniqueId());
            socket.emit("data", OpenAudioMcSpigot.getGson().toJson(packet));
        }
    }
}
