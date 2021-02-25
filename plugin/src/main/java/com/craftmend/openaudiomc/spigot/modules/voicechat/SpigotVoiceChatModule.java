package com.craftmend.openaudiomc.spigot.modules.voicechat;

import com.craftmend.openaudiomc.OpenAudioMc;
import com.craftmend.openaudiomc.api.impl.event.events.AccountAddTagEvent;
import com.craftmend.openaudiomc.api.interfaces.AudioApi;
import com.craftmend.openaudiomc.generic.storage.enums.StorageKey;
import com.craftmend.openaudiomc.spigot.OpenAudioMcSpigot;
import com.craftmend.openaudiomc.spigot.modules.voicechat.tasks.PlayerProximityTicker;
import com.craftmend.openaudiomc.spigot.modules.voicechat.tasks.TickVoicePacketQueue;

public class SpigotVoiceChatModule {

    private boolean firstRun = true;

    public SpigotVoiceChatModule(OpenAudioMcSpigot openAudioMcSpigot) {
        AudioApi.getInstance().getEventDriver()
                .on(AccountAddTagEvent.class)
                .setHandler(event -> {
                    if (firstRun) {
                        int maxDistance = StorageKey.SETTINGS_VC_RADIUS.getInt();

                        // tick every second
                        OpenAudioMc.getInstance().getTaskProvider().scheduleAsyncRepeatingTask(new PlayerProximityTicker(maxDistance), 20, 20);
                        OpenAudioMc.getInstance().getTaskProvider().scheduleAsyncRepeatingTask(new TickVoicePacketQueue(), 3, 3);
                    }
                    firstRun = false;
                });
    }
}
