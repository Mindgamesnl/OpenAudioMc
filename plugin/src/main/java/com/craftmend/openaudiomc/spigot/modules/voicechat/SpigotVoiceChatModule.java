package com.craftmend.openaudiomc.spigot.modules.voicechat;

import com.craftmend.openaudiomc.OpenAudioMc;
import com.craftmend.openaudiomc.generic.craftmend.enums.CraftmendTag;
import com.craftmend.openaudiomc.generic.craftmend.interfaces.TagUpdateListener;
import com.craftmend.openaudiomc.generic.storage.enums.StorageKey;
import com.craftmend.openaudiomc.spigot.OpenAudioMcSpigot;
import com.craftmend.openaudiomc.spigot.modules.voicechat.tasks.PlayerProximityTicker;
import com.craftmend.openaudiomc.spigot.modules.voicechat.tasks.TickVoicePacketQueue;

public class SpigotVoiceChatModule {

    public SpigotVoiceChatModule(OpenAudioMcSpigot openAudioMcSpigot) {

        OpenAudioMc.getInstance().getCraftmendService().onTagUpdate(new TagUpdateListener() {
            private boolean firstRun = true;

            @Override
            public void onAdd(CraftmendTag tag) {
                if (firstRun) {
                    int maxDistance = StorageKey.SETTINGS_VC_RADIUS.getInt();

                    // tick every second
                    OpenAudioMc.getInstance().getTaskProvider().scheduleAsyncRepeatingTask(new PlayerProximityTicker(maxDistance), 20, 20);
                    OpenAudioMc.getInstance().getTaskProvider().scheduleAsyncRepeatingTask(new TickVoicePacketQueue(), 3, 3);
                }
                 firstRun = false;
            }

            @Override
            public void onRemove(CraftmendTag tag) {

            }
        });
    }
}
