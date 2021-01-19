package com.craftmend.openaudiomc.spigot.modules.voicechat;

import com.craftmend.openaudiomc.OpenAudioMc;
import com.craftmend.openaudiomc.generic.logging.OpenAudioLogger;
import com.craftmend.openaudiomc.generic.storage.enums.StorageKey;
import com.craftmend.openaudiomc.spigot.OpenAudioMcSpigot;
import com.craftmend.openaudiomc.spigot.modules.voicechat.tasks.PlayerProximityTicker;
import com.craftmend.openaudiomc.spigot.modules.voicechat.tasks.TickVoicePacketQueue;

public class SpigotVoiceChatModule {

    public SpigotVoiceChatModule(OpenAudioMcSpigot openAudioMcSpigot) {
        if (!OpenAudioMc.getInstance().getVoiceService().isEnabled()) {
            OpenAudioLogger.toConsole("VoiceChat isn't enabled. Skipping the Spigot module.");
            return;
        }

        int maxDistance = StorageKey.SETTINGS_VC_RADIUS.getInt();

        // tick every second
        OpenAudioMc.getInstance().getTaskProvider().scheduleAsyncRepeatingTask(new PlayerProximityTicker(maxDistance), 20, 20);
        OpenAudioMc.getInstance().getTaskProvider().scheduleAsyncRepeatingTask(new TickVoicePacketQueue(), 3, 3);
    }
}
