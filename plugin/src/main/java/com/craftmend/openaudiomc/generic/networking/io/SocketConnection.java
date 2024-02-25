package com.craftmend.openaudiomc.generic.networking.io;

import com.craftmend.openaudiomc.OpenAudioMc;
import com.craftmend.openaudiomc.api.EventApi;
import com.craftmend.openaudiomc.generic.authentication.AuthenticationService;
import com.craftmend.openaudiomc.generic.authentication.objects.ServerKeySet;
import com.craftmend.openaudiomc.generic.events.events.StateChangeEvent;
import com.craftmend.openaudiomc.generic.networking.DefaultNetworkingService;
import com.craftmend.openaudiomc.generic.oac.OpenaudioAccountService;
import com.craftmend.openaudiomc.generic.logging.OpenAudioLogger;
import com.craftmend.openaudiomc.generic.networking.certificate.CertificateHelper;
import com.craftmend.openaudiomc.generic.networking.abstracts.AbstractPacket;
import com.craftmend.openaudiomc.generic.networking.drivers.ClientDriver;
import com.craftmend.openaudiomc.generic.networking.drivers.NotificationDriver;
import com.craftmend.openaudiomc.generic.networking.drivers.SystemDriver;
import com.craftmend.openaudiomc.generic.platform.interfaces.TaskService;
import com.craftmend.openaudiomc.generic.rest.RestRequest;
import com.craftmend.openaudiomc.generic.rest.response.NoResponse;
import com.craftmend.openaudiomc.generic.rest.routes.Endpoint;
import com.craftmend.openaudiomc.generic.rest.types.RelayLoginResponse;
import com.craftmend.openaudiomc.generic.state.StateService;
import com.craftmend.openaudiomc.generic.state.states.*;
import com.craftmend.openaudiomc.generic.networking.interfaces.Authenticatable;
import com.craftmend.openaudiomc.generic.networking.interfaces.SocketDriver;

import com.craftmend.openaudiomc.generic.storage.enums.StorageKey;
import com.craftmend.openaudiomc.generic.uploads.UploadIndexService;
import io.socket.client.IO;
import io.socket.client.Socket;

import lombok.Getter;

import okhttp3.Call;
import okhttp3.OkHttpClient;
import okhttp3.WebSocket;

import java.io.IOException;
import java.net.ProxySelector;
import java.net.URISyntaxException;
import java.util.UUID;

public class SocketConnection {

    @Getter private final DefaultNetworkingService parent;

    private Socket socket;
    @Getter
    private RestRequest<RelayLoginResponse> relayLoginRequest;
    private RestRequest<NoResponse> relayLogoutRequest;
    private boolean registeredLogout = false;
    @Getter
    private RelayLoginResponse previousLogin;
    private ServerKeySet keySet;
    private SystemDriver systemDriver = new SystemDriver(this);

    private final SocketDriver[] drivers = new SocketDriver[]{
            new NotificationDriver(),
            systemDriver,
            new ClientDriver(),
    };

    public SocketConnection(ServerKeySet keySet, DefaultNetworkingService defaultNetworkingService) {
        this.keySet = keySet;
        this.parent = defaultNetworkingService;
    }

