package com.craftmend.openaudiomc.spigot.modules.traincarts.models;

import com.craftmend.openaudiomc.OpenAudioMc;
import com.craftmend.openaudiomc.generic.media.objects.Media;
import lombok.Data;

import java.time.Instant;
import java.util.UUID;

@Data
public class    TrainMedia {

    private UUID mediaId = UUID.randomUUID();
    private Instant startedAt = OpenAudioMc.getInstance().getTimeService().getSyncedInstant();
    private String source;
    private Media media;

    public TrainMedia(String source) {
        this.source = source;
        this.media = new Media(this.source);
        this.media.setDoPickup(true);
        this.media.setMediaId(this.mediaId.toString());
        this.media.setLoop(false);
    }

    public Media toMedia() {
        return media;
    }

}
