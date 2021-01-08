package com.craftmend.openaudiomc.generic.networking.io;

import com.craftmend.openaudiomc.OpenAudioMc;
import com.craftmend.openaudiomc.generic.authentication.objects.ServerKeySet;
import com.craftmend.openaudiomc.generic.logging.OpenAudioLogger;
import com.craftmend.openaudiomc.generic.networking.certificate.CertificateHelper;
import com.craftmend.openaudiomc.generic.networking.abstracts.AbstractPacket;
import com.craftmend.openaudiomc.generic.networking.drivers.ClientDriver;
import com.craftmend.openaudiomc.generic.networking.drivers.SystemDriver;
import com.craftmend.openaudiomc.generic.storage.enums.StorageKey;
import com.craftmend.openaudiomc.generic.voicechat.drivers.VoiceChatDriver;
import com.craftmend.openaudiomc.generic.networking.interfaces.Authenticatable;
import com.craftmend.openaudiomc.generic.networking.interfaces.SocketDriver;
import com.craftmend.openaudiomc.generic.networking.rest.RestRequest;
import com.craftmend.openaudiomc.generic.networking.rest.endpoints.RestEndpoint;
import com.craftmend.openaudiomc.generic.networking.rest.interfaces.ApiResponse;
import com.craftmend.openaudiomc.generic.networking.rest.responses.LoginResponse;
import com.craftmend.openaudiomc.generic.state.states.AssigningRelayState;
import com.craftmend.openaudiomc.generic.state.states.ConnectedState;
import com.craftmend.openaudiomc.generic.state.states.ConnectingState;
import com.craftmend.openaudiomc.generic.state.states.IdleState;

import io.socket.client.IO;
import io.socket.client.Socket;

import lombok.Getter;

import okhttp3.OkHttpClient;

import java.io.IOException;
import java.net.ProxySelector;
import java.net.URISyntaxException;
import java.time.Duration;
import java.time.Instant;
import java.util.UUID;

public class SocketIoConnector {

    private Socket socket;
    @Getter private RestRequest plusHandler;
    private RestRequest logoutHandler;
    private boolean registeredLogout = false;
    @Getter private UUID lastUsedRelay = UUID.randomUUID();
    private ServerKeySet keySet;

    private final SocketDriver[] drivers = new SocketDriver[]{
            new SystemDriver(),
            new ClientDriver(),
            new VoiceChatDriver(),
    };

    public SocketIoConnector(ServerKeySet keySet) {
        this.keySet = keySet;
    }

    public void setupConnection() {
        if (!OpenAudioMc.getInstance().getStateService().getCurrentState().canConnect()) return;

        // update state
        OpenAudioMc.getInstance().getStateService().setState(new AssigningRelayState());

        if (!registeredLogout) {
            plusHandler = new RestRequest(RestEndpoint.PLUS_LOGIN);
            logoutHandler = new RestRequest(RestEndpoint.PLUS_LOGOUT);
            OpenAudioMc.getInstance().getStateService().addListener((oldState, updatedState) -> {
                if (oldState instanceof ConnectedState) {
                    logoutHandler.executeAsync();
                }
            });
            registeredLogout = true;
        }

        ProxySelector.setDefault(new NullProxySelector());

        OkHttpClient okHttpClient = CertificateHelper.ignore(new OkHttpClient.Builder().proxySelector(new NullProxySelector())).build();

        IO.Options opts = new IO.Options();
        opts.callFactory = okHttpClient;
        opts.reconnection = false;
        opts.webSocketFactory = okHttpClient;

        // authentication headers
        opts.query = String.format(
                "type=server&private=%s&public=%s",
                keySet.getPrivateKey().getValue(),
                keySet.getPublicKey().getValue()
        );

        // request a relay server
        if (StorageKey.DEBUG_LOG_STATE_CHANGES.getBoolean()) {
            OpenAudioLogger.toConsole("Requesting relay..");
        }

        // schedule timeout check
        OpenAudioMc.getInstance().getTaskProvider().schduleSyncDelayedTask(() -> {
            if (OpenAudioMc.getInstance().getStateService().getCurrentState() instanceof AssigningRelayState) {
                OpenAudioLogger.toConsole("Connecting timed out.");
                OpenAudioMc.getInstance().getStateService().setState(new IdleState("Connecting to the relay timed out"));
            }
        }, 20 * 35);

        Instant request = Instant.now();

        ApiResponse response = plusHandler.executeInThread();

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
        if (StorageKey.DEBUG_LOG_STATE_CHANGES.getBoolean()) {
            OpenAudioLogger.toConsole("Assigned relay: " + loginResponse.getAssignedOpenAudioServer().getSecureEndpoint() + " request took " + Duration.between(request, finish).toMillis() + "MS");
        }
        lastUsedRelay = loginResponse.getAssignedOpenAudioServer().getRelayId();

        // setup socketio connection
        try {
            socket = IO.socket(loginResponse.getAssignedOpenAudioServer().getInsecureEndpoint(), opts);
        } catch (URISyntaxException e) {
            e.printStackTrace();
        }

        // register state to be connecting
        OpenAudioMc.getInstance().getStateService().setState(new ConnectingState());

        // clear session cache
        OpenAudioMc.getInstance().getAuthenticationService().getDriver().initCache();

        // schedule timeout check
        OpenAudioMc.getInstance().getTaskProvider().schduleSyncDelayedTask(() -> {
            if (OpenAudioMc.getInstance().getStateService().getCurrentState() instanceof ConnectingState) {
                OpenAudioLogger.toConsole("Connecting timed out.");
                OpenAudioMc.getInstance().getStateService().setState(new IdleState("Connecting to the relay timed out (socket)"));
            }
        }, 20 * 35);


        // register drivers
        for (SocketDriver driver : drivers) driver.boot(socket, this);
        socket.connect();
    }

    public void disconnect() {
        if (logoutHandler != null) {
            logoutHandler.executeAsync();
        }
        if (this.socket != null) {
            this.socket.disconnect();
        }
        OpenAudioMc.getInstance().getStateService().setState(new IdleState());
    }

    public void send(Authenticatable client, AbstractPacket packet) {
        // only send the packet if the client is online, valid and the plugin is connected
        if (client.getIsConnected() && OpenAudioMc.getInstance().getStateService().getCurrentState().isConnected()) {
            packet.setClient(client.getOwnerUUID());
            socket.emit("data", OpenAudioMc.getGson().toJson(packet));
        }
    }
}
