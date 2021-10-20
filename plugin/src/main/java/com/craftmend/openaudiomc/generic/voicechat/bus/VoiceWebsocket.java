package com.craftmend.openaudiomc.generic.voicechat.bus;

import com.craftmend.openaudiomc.OpenAudioMc;
import com.craftmend.openaudiomc.generic.authentication.AuthenticationService;
import com.craftmend.openaudiomc.generic.logging.OpenAudioLogger;
import com.craftmend.openaudiomc.generic.networking.rest.RestRequest;
import com.craftmend.openaudiomc.generic.networking.rest.endpoints.RestEndpoint;
import com.craftmend.openaudiomc.generic.networking.rest.interfaces.ApiResponse;
import okhttp3.*;
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
    private String server;
    private String password;
    private boolean closed;
    private WebSocket webSocket;

    public VoiceWebsocket(String server, String password) {
        this.server = server;
        this.password = password;
    }

    public boolean start() {
        // check if connections are allowed
        RestRequest preAuthCheck = new RestRequest(RestEndpoint.VOICE_EVENT_BUS_PREAUTH, this.server);
        AuthenticationService authenticationService = OpenAudioMc.getService(AuthenticationService.class);
        preAuthCheck.setQuery("publicKey", authenticationService.getServerKeySet().getPublicKey().getValue());
        preAuthCheck.setQuery("privateKey", authenticationService.getServerKeySet().getPrivateKey().getValue());
        preAuthCheck.setQuery("password", this.password);

        ApiResponse preAuthResponse = preAuthCheck.executeInThread();

        // denied
        if (preAuthResponse.getErrors().size() != 0) {
            OpenAudioLogger.toConsole("Failed to login to RTC, error: " + preAuthResponse.getErrors().get(0).getCode() + "(" + preAuthResponse.getErrors().get(0).getMessage() + ")");
            return false;
        }

        // translate url to websocket
        String ebUri = new RestRequest(RestEndpoint.VOICE_EVENT_BUS, this.server)
                .setQuery("publicKey", authenticationService.getServerKeySet().getPublicKey().getValue())
                .setQuery("privateKey", authenticationService.getServerKeySet().getPrivateKey().getValue())
                .setQuery("password", this.password)
                .getUrl();

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
        client.dispatcher().executorService().shutdown();
        webSocket.close(1005, "");
        this.isReady = false;
    }

    public void pushEventBody(String event) {
        if (!this.isReady) return;
        this.webSocket.send(event);
    }

    @Override
    public void onClosed(@NotNull WebSocket webSocket, int code, @NotNull String reason) {
        OpenAudioLogger.toConsole("Voicechat ws closed: " + reason + " - " + code);
        handleError();
    }

    @Override
    public void onClosing(@NotNull WebSocket webSocket, int code, @NotNull String reason) {
        OpenAudioLogger.toConsole("Voicechat ws closing: " + reason + " - " + code);
        handleError();
    }

    @Override
    public void onFailure(@NotNull WebSocket webSocket, @NotNull Throwable t, @Nullable Response response) {
        String nullableMessage = "";
        if (response != null) nullableMessage = response.message();
        OpenAudioLogger.toConsole("Voicechat ws error: " + t.getMessage() + " - " + nullableMessage);
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
