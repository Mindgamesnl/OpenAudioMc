package com.craftmend.openaudiomc.generic.client.session;

import com.craftmend.openaudiomc.OpenAudioMc;
import com.craftmend.openaudiomc.generic.client.objects.ClientConnection;
import com.craftmend.openaudiomc.generic.craftmend.CraftmendService;
import com.craftmend.openaudiomc.generic.craftmend.enums.CraftmendTag;
import com.craftmend.openaudiomc.generic.media.objects.Media;
import com.craftmend.openaudiomc.generic.client.helpers.SerializableClient;
import com.craftmend.openaudiomc.generic.platform.Platform;
import com.craftmend.openaudiomc.generic.storage.enums.StorageKey;
import lombok.Data;

import java.time.Duration;
import java.time.Instant;
import java.util.ArrayList;
import java.util.List;

@Data
public class SessionData {

    private final transient ClientConnection client;

    private boolean isWaitingToken = false;
    private boolean sessionUpdated = false;
    private boolean hasHueLinked = false;
    private boolean isConnectedToRtc = false;

    // ongoing sounds
    private final List<Media> ongoingMedia = new ArrayList<>();
    private int apiSpeakers = 0;

    // session info
    private int volume = -1;
    private boolean isConnected = false;
    private Instant lastConnectPrompt = Instant.now();

    public SessionData(ClientConnection client) {
        this.client = client;
    }

    public void tickClient() {
        boolean remindToConnect = OpenAudioMc.getInstance().getConfiguration().getBoolean(StorageKey.SETTINGS_REMIND_TO_CONNECT);

        if (remindToConnect) {
            int reminderInterval = OpenAudioMc.getInstance().getConfiguration().getInt(StorageKey.SETTINGS_REMIND_TO_CONNECT_INTERVAL);
            if (!isConnected() && (Duration.between(getLastConnectPrompt(), Instant.now()).toMillis() * 1000) > reminderInterval) {
                client.getUser().sendMessage(Platform.translateColors(OpenAudioMc.getInstance().getConfiguration().getString(StorageKey.MESSAGE_PROMPT_TO_CONNECT)));
                setLastConnectPrompt(Instant.now());
            }
        }
    }

    public SerializableClient asSerializableCopy() {
        return SerializableClient.builder()
                .volume(volume)
                .isConnected(isConnected)
                .rtcSessionManager(client.getRtcSessionManager())
                .streamKey(client.getRtcSessionManager().getStreamKey())
                .isConnectedToRtc(isConnectedToRtc)
                .hasHueLinked(hasHueLinked)
                .sessionUpdated(sessionUpdated)
                .auth(client.getAuth())
                .build();
    }

    public void applySerializedSession(SerializableClient sc) {
        this.volume = sc.getVolume();
        client.getRtcSessionManager().setMicrophoneEnabled(sc.getRtcSessionManager().isMicrophoneEnabled());
        client.getRtcSessionManager().setStreamKey(sc.getStreamKey());
        this.isConnectedToRtc = sc.isConnectedToRtc();
        this.hasHueLinked = sc.isHasHueLinked();
        this.sessionUpdated = sc.isSessionUpdated();
        client.setAuth(sc.getAuth());
        client.getAuth().setClient(client);

        // compare the two, and fire events
        if (isConnected != sc.isConnected()) {
            if (sc.isConnected()) {
                client.onConnect();
            } else {
                client.onDisconnect();
            }
        }

        if (isConnectedToRtc) {
            if (!OpenAudioMc.getService(CraftmendService.class).is(CraftmendTag.VOICECHAT)) {
                OpenAudioMc.getService(CraftmendService.class).addTag(CraftmendTag.VOICECHAT);
            }
        }
    }

}
