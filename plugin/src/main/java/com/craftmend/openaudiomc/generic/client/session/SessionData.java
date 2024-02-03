package com.craftmend.openaudiomc.generic.client.session;

import com.craftmend.openaudiomc.OpenAudioMc;
import com.craftmend.openaudiomc.api.media.Media;
import com.craftmend.openaudiomc.generic.client.objects.ClientConnection;
import com.craftmend.openaudiomc.generic.oac.OpenaudioAccountService;
import com.craftmend.openaudiomc.generic.oac.enums.CraftmendTag;
import com.craftmend.openaudiomc.generic.environment.MagicValue;
import com.craftmend.openaudiomc.generic.client.helpers.SerializableClient;
import com.craftmend.openaudiomc.generic.platform.Platform;
import com.craftmend.openaudiomc.generic.storage.enums.StorageKey;
import lombok.Getter;
import lombok.Setter;

import java.time.Duration;
import java.time.Instant;
import java.util.ArrayList;
import java.util.List;

@Getter
@Setter
public class SessionData {

    private final transient ClientConnection client;

    private int moderationTimeRemaining = 0;
    private boolean resetVc = false;
    private boolean isModerating = false;
    private boolean isWaitingToken = false;
    private boolean sessionUpdated = false;
    private boolean isConnectedToRtc = false;

    // ongoing sounds - used for media-sources with the expiration timeout configured
    private final List<Media> ongoingMedia = new ArrayList<>();
    private int apiSpeakers = 0;

    // session info
    private int volume = -1;
    private boolean isConnected = false;
    private Instant lastConnectPrompt = Instant.now();

    public SessionData(ClientConnection client) {
        this.client = client;
    }

    public void tick() {
        if (isModerating && moderationTimeRemaining < 15) {
            client.getUser().sendMessage(MagicValue.COMMAND_PREFIX.get(String.class) +
                    Platform.makeColor("RED") + Platform.makeColor("BOLD") + "Warning! Your moderation mode will disable in " + moderationTimeRemaining + " seconds! run " + Platform.makeColor("AQUA") + "/oa voice extend" + Platform.makeColor("RED") + Platform.makeColor("BOLD") + " to stay in moderation mode!");

            if (moderationTimeRemaining == 0) {
                client.setModerating(false);
            }
        }

        if (isModerating && moderationTimeRemaining >= 0) {
            moderationTimeRemaining--;
        }
    }

    public void bumpConnectReminder() {
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
                .sessionUpdated(sessionUpdated)
                .auth(client.getAuth())
                .build();
    }

    public void applySerializedSession(SerializableClient sc) {
        this.volume = sc.getVolume();
        client.getRtcSessionManager().setMicrophoneEnabled(sc.getRtcSessionManager().isMicrophoneEnabled());
        client.getRtcSessionManager().setVoicechatDeafened(sc.getRtcSessionManager().isVoicechatDeafened());
        client.getRtcSessionManager().setStreamKey(sc.getStreamKey());
        this.isConnectedToRtc = sc.isConnectedToRtc();
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
            if (!OpenAudioMc.getService(OpenaudioAccountService.class).is(CraftmendTag.VOICECHAT)) {
                OpenAudioMc.getService(OpenaudioAccountService.class).addTag(CraftmendTag.VOICECHAT);
            }
        }
    }

}
