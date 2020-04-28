package com.craftmend.openaudiomc.spigot.modules.traincarts.models;

import com.craftmend.openaudiomc.OpenAudioMc;
import com.craftmend.openaudiomc.generic.media.objects.Media;
import lombok.Data;

import java.time.Instant;
import java.util.UUID;

@Data
public class TrainMedia {

    private UUID mediaId = UUID.randomUUID();
    private Instant startedAt = OpenAudioMc.getInstance().getTimeService().getSyncedInstant();
    private String source;

    public TrainMedia(String source) {
        this.source = source;
    }

    public Media toMedia() {
        Media media = new Media(this.source);
        media.setDoPickup(true);
        media.setMediaId(this.mediaId.toString());
        media.setLoop(false);
        return media;
    }

}
