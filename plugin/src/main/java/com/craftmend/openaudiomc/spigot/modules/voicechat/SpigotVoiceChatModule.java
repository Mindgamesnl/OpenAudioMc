package com.craftmend.openaudiomc.spigot.modules.voicechat;

import com.craftmend.openaudiomc.OpenAudioMc;
import com.craftmend.openaudiomc.api.impl.event.ApiEventDriver;
import com.craftmend.openaudiomc.api.impl.event.events.*;
import com.craftmend.openaudiomc.api.impl.event.events.enums.VoiceEventCause;
import com.craftmend.openaudiomc.api.interfaces.AudioApi;
import com.craftmend.openaudiomc.generic.craftmend.enums.CraftmendTag;
import com.craftmend.openaudiomc.generic.platform.Platform;
import com.craftmend.openaudiomc.generic.storage.enums.StorageKey;
import com.craftmend.openaudiomc.spigot.OpenAudioMcSpigot;
import com.craftmend.openaudiomc.spigot.modules.voicechat.filters.PeerFilter;
import com.craftmend.openaudiomc.spigot.modules.voicechat.tasks.PlayerProximityTicker;
import com.craftmend.openaudiomc.spigot.modules.voicechat.tasks.TickVoicePacketQueue;
import lombok.Getter;

public class SpigotVoiceChatModule {

    @Getter
    private PlayerProximityTicker proximityTicker;
    private boolean firstRun = true;

    public SpigotVoiceChatModule(OpenAudioMcSpigot openAudioMcSpigot) {
        ApiEventDriver eventDriver = AudioApi.getInstance().getEventDriver();

        // enable voice chat when the tag gets added
        eventDriver.on(AccountAddTagEvent.class).setHandler(handler -> {
                    if (firstRun) {
                        int maxDistance = StorageKey.SETTINGS_VC_RADIUS.getInt();

                        // tick every second
                        proximityTicker = new PlayerProximityTicker(maxDistance, new PeerFilter(maxDistance));
                        OpenAudioMc.getInstance().getTaskProvider().scheduleAsyncRepeatingTask(proximityTicker, 20, 20);
                        OpenAudioMc.getInstance().getTaskProvider().scheduleAsyncRepeatingTask(new TickVoicePacketQueue(), 3, 3);
                    }
                    firstRun = false;
                });

        // register events to notify players when player enter, leave, and whatever
        eventDriver.on(PlayerEnterVoiceProximityEvent.class).setHandler(event -> {
                    // skip if this is disabled in the settings
                    if (!StorageKey.SETTINGS_VC_ANNOUNCEMENTS.getBoolean()) return;

                    // only notify normal events, we don't really care about special things
                    if (event.getCause() != VoiceEventCause.NORMAL) return;

                    // a player entered the radius and is now listening
                    event.getSpeaker().getPlayer().sendMessage(Platform.translateColors(
                            StorageKey.MESSAGE_VC_USER_ADDED.getString()
                                    .replace("%name", event.getListener().getOwnerName())
                    ));
                });

        eventDriver.on(PlayerLeaveVoiceProximityEvent.class).setHandler(event -> {
                    // skip if this is disabled in the settings
                    if (!StorageKey.SETTINGS_VC_ANNOUNCEMENTS.getBoolean()) return;

                    // only notify normal events, we don't really care about special things
                    if (event.getCause() != VoiceEventCause.NORMAL) return;

                    // a player left proximity, goodbye!
                    event.getSpeaker().getPlayer().sendMessage(Platform.translateColors(
                            StorageKey.MESSAGE_VC_USER_LEFT.getString()
                                    .replace("%name", event.getListener().getOwnerName())
                    ));
                });

        // mute messages
        eventDriver.on(MicrophoneMuteEvent.class).setHandler(event -> {
            if (!event.getClient().isConnected()) return;
            event.getClient().getPlayer().sendMessage(Platform.translateColors(StorageKey.MESSAGE_VC_MIC_MUTE.getString()));
        });

        eventDriver.on(MicrophoneUnmuteEvent.class).setHandler(event -> {
            if (!event.getClient().isConnected()) return;
            event.getClient().getPlayer().sendMessage(Platform.translateColors(StorageKey.MESSAGE_VC_MIC_UNMUTE.getString()));
        });

    }
}
