package com.craftmend.openaudiomc.generic.media.objects;

public class MediaUpdate {
    private int distance = 100;
    private int maxDistance = 100;
    private int fadeTime = 0;
    private int volume = 0;
    private boolean reApplyVolume = false;
    private String target = "";

    public int getDistance() {
        return this.distance;
    }

    public int getMaxDistance() {
        return this.maxDistance;
    }

    public int getFadeTime() {
        return this.fadeTime;
    }

    public int getVolume() {
        return this.volume;
    }

    public boolean isReApplyVolume() {
        return this.reApplyVolume;
    }

    public String getTarget() {
        return this.target;
    }

    public void setDistance(final int distance) {
        this.distance = distance;
    }

    public void setMaxDistance(final int maxDistance) {
        this.maxDistance = maxDistance;
    }

    public void setFadeTime(final int fadeTime) {
        this.fadeTime = fadeTime;
    }

    public void setVolume(final int volume) {
        this.volume = volume;
    }

    public void setReApplyVolume(final boolean reApplyVolume) {
        this.reApplyVolume = reApplyVolume;
    }

    public void setTarget(final String target) {
        this.target = target;
    }

    @Override
    public boolean equals(final Object o) {
        if (o == this) return true;
        if (!(o instanceof MediaUpdate)) return false;
        final MediaUpdate other = (MediaUpdate) o;
        if (!other.canEqual((Object) this)) return false;
        if (this.getDistance() != other.getDistance()) return false;
        if (this.getMaxDistance() != other.getMaxDistance()) return false;
        if (this.getFadeTime() != other.getFadeTime()) return false;
        if (this.getVolume() != other.getVolume()) return false;
        if (this.isReApplyVolume() != other.isReApplyVolume()) return false;
        final Object this$target = this.getTarget();
        final Object other$target = other.getTarget();
        if (this$target == null ? other$target != null : !this$target.equals(other$target)) return false;
        return true;
    }

    protected boolean canEqual(final Object other) {
        return other instanceof MediaUpdate;
    }

    @Override
    public int hashCode() {
        final int PRIME = 59;
        int result = 1;
        result = result * PRIME + this.getDistance();
        result = result * PRIME + this.getMaxDistance();
        result = result * PRIME + this.getFadeTime();
        result = result * PRIME + this.getVolume();
        result = result * PRIME + (this.isReApplyVolume() ? 79 : 97);
        final Object $target = this.getTarget();
        result = result * PRIME + ($target == null ? 43 : $target.hashCode());
        return result;
    }

    @Override
    public String toString() {
        return "MediaUpdate(distance=" + this.getDistance() + ", maxDistance=" + this.getMaxDistance() + ", fadeTime=" + this.getFadeTime() + ", volume=" + this.getVolume() + ", reApplyVolume=" + this.isReApplyVolume() + ", target=" + this.getTarget() + ")";
    }

    public MediaUpdate() {
    }

    public MediaUpdate(final int distance, final int maxDistance, final int fadeTime, final int volume, final boolean reApplyVolume, final String target) {
        this.distance = distance;
        this.maxDistance = maxDistance;
        this.fadeTime = fadeTime;
        this.volume = volume;
        this.reApplyVolume = reApplyVolume;
        this.target = target;
    }
}
