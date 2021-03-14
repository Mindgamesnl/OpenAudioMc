package com.craftmend.openaudiomc.spigot.modules.voicechat;

import com.craftmend.openaudiomc.OpenAudioMc;
import com.craftmend.openaudiomc.api.impl.event.events.AccountAddTagEvent;
import com.craftmend.openaudiomc.api.interfaces.AudioApi;
import com.craftmend.openaudiomc.generic.craftmend.enums.CraftmendTag;
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

        AudioApi.getInstance().getEventDriver()
                .on(AccountAddTagEvent.class)
                .setHandler(handler -> {
                    if (firstRun) {
                        int maxDistance = StorageKey.SETTINGS_VC_RADIUS.getInt();

                        // tick every second
                        proximityTicker = new PlayerProximityTicker(maxDistance, new PeerFilter(maxDistance));
                        OpenAudioMc.getInstance().getTaskProvider().scheduleAsyncRepeatingTask(proximityTicker, 20, 20);
                        OpenAudioMc.getInstance().getTaskProvider().scheduleAsyncRepeatingTask(new TickVoicePacketQueue(), 3, 3);
                    }
                    firstRun = false;
                });
    }
}
