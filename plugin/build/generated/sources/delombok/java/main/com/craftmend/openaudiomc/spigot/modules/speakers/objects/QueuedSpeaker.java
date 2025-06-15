package com.craftmend.openaudiomc.spigot.modules.speakers.objects;

public class QueuedSpeaker {
    private String worldName;
    private String speakerId;

    public String getWorldName() {
        return this.worldName;
    }

    public String getSpeakerId() {
        return this.speakerId;
    }

    public void setWorldName(final String worldName) {
        this.worldName = worldName;
    }

    public void setSpeakerId(final String speakerId) {
        this.speakerId = speakerId;
    }

    @Override
    public boolean equals(final Object o) {
        if (o == this) return true;
        if (!(o instanceof QueuedSpeaker)) return false;
        final QueuedSpeaker other = (QueuedSpeaker) o;
        if (!other.canEqual((Object) this)) return false;
        final Object this$worldName = this.getWorldName();
        final Object other$worldName = other.getWorldName();
        if (this$worldName == null ? other$worldName != null : !this$worldName.equals(other$worldName)) return false;
        final Object this$speakerId = this.getSpeakerId();
        final Object other$speakerId = other.getSpeakerId();
        if (this$speakerId == null ? other$speakerId != null : !this$speakerId.equals(other$speakerId)) return false;
        return true;
    }

    protected boolean canEqual(final Object other) {
        return other instanceof QueuedSpeaker;
    }

    @Override
    public int hashCode() {
        final int PRIME = 59;
        int result = 1;
        final Object $worldName = this.getWorldName();
        result = result * PRIME + ($worldName == null ? 43 : $worldName.hashCode());
        final Object $speakerId = this.getSpeakerId();
        result = result * PRIME + ($speakerId == null ? 43 : $speakerId.hashCode());
        return result;
    }

    @Override
    public String toString() {
        return "QueuedSpeaker(worldName=" + this.getWorldName() + ", speakerId=" + this.getSpeakerId() + ")";
    }

    public QueuedSpeaker(final String worldName, final String speakerId) {
        this.worldName = worldName;
        this.speakerId = speakerId;
    }
}
