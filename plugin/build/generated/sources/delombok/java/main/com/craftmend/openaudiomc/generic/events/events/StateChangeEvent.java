package com.craftmend.openaudiomc.generic.events.events;

import com.craftmend.openaudiomc.api.events.BaseEvent;
import com.craftmend.openaudiomc.generic.state.interfaces.State;

public class StateChangeEvent extends BaseEvent {
    private State oldState;
    private State newState;

    public State getOldState() {
        return this.oldState;
    }

    public State getNewState() {
        return this.newState;
    }

    public void setOldState(final State oldState) {
        this.oldState = oldState;
    }

    public void setNewState(final State newState) {
        this.newState = newState;
    }

    @Override
    public String toString() {
        return "StateChangeEvent(oldState=" + this.getOldState() + ", newState=" + this.getNewState() + ")";
    }

    @Override
    public boolean equals(final Object o) {
        if (o == this) return true;
        if (!(o instanceof StateChangeEvent)) return false;
        final StateChangeEvent other = (StateChangeEvent) o;
        if (!other.canEqual((Object) this)) return false;
        final Object this$oldState = this.getOldState();
        final Object other$oldState = other.getOldState();
        if (this$oldState == null ? other$oldState != null : !this$oldState.equals(other$oldState)) return false;
        final Object this$newState = this.getNewState();
        final Object other$newState = other.getNewState();
        if (this$newState == null ? other$newState != null : !this$newState.equals(other$newState)) return false;
        return true;
    }

    protected boolean canEqual(final Object other) {
        return other instanceof StateChangeEvent;
    }

    @Override
    public int hashCode() {
        final int PRIME = 59;
        int result = 1;
        final Object $oldState = this.getOldState();
        result = result * PRIME + ($oldState == null ? 43 : $oldState.hashCode());
        final Object $newState = this.getNewState();
        result = result * PRIME + ($newState == null ? 43 : $newState.hashCode());
        return result;
    }

    public StateChangeEvent(final State oldState, final State newState) {
        this.oldState = oldState;
        this.newState = newState;
    }
}
