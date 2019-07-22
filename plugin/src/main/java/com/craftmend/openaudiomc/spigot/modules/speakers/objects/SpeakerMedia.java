package com.craftmend.openaudiomc.spigot.modules.speakers.objects;

import com.craftmend.openaudiomc.OpenAudioMc;
import com.craftmend.openaudiomc.spigot.modules.configuration.enums.StorageKey;
import com.craftmend.openaudiomc.spigot.modules.media.enums.MediaFlag;
import com.craftmend.openaudiomc.spigot.modules.media.objects.Media;
import lombok.Getter;
import lombok.Setter;

public class SpeakerMedia extends Media {

    @Getter @Setter
    private Boolean distanceFading = false;

    public SpeakerMedia(String source) {
        super(source);
        setLoop(true);
        setDoPickup(OpenAudioMc.getInstance().getConfigurationModule().getBoolean(StorageKey.SETTINGS_SPEAKER_SYNC));
        setFadeTime(500);
        setFlag(MediaFlag.SPEAKER);
    }

}
