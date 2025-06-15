package com.craftmend.openaudiomc.spigot.modules.traincarts.models;

import com.craftmend.openaudiomc.OpenAudioMc;
import com.craftmend.openaudiomc.api.media.Media;
import com.craftmend.openaudiomc.generic.media.time.TimeService;
import com.craftmend.openaudiomc.generic.storage.enums.StorageKey;
import java.time.Instant;

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

    public Instant getStartedAt() {
        return this.startedAt;
    }

    public String getSource() {
        return this.source;
    }

    public Media getMedia() {
        return this.media;
    }

    public void setStartedAt(final Instant startedAt) {
        this.startedAt = startedAt;
    }

    public void setSource(final String source) {
        this.source = source;
    }

    public void setMedia(final Media media) {
        this.media = media;
    }

    @Override
    public boolean equals(final Object o) {
        if (o == this) return true;
        if (!(o instanceof TrainMedia)) return false;
        final TrainMedia other = (TrainMedia) o;
        if (!other.canEqual((Object) this)) return false;
        final Object this$startedAt = this.getStartedAt();
        final Object other$startedAt = other.getStartedAt();
        if (this$startedAt == null ? other$startedAt != null : !this$startedAt.equals(other$startedAt)) return false;
        final Object this$source = this.getSource();
        final Object other$source = other.getSource();
        if (this$source == null ? other$source != null : !this$source.equals(other$source)) return false;
        final Object this$media = this.getMedia();
        final Object other$media = other.getMedia();
        if (this$media == null ? other$media != null : !this$media.equals(other$media)) return false;
        return true;
    }

    protected boolean canEqual(final Object other) {
        return other instanceof TrainMedia;
    }

    @Override
    public int hashCode() {
        final int PRIME = 59;
        int result = 1;
        final Object $startedAt = this.getStartedAt();
        result = result * PRIME + ($startedAt == null ? 43 : $startedAt.hashCode());
        final Object $source = this.getSource();
        result = result * PRIME + ($source == null ? 43 : $source.hashCode());
        final Object $media = this.getMedia();
        result = result * PRIME + ($media == null ? 43 : $media.hashCode());
        return result;
    }

    @Override
    public String toString() {
        return "TrainMedia(startedAt=" + this.getStartedAt() + ", source=" + this.getSource() + ", media=" + this.getMedia() + ")";
    }
}
