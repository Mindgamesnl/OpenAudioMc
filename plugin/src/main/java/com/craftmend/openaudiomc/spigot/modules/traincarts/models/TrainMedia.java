package com.craftmend.openaudiomc.spigot.modules.traincarts.models;

import com.craftmend.openaudiomc.OpenAudioMc;
import com.craftmend.openaudiomc.api.media.Media;
import com.craftmend.openaudiomc.generic.media.time.TimeService;
import com.craftmend.openaudiomc.generic.storage.enums.StorageKey;
import lombok.Data;

import java.time.Instant;

@Data
public class TrainMedia {

    private Instant startedAt = OpenAudioMc.getService(TimeService.class).getSyncedInstant();
    private String source;
    private Media media;

    public TrainMedia(String source) {
        this.source = source;
        this.media = new Media(this.source);
        this.media.setDoPickup(true);
        this.media.setMediaId("train_audio");
        this.media.setLoop(false);

        this.media.setMuteRegions(StorageKey.SETTINGS_TRAINCARTS_MUTE_REGIONS.getBoolean());
        this.media.setMuteSpeakers(StorageKey.SETTINGS_TRAINCARTS_MUTE_SPEAKERS.getBoolean());
    }

    public Media toMedia() {
        return media;
    }

}
