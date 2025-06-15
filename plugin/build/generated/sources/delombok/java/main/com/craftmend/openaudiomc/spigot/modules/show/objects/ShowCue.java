package com.craftmend.openaudiomc.spigot.modules.show.objects;

import com.craftmend.openaudiomc.spigot.modules.show.interfaces.ShowRunnable;
import java.util.UUID;

public class ShowCue {
    private UUID id;
    private Long timestamp;
    private ShowRunnable task;

    public UUID getId() {
        return this.id;
    }

    public Long getTimestamp() {
        return this.timestamp;
    }

    public ShowRunnable getTask() {
        return this.task;
    }

    public void setId(final UUID id) {
        this.id = id;
    }

    public void setTimestamp(final Long timestamp) {
        this.timestamp = timestamp;
    }

    public void setTask(final ShowRunnable task) {
        this.task = task;
    }

    @Override
    public boolean equals(final Object o) {
        if (o == this) return true;
        if (!(o instanceof ShowCue)) return false;
        final ShowCue other = (ShowCue) o;
        if (!other.canEqual((Object) this)) return false;
        final Object this$timestamp = this.getTimestamp();
        final Object other$timestamp = other.getTimestamp();
        if (this$timestamp == null ? other$timestamp != null : !this$timestamp.equals(other$timestamp)) return false;
        final Object this$id = this.getId();
        final Object other$id = other.getId();
        if (this$id == null ? other$id != null : !this$id.equals(other$id)) return false;
        final Object this$task = this.getTask();
        final Object other$task = other.getTask();
        if (this$task == null ? other$task != null : !this$task.equals(other$task)) return false;
        return true;
    }

    protected boolean canEqual(final Object other) {
        return other instanceof ShowCue;
    }

    @Override
    public int hashCode() {
        final int PRIME = 59;
        int result = 1;
        final Object $timestamp = this.getTimestamp();
        result = result * PRIME + ($timestamp == null ? 43 : $timestamp.hashCode());
        final Object $id = this.getId();
        result = result * PRIME + ($id == null ? 43 : $id.hashCode());
        final Object $task = this.getTask();
        result = result * PRIME + ($task == null ? 43 : $task.hashCode());
        return result;
    }

    @Override
    public String toString() {
        return "ShowCue(id=" + this.getId() + ", timestamp=" + this.getTimestamp() + ", task=" + this.getTask() + ")";
    }

    public ShowCue() {
    }

    public ShowCue(final UUID id, final Long timestamp, final ShowRunnable task) {
        this.id = id;
        this.timestamp = timestamp;
        this.task = task;
    }
}
