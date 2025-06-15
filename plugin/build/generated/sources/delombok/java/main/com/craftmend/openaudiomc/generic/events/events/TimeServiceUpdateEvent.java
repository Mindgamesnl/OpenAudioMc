package com.craftmend.openaudiomc.generic.events.events;

import com.craftmend.openaudiomc.api.events.BaseEvent;
import com.craftmend.openaudiomc.generic.media.time.TimeService;

public class TimeServiceUpdateEvent extends BaseEvent {
    private TimeService timeService;

    public TimeService getTimeService() {
        return this.timeService;
    }

    public void setTimeService(final TimeService timeService) {
        this.timeService = timeService;
    }

    @Override
    public String toString() {
        return "TimeServiceUpdateEvent(timeService=" + this.getTimeService() + ")";
    }

    @Override
    public boolean equals(final Object o) {
        if (o == this) return true;
        if (!(o instanceof TimeServiceUpdateEvent)) return false;
        final TimeServiceUpdateEvent other = (TimeServiceUpdateEvent) o;
        if (!other.canEqual((Object) this)) return false;
        final Object this$timeService = this.getTimeService();
        final Object other$timeService = other.getTimeService();
        if (this$timeService == null ? other$timeService != null : !this$timeService.equals(other$timeService)) return false;
        return true;
    }

    protected boolean canEqual(final Object other) {
        return other instanceof TimeServiceUpdateEvent;
    }

    @Override
    public int hashCode() {
        final int PRIME = 59;
        int result = 1;
        final Object $timeService = this.getTimeService();
        result = result * PRIME + ($timeService == null ? 43 : $timeService.hashCode());
        return result;
    }

    public TimeServiceUpdateEvent(final TimeService timeService) {
        this.timeService = timeService;
    }
}
