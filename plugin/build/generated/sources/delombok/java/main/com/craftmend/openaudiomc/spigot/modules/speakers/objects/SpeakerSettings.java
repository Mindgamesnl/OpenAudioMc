package com.craftmend.openaudiomc.spigot.modules.speakers.objects;

public class SpeakerSettings {
    private String source;
    private int radius;

    public String getSource() {
        return this.source;
    }

    public int getRadius() {
        return this.radius;
    }

    public void setSource(final String source) {
        this.source = source;
    }

    public void setRadius(final int radius) {
        this.radius = radius;
    }

    @Override
    public boolean equals(final Object o) {
        if (o == this) return true;
        if (!(o instanceof SpeakerSettings)) return false;
        final SpeakerSettings other = (SpeakerSettings) o;
        if (!other.canEqual((Object) this)) return false;
        if (this.getRadius() != other.getRadius()) return false;
        final Object this$source = this.getSource();
        final Object other$source = other.getSource();
        if (this$source == null ? other$source != null : !this$source.equals(other$source)) return false;
        return true;
    }

    protected boolean canEqual(final Object other) {
        return other instanceof SpeakerSettings;
    }

    @Override
    public int hashCode() {
        final int PRIME = 59;
        int result = 1;
        result = result * PRIME + this.getRadius();
        final Object $source = this.getSource();
        result = result * PRIME + ($source == null ? 43 : $source.hashCode());
        return result;
    }

    @Override
    public String toString() {
        return "SpeakerSettings(source=" + this.getSource() + ", radius=" + this.getRadius() + ")";
    }

    public SpeakerSettings(final String source, final int radius) {
        this.source = source;
        this.radius = radius;
    }
}
