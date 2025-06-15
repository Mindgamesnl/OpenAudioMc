package com.craftmend.openaudiomc.generic.voicechat.bus;

import com.craftmend.openaudiomc.OpenAudioMc;
import com.craftmend.openaudiomc.generic.authentication.AuthenticationService;
import com.craftmend.openaudiomc.generic.logging.OpenAudioLogger;
import com.craftmend.openaudiomc.generic.rest.RestRequest;
import com.craftmend.openaudiomc.generic.rest.response.NoResponse;
import com.craftmend.openaudiomc.generic.rest.routes.Endpoint;
import com.craftmend.openaudiomc.generic.storage.enums.StorageKey;
import lombok.Getter;
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
import java.util.concurrent.TimeUnit;

public class VoiceSocket extends WebSocketListener {

    private static final OkHttpClient CLIENT = new OkHttpClient.Builder()
            .connectTimeout(2, TimeUnit.SECONDS).build();

    private final Set<Runnable> onEerror = new HashSet<>();
    private final Set<Runnable> onReady = new HashSet<>();
    private boolean isReady = false;
    private final String server;
    private final String password;
    private boolean closed = false;
    private WebSocket webSocket;
    private final boolean isReconnectAttempt;
    @Getter private boolean announcedShutdown = false;

    public VoiceSocket(String server, String password, boolean isReconnectAttempt) {
        this.server = server;
        this.password = password;
        this.isReconnectAttempt = isReconnectAttempt;
    }

    public boolean start() {
        // check if connections are allowed
        RestRequest<NoResponse> preAuthCheck = new RestRequest<>(NoResponse.class, Endpoint.VOICE_PREFLIGHT_CHECK);
        AuthenticationService authenticationService = OpenAudioMc.getService(AuthenticationService.class);
        preAuthCheck.setQuery("publicKey", authenticationService.getServerKeySet().getPublicKey().getValue());
        preAuthCheck.setQuery("privateKey", authenticationService.getServerKeySet().getPrivateKey().getValue());
        preAuthCheck.setQuery("password", this.password);

        if (StorageKey.SETTINGS_AUTO_RECONNECT.getBoolean()) {
            preAuthCheck.setQuery("reconnect", String.valueOf(this.isReconnectAttempt));
        }

        preAuthCheck.setBaseUrl(this.server);
        preAuthCheck.run();

        // denied
        if (preAuthCheck.hasError()) {
            OpenAudioLogger.warn("Failed to login to RTC, error: " + preAuthCheck.getError().getMessage());
            return false;
        }

        // translate url to websocket
        RestRequest<NoResponse> urlBuilder = new RestRequest<>(NoResponse.class, Endpoint.VOICE_BUS)
                .setQuery("publicKey", authenticationService.getServerKeySet().getPublicKey().getValue())
                .setQuery("privateKey", authenticationService.getServerKeySet().getPrivateKey().getValue())
                .setQuery("password", this.password);

        if (StorageKey.SETTINGS_AUTO_RECONNECT.getBoolean()) {
            urlBuilder.setQuery("reconnect", String.valueOf(this.isReconnectAttempt));
        }

        urlBuilder.setBaseUrl(this.server);

        String ebUri = urlBuilder.buildURL();

        ebUri = ebUri.replace("http", "ws"); // https:// => wss:// and http:// => ws://

        Request request = new Request.Builder()
                .url(ebUri)
                .build();
        this.isReady = false;

        webSocket = CLIENT.newWebSocket(request, this);
        CLIENT.connectionPool().evictAll();
        return true;
    }

    public void stop() {
        closed = true;
        announcedShutdown = true;
        if (webSocket != null) {
            webSocket.close(1000, "Goodbye");
        }
        this.isReady = false;
    }

    public void pushEventBody(String event) {
        if (!this.isReady) return;
        this.webSocket.send(event);
    }

    @Override
    public void onClosed(@NotNull WebSocket webSocket, int code, @NotNull String reason) {
        if (code != 1000 && code != 1005) {
            OpenAudioLogger.warn("RTC connection closed with code " + code + " and reason " + reason);
        }
        handleError(false);
    }

    @Override
    public void onClosing(@NotNull WebSocket webSocket, int code, @NotNull String reason) {
        // closed by server
        webSocket.close(1000, null);
        if (code != 1000 && code != 1005) {
            OpenAudioLogger.warn("Voicechat ws closing: " + reason + " - " + code);
        }
        handleError(false);
    }

    @Override
    public void onFailure(@NotNull WebSocket webSocket, @NotNull Throwable t, @Nullable Response response) {
        // Second Change
        webSocket.close(1000, null);

        String nullableMessage = "";
        if (response != null) nullableMessage = response.message();
        // did we get a normal http response?
        if (response != null && response.code() != 101) {
            OpenAudioLogger.warn("Got unexpected http: " + t.getMessage() + " - " + nullableMessage);
            handleError(true);
            return;
        }
        OpenAudioLogger.warn("Voicechat ws error: " + t.getMessage() + " - " + nullableMessage);
        handleError(false);
    }

    @Override
    public void onMessage(@NotNull WebSocket webSocket, @NotNull String text) {
        switch (text) {
            case "INTENT_TO_DISCONNECT":
                announcedShutdown = true;
                return;
        }
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

    private void handleError(boolean ignoreReady) {
        if (!this.isReady && !ignoreReady) return;
        if (closed) return;
        this.isReady = false;
        for (Runnable runnable : this.onEerror) {
            runnable.run();
        }
    }

}
