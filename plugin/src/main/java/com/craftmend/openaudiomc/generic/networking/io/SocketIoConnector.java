package com.craftmend.openaudiomc.generic.networking.io;

import com.craftmend.openaudiomc.OpenAudioMc;
import com.craftmend.openaudiomc.generic.networking.client.objects.ClientConnection;
import com.craftmend.openaudiomc.generic.networking.abstracts.AbstractPacket;
import com.craftmend.openaudiomc.generic.networking.addapter.GenericApiResponse;
import com.craftmend.openaudiomc.generic.networking.addapter.RelayHost;
import com.craftmend.openaudiomc.generic.networking.payloads.AcknowledgeClientPayload;
import com.craftmend.openaudiomc.generic.networking.rest.RestRequest;
import com.craftmend.openaudiomc.generic.platform.Platform;
import com.craftmend.openaudiomc.generic.state.states.AssigningRelayState;
import com.craftmend.openaudiomc.generic.state.states.ConnectedState;
import com.craftmend.openaudiomc.generic.state.states.ConnectingState;
import com.craftmend.openaudiomc.generic.state.states.IdleState;
import com.craftmend.openaudiomc.generic.storage.enums.StorageKey;
import com.craftmend.openaudiomc.generic.voice.packets.MemberLeftRoomPacket;
import com.craftmend.openaudiomc.generic.voice.packets.RoomClosedPacket;
import com.craftmend.openaudiomc.generic.voice.packets.RoomCreatedPacket;
import com.craftmend.openaudiomc.generic.voice.packets.subtypes.RoomMember;

import io.socket.client.Ack;
import io.socket.client.IO;
import io.socket.client.Socket;

import lombok.RequiredArgsConstructor;

import okhttp3.OkHttpClient;

import java.io.IOException;
import java.net.URISyntaxException;
import java.util.List;
import java.util.function.Consumer;

@RequiredArgsConstructor
public class SocketIoConnector {

    private Socket socket;

    public void setupConnection() throws URISyntaxException, IOException {
        if (!OpenAudioMc.getInstance().getStateService().getCurrentState().canConnect()) return;

        OkHttpClient okHttpClient = new OkHttpClient.Builder().build();

        IO.Options opts = new IO.Options();
        opts.callFactory = okHttpClient;
        opts.reconnection = false;
        opts.webSocketFactory = okHttpClient;

        // update state
        OpenAudioMc.getInstance().getStateService().setState(new AssigningRelayState());

        // load keys
        String privateKey = OpenAudioMc.getInstance().getAuthenticationService().getServerKeySet().getPrivateKey().getValue();
        String publicKey = OpenAudioMc.getInstance().getAuthenticationService().getServerKeySet().getPublicKey().getValue();

        // authentication headers
        opts.query = "type=server&" +
                "private=" + privateKey +
                "&public=" + publicKey;

        // request a relay server
        GenericApiResponse genericApiResponse = new RestRequest("/login.php")
                .setQuery("private", privateKey)
                .setQuery("public", publicKey)
                .execute();

        // check if relay request has errors
        if (genericApiResponse.getErrors().size() != 0) {
            System.out.println(OpenAudioMc.getLOG_PREFIX() + "Failed to get relay host.");
            System.out.println(OpenAudioMc.getLOG_PREFIX() + " - message: " + genericApiResponse.getErrors().get(0).getMessage());
            System.out.println(OpenAudioMc.getLOG_PREFIX() + " - code: " + genericApiResponse.getErrors().get(0).getCode());
            throw new IOException("Failed to get relay! see console for error information");
        }

        // get the relay
        RelayHost relayHost = genericApiResponse.getData().get(0).findInsecureRelay();

        // setup socketio connection
        socket = IO.socket(relayHost.getUrl(), opts);

        // register state to be connecting
        OpenAudioMc.getInstance().getStateService().setState(new ConnectingState());

        // attempt to setup
        registerEvents();
        socket.connect();
    }

