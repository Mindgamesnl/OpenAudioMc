package com.craftmend.openaudiomc.generic.networking.io;

import com.craftmend.openaudiomc.OpenAudioMc;
import com.craftmend.openaudiomc.generic.core.logging.OpenAudioLogger;
import com.craftmend.openaudiomc.generic.networking.client.objects.player.ClientConnection;
import com.craftmend.openaudiomc.generic.networking.abstracts.AbstractPacket;
import com.craftmend.openaudiomc.generic.networking.client.objects.plus.PlusSocketSession;
import com.craftmend.openaudiomc.generic.networking.interfaces.Authenticatable;
import com.craftmend.openaudiomc.generic.networking.payloads.AcknowledgeClientPayload;
import com.craftmend.openaudiomc.generic.networking.rest.RestRequest;
import com.craftmend.openaudiomc.generic.networking.rest.endpoints.RestEndpoint;
import com.craftmend.openaudiomc.generic.networking.rest.responses.LoginResponse;
import com.craftmend.openaudiomc.generic.platform.Platform;
import com.craftmend.openaudiomc.generic.state.states.AssigningRelayState;
import com.craftmend.openaudiomc.generic.state.states.ConnectedState;
import com.craftmend.openaudiomc.generic.state.states.ConnectingState;
import com.craftmend.openaudiomc.generic.state.states.IdleState;
import com.craftmend.openaudiomc.generic.core.storage.enums.StorageKey;
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
import java.net.ProxySelector;
import java.net.URISyntaxException;
import java.time.Duration;
import java.time.Instant;
import java.util.List;
import java.util.UUID;
import java.util.function.Consumer;

@RequiredArgsConstructor
public class SocketIoConnector {

    private Socket socket;
    private RestRequest plusHandler;
    private RestRequest logoutHandler;
    private boolean registeredLogout = false;

    public void setupConnection() throws IOException {
        if (!OpenAudioMc.getInstance().getStateService().getCurrentState().canConnect()) return;

        if (!registeredLogout) {
            plusHandler = new RestRequest(RestEndpoint.ENDPOINT_LOGIN);
            logoutHandler = new RestRequest(RestEndpoint.ENDPOINT_LOGOUT);
            OpenAudioMc.getInstance().getStateService().addListener((oldState, updatedState) -> {
                if (oldState instanceof ConnectedState) {
                    logoutHandler.execute();
                }
            });
            registeredLogout = true;
        }

        ProxySelector.setDefault(new NullProxySelector());

        OkHttpClient okHttpClient = new OkHttpClient.Builder().proxySelector(new NullProxySelector()).build();

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
        OpenAudioLogger.toConsole("Requesting relay..");

        // schedule timeout check
        OpenAudioMc.getInstance().getTaskProvider().schduleSyncDelayedTask(() -> {
            if (OpenAudioMc.getInstance().getStateService().getCurrentState() instanceof AssigningRelayState) {
                OpenAudioLogger.toConsole("Connecting timed out.");
                OpenAudioMc.getInstance().getStateService().setState(new IdleState("Connecting to the relay timed out"));
            }
        }, 20 * 35);

        Instant request = Instant.now();

        plusHandler.execute()
                .thenAccept(response -> {
                    if (!response.getErrors().isEmpty()) {
                        OpenAudioMc.getInstance().getStateService().setState(new IdleState("Failed to do the initial handshake. Error: " + response.getErrors().get(0).getCode()));
                        OpenAudioLogger.toConsole("Failed to get relay host.");
                        OpenAudioLogger.toConsole(" - message: " + response.getErrors().get(0).getMessage());
                        OpenAudioLogger.toConsole(" - code: " + response.getErrors().get(0).getCode());
                        try {
                            throw new IOException("Failed to get relay! see console for error information");
                        } catch (IOException e) {
                            e.printStackTrace();
                        }
                        return;
                    }

                    LoginResponse loginResponse = response.getResponse(LoginResponse.class);
                    Instant finish = Instant.now();
                    OpenAudioLogger.toConsole("Assigned relay: " + loginResponse.getAssignedOpenAudioServer().getInsecureEndpoint() + " request took " + Duration.between(request, finish).toMillis() + "MS");

                    // setup socketio connection
                    try {
                        socket = IO.socket(loginResponse.getAssignedOpenAudioServer().getInsecureEndpoint(), opts);
                    } catch (URISyntaxException e) {
                        e.printStackTrace();
                    }

                    // register state to be connecting
                    OpenAudioMc.getInstance().getStateService().setState(new ConnectingState());

                    // schedule timeout check
                    OpenAudioMc.getInstance().getTaskProvider().schduleSyncDelayedTask(() -> {
                        if (OpenAudioMc.getInstance().getStateService().getCurrentState() instanceof ConnectingState) {
                            OpenAudioLogger.toConsole("Connecting timed out.");
                            OpenAudioMc.getInstance().getStateService().setState(new IdleState("Connecting to the relay timed out (socket)"));
                        }
                    }, 20 * 35);

                    // attempt to setup
                    registerEvents();
                    socket.connect();
                });
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

            String message = Platform.translateColors(OpenAudioMc.getInstance().getConfigurationImplementation().getString(StorageKey.MESSAGE_LINK_EXPIRED));
            for (ClientConnection client : OpenAudioMc.getInstance().getNetworkingService().getClients()) {
                if (client.isWaitingToken()) {
                    client.getPlayer().sendMessage(message);
                    client.setWaitingToken(false);
                }
                if (client.isConnected()) {
                    client.onDisconnect();
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

            Authenticatable authenticatable = findSession(payload.getUuid());

            Ack callback = (Ack) args[1];

            if (authenticatable == null) {
                callback.call(false);
            } else if (authenticatable.isTokenCorrect(payload.getToken())) {
                callback.call(true);
                authenticatable.onConnect();
            } else {
                callback.call(false);
            }
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

    private Authenticatable findSession(UUID id) {
        ClientConnection clientConnection = OpenAudioMc.getInstance().getNetworkingService().getClient(id);
        if (clientConnection != null) return clientConnection;
        PlusSocketSession plusSocketSession = OpenAudioMc.getInstance().getPlusService().getConnectionManager().getBySessionId(id);
        return plusSocketSession;
    }

    public void disconnect() {
        this.socket.disconnect();
    }

    public void send(Authenticatable client, AbstractPacket packet) {
        // only send the packet if the client is online, valid and the plugin is connected
        if (client.getIsConnected() && OpenAudioMc.getInstance().getStateService().getCurrentState().isConnected()) {
            packet.setClient(client.getOwnerUUID());
            socket.emit("data", OpenAudioMc.getGson().toJson(packet));
        }
    }

    public void createRoom(List<RoomMember> members, Consumer<Boolean> wasSucessful) {
        socket.emit("request-call-creation", OpenAudioMc.getGson().toJson(members), (Ack) args -> {
            wasSucessful.accept((boolean) args[0]);
        });
    }
}
