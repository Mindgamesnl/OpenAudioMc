package com.craftmend.openaudiomc.spigot.modules.speakers.objects;

import com.craftmend.openaudiomc.OpenAudioMc;
import com.craftmend.openaudiomc.api.media.Media;
import com.craftmend.openaudiomc.generic.storage.enums.StorageKey;
import com.craftmend.openaudiomc.api.media.MediaFlag;

public class SpeakerMedia extends Media {
    private boolean distanceFading = false;

    public SpeakerMedia(String source) {
        super(source);
        setLoop(true);
        setDoPickup(OpenAudioMc.getInstance().getConfiguration().getBoolean(StorageKey.SETTINGS_SPEAKER_SYNC));
        setFadeTime(100);
        setFlag(MediaFlag.SPEAKER);
    }

    public boolean isDistanceFading() {
        return this.distanceFading;
    }

    public void setDistanceFading(final boolean distanceFading) {
        this.distanceFading = distanceFading;
    }
}