    private void registerEvents() {
        socket.on(Socket.EVENT_CONNECT, args -> {
            // connected with success
            OpenAudioMc.getInstance().getStateService().setState(new ConnectedState());
        });

        socket.on(Socket.EVENT_DISCONNECT, args -> {
            // disconnected, probably with a reason or something
            OpenAudioMc.getInstance().getStateService().setState(new IdleState("Disconnected from the socket"));
            OpenAudioMc.getInstance().getVoiceRoomManager().clearCache();

            String message = Platform.translateColors(OpenAudioMc.getInstance().getConfigurationInterface().getString(StorageKey.MESSAGE_LINK_EXPIRED));
            for (ClientConnection client : OpenAudioMc.getInstance().getNetworkingService().getClients()) {
                if (client.getHasWaitingToken()) {
                    client.getPlayer().sendMessage(message);
                    client.setHasWaitingToken(false);
                }
            }
        });

        socket.on(Socket.EVENT_CONNECT_TIMEOUT, args -> {
            // failed to connect
            OpenAudioMc.getInstance().getStateService().setState(new IdleState("Connecting timed out, something wrong with the api, network or token?"));
        });

        socket.on("time-update", args -> {
            String[] data = ((String) args[args.length - 1]).split(":");
            long timeStamp = Long.parseLong(data[0]);
            long offset = Long.parseLong(data[1]);
            OpenAudioMc.getInstance().getTimeService().pushServerUpdate(timeStamp, offset);
        });

        socket.on("acknowledgeClient", args -> {
            AcknowledgeClientPayload payload = (AcknowledgeClientPayload) OpenAudioMc.getGson().fromJson(
                    args[0].toString(),
                    AbstractPacket.class
            ).getData();

            ClientConnection client = OpenAudioMc.getInstance().getNetworkingService().getClient(payload.getUuid());

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

        socket.on("push-flag", args -> {
            String data = ((String) args[args.length - 1]);
            OpenAudioMc.getInstance().getFlagSet().addFlag(data);
        });

        socket.on("voice-room-created", args -> {
            String data = ((String) args[args.length - 1]);
            OpenAudioMc.getInstance().getVoiceRoomManager().registerCall(OpenAudioMc.getGson().fromJson(data, RoomCreatedPacket.class));
        });


        socket.on("voice-room-player-left", args -> {
            String data = ((String) args[args.length - 1]);
            OpenAudioMc.getInstance().getVoiceRoomManager().leaveCall(OpenAudioMc.getGson().fromJson(data, MemberLeftRoomPacket.class));
        });

        socket.on("voice-room-closed", args -> {
            String data = ((String) args[args.length - 1]);
            OpenAudioMc.getInstance().getVoiceRoomManager().closeCall(OpenAudioMc.getGson().fromJson(data, RoomClosedPacket.class));
        });

        socket.on("data", args -> {
            AbstractPacket abstractPacket = OpenAudioMc.getGson().fromJson(args[0].toString(), AbstractPacket.class);
            OpenAudioMc.getInstance().getNetworkingService().triggerPacket(abstractPacket);
        });
    }

    public void disconnect() {
        this.socket.disconnect();
    }

    public void send(ClientConnection client, AbstractPacket packet) {
        // only send the packet if the client is online, valid and the plugin is connected
        if (client.getIsConnected() && OpenAudioMc.getInstance().getStateService().getCurrentState().isConnected()) {
            packet.setClient(client.getPlayer().getUniqueId());
            socket.emit("data", OpenAudioMc.getGson().toJson(packet));
        }
    }

    public void emit(String key, Object data) {
        socket.emit(key, data);
    }

    public void createRoom(List<RoomMember> members, Consumer<Boolean> wasSucessful) {
        socket.emit("request-call-creation", OpenAudioMc.getGson().toJson(members), (Ack) args -> {
            wasSucessful.accept((Boolean) args[0]);
        });
    }
}