    public void setupConnection() {
        boolean isReconnect = OpenAudioMc.getService(StateService.class).getCurrentState() instanceof ReconnectingState;
        int attempt = isReconnect ? ((ReconnectingState) OpenAudioMc.getService(StateService.class).getCurrentState()).getAttempts() : 0;
        UUID stateId = isReconnect ? ((ReconnectingState) OpenAudioMc.getService(StateService.class).getCurrentState()).getStateId() : null;

        if (!isReconnect && !OpenAudioMc.getService(StateService.class).getCurrentState().canConnect()) return;

        // update state
        if (!isReconnect) {
            // only override the state if we are not reconnecting
            OpenAudioMc.getService(StateService.class).setState(new AssigningRelayState());
        } else {
            OpenAudioLogger.info("Attempting to restore connection to OpenAudioMc, attempt " + attempt);
        }

        if (!registeredLogout) {
            relayLoginRequest = new RestRequest(RelayLoginResponse.class, Endpoint.RELAY_LOGIN);
            relayLoginRequest.setQuery("oa-version", OpenAudioMc.BUILD.getBuildNumber() + "");
            relayLogoutRequest = new RestRequest(NoResponse.class, Endpoint.RELAY_LOGOUT);

            EventApi.getInstance().registerHandler(StateChangeEvent.class, event -> {
                if (event.getOldState() instanceof ConnectedState) {
                    relayLogoutRequest.run();
                }
            });

            registeredLogout = true;
        }

        ProxySelector.setDefault(new NullProxySelector());
        OkHttpClient okHttpClient = CertificateHelper.ignore(new OkHttpClient.Builder().proxySelector(new NullProxySelector())).build();

        IO.Options opts = new IO.Options();
        opts.callFactory = (Call.Factory) okHttpClient;
        opts.reconnection = false;
        opts.webSocketFactory = (WebSocket.Factory) okHttpClient;
        opts.forceNew = true;
        opts.rememberUpgrade = false;

        if (StorageKey.SETTINGS_AUTO_RECONNECT.getBoolean()) {
            opts.query = String.format(
                    "type=server&private=%s&public=%s&reconnect=%s",
                    keySet.getPrivateKey().getValue(),
                    keySet.getPublicKey().getValue(),
                    isReconnect ? "true" : "false"
            );
        } else {
            opts.query = String.format(
                    "type=server&private=%s&public=%s",
                    keySet.getPrivateKey().getValue(),
                    keySet.getPublicKey().getValue()
            );
        }

        // only do login handling if we're not reconnecting, because then we'd be re-using the same config
        if (!isReconnect) {
            OpenAudioMc.resolveDependency(TaskService.class).schduleSyncDelayedTask(() -> {
                if (OpenAudioMc.getService(StateService.class).getCurrentState() instanceof AssigningRelayState) {
                    OpenAudioLogger.info("Connecting timed out.");
                    OpenAudioMc.getService(StateService.class).setState(new IdleState("Connecting to OpenAudioMc timed out"));
                }
            }, 20 * 35);

            relayLoginRequest.run();

            if (relayLoginRequest.hasError()) {
                OpenAudioMc.getService(StateService.class).setState(new IdleState("Failed to do the initial handshake. Error: " + relayLoginRequest.getError()));
                OpenAudioLogger.info("Failed to get instance: " + relayLoginRequest.getError().getMessage());
                try {
                    throw new IOException("Failed to get instance! see console for error information");
                } catch (IOException e) {
                    e.printStackTrace();
                }
                return;
            }

            RelayLoginResponse loginResponse = relayLoginRequest.getResponse();
            previousLogin = loginResponse;
            OpenAudioMc.getService(UploadIndexService.class).setContent(loginResponse.getFiles());
        }

        if (previousLogin == null) {
            OpenAudioMc.getService(StateService.class).setState(new IdleState("Failed to get a relay instance"));
            OpenAudioLogger.warn("Entered a track which should only be entered during recovery, but there was no previous login. reconnect: " + isReconnect + " attempt: " + attempt);
            return;
        }

        try {
            String endpoint = previousLogin.getRelayEndpoint();
            endpoint = endpoint.replace("https", "http");
            socket = IO.socket(endpoint, opts);
        } catch (URISyntaxException e) {
            OpenAudioLogger.error(e, "Received an invalid endpoint");
        }

        // this should again, only be done if we're not reconnecting
        if (!isReconnect) {
            // register state to be connecting
            OpenAudioMc.getService(StateService.class).setState(new ConnectingState());

            // clear session cache
            OpenAudioMc.getService(AuthenticationService.class).getDriver().initCache();
        }

        // schedule timeout check
        OpenAudioMc.resolveDependency(TaskService.class).schduleSyncDelayedTask(() -> {
            // was it a normal connection?
            if (OpenAudioMc.getService(StateService.class).getCurrentState() instanceof ConnectingState) {
                OpenAudioLogger.warn("Connect timed out.");
                OpenAudioMc.getService(StateService.class).setState(new IdleState("Connecting to the assigned instance timed out (socket)"));
            }

            // alternatively, check if we're still in the same reconnect cycle
            if (OpenAudioMc.getService(StateService.class).getCurrentState() instanceof ReconnectingState) {
                ReconnectingState state = (ReconnectingState) OpenAudioMc.getService(StateService.class).getCurrentState();
                if (state.getStateId().equals(stateId) && state.getAttempts() == attempt) {
                    socket.emit(Socket.EVENT_CONNECT_TIMEOUT);
                }
            }
        }, 20 * 35);


        // register drivers
        for (SocketDriver driver : drivers) driver.boot(socket, this);

        socket.connect();
    }

    public void disconnect() {
        if (relayLogoutRequest != null) {
            relayLogoutRequest.run();
        }
        if (this.socket != null) {
            // let them know that we intend to shut down
            systemDriver.setAnnouncedShutdown(true);
            this.socket.emit("announce-shutdown", "goodbye");
            this.socket.disconnect();
        }
        OpenAudioMc.getService(StateService.class).setState(new IdleState());
        OpenAudioMc.getService(OpenaudioAccountService.class).getVoiceApiConnection().stop();
    }

    public void send(Authenticatable client, AbstractPacket packet) {
        // only send the packet if the client is online, valid and the plugin is connected
        if (client.isConnected() && OpenAudioMc.getService(StateService.class).getCurrentState().isConnected()) {
            packet.setClient(client.getOwner().getUniqueId());
            socket.emit("data", OpenAudioMc.getGson().toJson(packet));
        }
    }

}
