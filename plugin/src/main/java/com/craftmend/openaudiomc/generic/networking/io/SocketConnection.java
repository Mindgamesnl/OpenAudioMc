package com.craftmend.openaudiomc.generic.networking.io;

import com.craftmend.openaudiomc.OpenAudioMc;
import com.craftmend.openaudiomc.api.EventApi;
import com.craftmend.openaudiomc.generic.authentication.AuthenticationService;
import com.craftmend.openaudiomc.generic.authentication.objects.ServerKeySet;
import com.craftmend.openaudiomc.generic.events.events.StateChangeEvent;
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
import com.craftmend.openaudiomc.generic.storage.enums.StorageKey;
import com.craftmend.openaudiomc.generic.networking.interfaces.Authenticatable;
import com.craftmend.openaudiomc.generic.networking.interfaces.SocketDriver;
import com.craftmend.openaudiomc.generic.state.states.AssigningRelayState;
import com.craftmend.openaudiomc.generic.state.states.ConnectedState;
import com.craftmend.openaudiomc.generic.state.states.ConnectingState;
import com.craftmend.openaudiomc.generic.state.states.IdleState;

import com.craftmend.openaudiomc.generic.uploads.UploadIndexService;
import io.socket.client.IO;
import io.socket.client.Socket;

import lombok.Getter;

import okhttp3.OkHttpClient;

import java.io.IOException;
import java.net.ProxySelector;
import java.net.URISyntaxException;

public class SocketConnection {

    private Socket socket;
    @Getter
    private RestRequest<RelayLoginResponse> relayLoginRequest;
    private RestRequest<NoResponse> relayLogoutRequest;
    private boolean registeredLogout = false;
    @Getter
    private String lastUsedRelay = "none";
    private ServerKeySet keySet;

    private final SocketDriver[] drivers = new SocketDriver[]{
            new NotificationDriver(),
            new SystemDriver(),
            new ClientDriver(),
    };

    public SocketConnection(ServerKeySet keySet) {
        this.keySet = keySet;
    }

    public void setupConnection() {
        if (!OpenAudioMc.getService(StateService.class).getCurrentState().canConnect()) return;

        // update state
        OpenAudioMc.getService(StateService.class).setState(new AssigningRelayState());

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
        opts.callFactory = okHttpClient;
        opts.reconnection = false;
        opts.webSocketFactory = okHttpClient;

        // authentication headers
        opts.query = String.format(
                "type=server&private=%s&public=%s",
                keySet.getPrivateKey().getValue(),
                keySet.getPublicKey().getValue()
        );

        // schedule timeout check
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

        lastUsedRelay = loginResponse.getRelay();
        OpenAudioMc.getService(UploadIndexService.class).setContent(loginResponse.getFiles());

        try {
            String endpoint = loginResponse.getRelayEndpoint();
            endpoint = endpoint.replace("https", "http");
            socket = IO.socket(endpoint, opts);
        } catch (URISyntaxException e) {
            OpenAudioLogger.error(e, "Received an invalid endpoint");
        }

        // register state to be connecting
        OpenAudioMc.getService(StateService.class).setState(new ConnectingState());

        // clear session cache
        OpenAudioMc.getService(AuthenticationService.class).getDriver().initCache();

        // schedule timeout check
        OpenAudioMc.resolveDependency(TaskService.class).schduleSyncDelayedTask(() -> {
            if (OpenAudioMc.getService(StateService.class).getCurrentState() instanceof ConnectingState) {
                OpenAudioLogger.warn("Connect timed out.");
                OpenAudioMc.getService(StateService.class).setState(new IdleState("Connecting to the assigned instance timed out (socket)"));
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
