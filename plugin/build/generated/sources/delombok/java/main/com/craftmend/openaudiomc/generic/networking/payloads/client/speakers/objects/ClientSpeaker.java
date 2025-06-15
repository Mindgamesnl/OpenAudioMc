package com.craftmend.openaudiomc.generic.networking.payloads.client.speakers.objects;

import com.craftmend.openaudiomc.api.speakers.SpeakerType;
import com.craftmend.openaudiomc.spigot.services.world.Vector3;
import java.io.Serializable;

public class ClientSpeaker implements Serializable {
    private Vector3 location;
    private SpeakerType type;
    private String id;
    private String source;
    private int maxDistance;
    private long startInstant;
    private int obstructions;
    private boolean doLoop = true;
    private boolean doPickup = true;
    private boolean cancelRegions = false;

    public Vector3 getLocation() {
        return this.location;
    }

    public SpeakerType getType() {
        return this.type;
    }

    public String getId() {
        return this.id;
    }

    public String getSource() {
        return this.source;
    }

    public int getMaxDistance() {
        return this.maxDistance;
    }

    public long getStartInstant() {
        return this.startInstant;
    }

    public int getObstructions() {
        return this.obstructions;
    }

    public boolean isDoLoop() {
        return this.doLoop;
    }

    public boolean isDoPickup() {
        return this.doPickup;
    }

    public boolean isCancelRegions() {
        return this.cancelRegions;
    }

    public void setLocation(final Vector3 location) {
        this.location = location;
    }

    public void setType(final SpeakerType type) {
        this.type = type;
    }

    public void setId(final String id) {
        this.id = id;
    }

    public void setSource(final String source) {
        this.source = source;
    }

    public void setMaxDistance(final int maxDistance) {
        this.maxDistance = maxDistance;
    }

    public void setStartInstant(final long startInstant) {
        this.startInstant = startInstant;
    }

    public void setObstructions(final int obstructions) {
        this.obstructions = obstructions;
    }

    public void setDoLoop(final boolean doLoop) {
        this.doLoop = doLoop;
    }

    public void setDoPickup(final boolean doPickup) {
        this.doPickup = doPickup;
    }

    public void setCancelRegions(final boolean cancelRegions) {
        this.cancelRegions = cancelRegions;
    }

    @Override
    public boolean equals(final Object o) {
        if (o == this) return true;
        if (!(o instanceof ClientSpeaker)) return false;
        final ClientSpeaker other = (ClientSpeaker) o;
        if (!other.canEqual((Object) this)) return false;
        if (this.getMaxDistance() != other.getMaxDistance()) return false;
        if (this.getStartInstant() != other.getStartInstant()) return false;
        if (this.getObstructions() != other.getObstructions()) return false;
        if (this.isDoLoop() != other.isDoLoop()) return false;
        if (this.isDoPickup() != other.isDoPickup()) return false;
        if (this.isCancelRegions() != other.isCancelRegions()) return false;
        final Object this$location = this.getLocation();
        final Object other$location = other.getLocation();
        if (this$location == null ? other$location != null : !this$location.equals(other$location)) return false;
        final Object this$type = this.getType();
        final Object other$type = other.getType();
        if (this$type == null ? other$type != null : !this$type.equals(other$type)) return false;
        final Object this$id = this.getId();
        final Object other$id = other.getId();
        if (this$id == null ? other$id != null : !this$id.equals(other$id)) return false;
        final Object this$source = this.getSource();
        final Object other$source = other.getSource();
        if (this$source == null ? other$source != null : !this$source.equals(other$source)) return false;
        return true;
    }

    protected boolean canEqual(final Object other) {
        return other instanceof ClientSpeaker;
    }

    @Override
    public int hashCode() {
        final int PRIME = 59;
        int result = 1;
        result = result * PRIME + this.getMaxDistance();
        final long $startInstant = this.getStartInstant();
        result = result * PRIME + (int) ($startInstant >>> 32 ^ $startInstant);
        result = result * PRIME + this.getObstructions();
        result = result * PRIME + (this.isDoLoop() ? 79 : 97);
        result = result * PRIME + (this.isDoPickup() ? 79 : 97);
        result = result * PRIME + (this.isCancelRegions() ? 79 : 97);
        final Object $location = this.getLocation();
        result = result * PRIME + ($location == null ? 43 : $location.hashCode());
        final Object $type = this.getType();
        result = result * PRIME + ($type == null ? 43 : $type.hashCode());
        final Object $id = this.getId();
        result = result * PRIME + ($id == null ? 43 : $id.hashCode());
        final Object $source = this.getSource();
        result = result * PRIME + ($source == null ? 43 : $source.hashCode());
        return result;
    }

    @Override
    public String toString() {
        return "ClientSpeaker(location=" + this.getLocation() + ", type=" + this.getType() + ", id=" + this.getId() + ", source=" + this.getSource() + ", maxDistance=" + this.getMaxDistance() + ", startInstant=" + this.getStartInstant() + ", obstructions=" + this.getObstructions() + ", doLoop=" + this.isDoLoop() + ", doPickup=" + this.isDoPickup() + ", cancelRegions=" + this.isCancelRegions() + ")";
    }

    public ClientSpeaker(final Vector3 location, final SpeakerType type, final String id, final String source, final int maxDistance, final long startInstant, final int obstructions, final boolean doLoop, final boolean doPickup, final boolean cancelRegions) {
        this.location = location;
        this.type = type;
        this.id = id;
        this.source = source;
        this.maxDistance = maxDistance;
        this.startInstant = startInstant;
        this.obstructions = obstructions;
        this.doLoop = doLoop;
        this.doPickup = doPickup;
        this.cancelRegions = cancelRegions;
    }
}
