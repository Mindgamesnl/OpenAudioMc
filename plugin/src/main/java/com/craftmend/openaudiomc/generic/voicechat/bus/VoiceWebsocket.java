package com.craftmend.openaudiomc.generic.voicechat.bus;

import com.craftmend.openaudiomc.OpenAudioMc;
import com.craftmend.openaudiomc.generic.authentication.AuthenticationService;
import com.craftmend.openaudiomc.generic.logging.OpenAudioLogger;
import com.craftmend.openaudiomc.generic.rest.RestRequest;
import com.craftmend.openaudiomc.generic.rest.response.NoResponse;
import com.craftmend.openaudiomc.generic.rest.routes.Endpoint;
import okhttp3.OkHttpClient;
import okhttp3.Request;
import okhttp3.Response;
import okhttp3.WebSocket;
import okhttp3.WebSocketListener;
import okio.ByteString;
import org.jetbrains.annotations.NotNull;
import org.jetbrains.annotations.Nullable;

import java.util.HashSet;
import java.util.Set;

public class VoiceWebsocket extends WebSocketListener {

    private final Set<Runnable> onEerror = new HashSet<>();
    private final Set<Runnable> onReady = new HashSet<>();
    private final OkHttpClient client = new OkHttpClient.Builder().build();
    private boolean isReady = false;
    private final String server;
    private final String password;
    private boolean closed;
    private WebSocket webSocket;

    public VoiceWebsocket(String server, String password) {
        this.server = server;
        this.password = password;
    }

    public boolean start() {
        // check if connections are allowed
        RestRequest preAuthCheck = new RestRequest(NoResponse.class, Endpoint.VOICE_PREFLIGHT_CHECK);
        AuthenticationService authenticationService = OpenAudioMc.getService(AuthenticationService.class);
        preAuthCheck.setQuery("publicKey", authenticationService.getServerKeySet().getPublicKey().getValue());
        preAuthCheck.setQuery("privateKey", authenticationService.getServerKeySet().getPrivateKey().getValue());
        preAuthCheck.setQuery("password", this.password);
        preAuthCheck.setBaseUrl(this.server);
        preAuthCheck.run();

        // denied
        if (preAuthCheck.hasError()) {
            OpenAudioLogger.warn("Failed to login to RTC, error: " + preAuthCheck.getError().getMessage());
            return false;
        }

        // translate url to websocket
        String ebUri = new RestRequest<>(NoResponse.class, Endpoint.VOICE_BUS)
                .setQuery("publicKey", authenticationService.getServerKeySet().getPublicKey().getValue())
                .setQuery("privateKey", authenticationService.getServerKeySet().getPrivateKey().getValue())
                .setQuery("password", this.password)
                .setBaseUrl(this.server)
                .buildURL();

        ebUri = ebUri.replace("http", "ws"); // https:// => wss:// and http:// => ws://

        Request request = new Request.Builder()
                .url(ebUri)
                .build();
        this.isReady = false;

        webSocket = client.newWebSocket(request, this);
        return true;
    }

    public void stop() {
        closed = true;
        if (webSocket != null) {
            webSocket.close(1000, "Goodbye");
        }
        if (client != null && client.dispatcher() != null) {
            client.dispatcher().executorService().shutdown();
        }
        this.isReady = false;
    }

    public void pushEventBody(String event) {
        if (!this.isReady) return;
        this.webSocket.send(event);
    }

    @Override
    public void onClosed(@NotNull WebSocket webSocket, int code, @NotNull String reason) {
        if (code != 1000) {
            OpenAudioLogger.warn("RTC connection closed with code " + code + " and reason " + reason);
        }
        handleError();
    }

    @Override
    public void onClosing(@NotNull WebSocket webSocket, int code, @NotNull String reason) {
        if (code != 1000) {
            OpenAudioLogger.warn("Voicechat ws closing: " + reason + " - " + code);
        }
        handleError();
    }

    @Override
    public void onFailure(@NotNull WebSocket webSocket, @NotNull Throwable t, @Nullable Response response) {
        String nullableMessage = "";
        if (response != null) nullableMessage = response.message();
        OpenAudioLogger.warn("Voicechat ws error: " + t.getMessage() + " - " + nullableMessage);
        handleError();
    }

    @Override
    public void onMessage(@NotNull WebSocket webSocket, @NotNull String text) {

    }

    @Override
    public void onMessage(@NotNull WebSocket webSocket, @NotNull ByteString bytes) {

    }

    @Override
    public void onOpen(@NotNull WebSocket webSocket, @NotNull Response response) {
        this.webSocket = webSocket;
        this.isReady = true;
        for (Runnable runnable : this.onReady) {
            runnable.run();
        }
    }

    public void onError(Runnable runnable) {
        this.onEerror.add(runnable);
    }

    public void onReady(Runnable runnable) {
        this.onReady.add(runnable);
    }

    private void handleError() {
        if (!this.isReady) return;
        if (closed) return;
        this.isReady = false;
        for (Runnable runnable : this.onEerror) {
            runnable.run();
        }
    }

}
