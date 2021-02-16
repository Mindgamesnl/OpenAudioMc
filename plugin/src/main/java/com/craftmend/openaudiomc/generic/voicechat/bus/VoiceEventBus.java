package com.craftmend.openaudiomc.generic.voicechat.bus;

import com.craftmend.openaudiomc.generic.voicechat.driver.VoiceServerDriver;
import okhttp3.*;
import okio.ByteString;
import org.jetbrains.annotations.NotNull;
import org.jetbrains.annotations.Nullable;

public class VoiceEventBus extends WebSocketListener {

    private boolean isReady = false;
    private VoiceServerDriver driver;
    private OkHttpClient client = new OkHttpClient.Builder()
            .build();

    public VoiceEventBus(String socketUri, VoiceServerDriver driver) {
        this.driver = driver;

        // translate url to websocket
        socketUri = socketUri.replace("http", "ws"); // https:// => wss:// and http:// => ws://

        Request request = new Request.Builder()
                .url(socketUri)
                .build();
        this.isReady = false;

        client.newWebSocket(request, this);
    }

    public void stop() {
        client.dispatcher().executorService().shutdown();
        this.isReady = false;
    }

    @Override
    public void onClosed(@NotNull WebSocket webSocket, int code, @NotNull String reason) {
        this.isReady = false;
    }

    @Override
    public void onClosing(@NotNull WebSocket webSocket, int code, @NotNull String reason) {
        this.isReady = false;
    }

    @Override
    public void onFailure(@NotNull WebSocket webSocket, @NotNull Throwable t, @Nullable Response response) {
        this.isReady = false;
    }

    @Override
    public void onMessage(@NotNull WebSocket webSocket, @NotNull String text) {

    }

    @Override
    public void onMessage(@NotNull WebSocket webSocket, @NotNull ByteString bytes) {

    }

    @Override
    public void onOpen(@NotNull WebSocket webSocket, @NotNull Response response) {
        this.isReady = true;
    }

}
