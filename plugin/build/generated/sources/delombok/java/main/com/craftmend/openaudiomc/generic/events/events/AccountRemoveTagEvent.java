package com.craftmend.openaudiomc.generic.events.events;

import com.craftmend.openaudiomc.api.events.BaseEvent;
import com.craftmend.openaudiomc.generic.oac.enums.CraftmendTag;

public class AccountRemoveTagEvent extends BaseEvent {
    private CraftmendTag addedTag;

    public CraftmendTag getAddedTag() {
        return this.addedTag;
    }

    public void setAddedTag(final CraftmendTag addedTag) {
        this.addedTag = addedTag;
    }

    @Override
    public String toString() {
        return "AccountRemoveTagEvent(addedTag=" + this.getAddedTag() + ")";
    }

    @Override
    public boolean equals(final Object o) {
        if (o == this) return true;
        if (!(o instanceof AccountRemoveTagEvent)) return false;
        final AccountRemoveTagEvent other = (AccountRemoveTagEvent) o;
        if (!other.canEqual((Object) this)) return false;
        final Object this$addedTag = this.getAddedTag();
        final Object other$addedTag = other.getAddedTag();
        if (this$addedTag == null ? other$addedTag != null : !this$addedTag.equals(other$addedTag)) return false;
        return true;
    }

    protected boolean canEqual(final Object other) {
        return other instanceof AccountRemoveTagEvent;
    }

    @Override
    public int hashCode() {
        final int PRIME = 59;
        int result = 1;
        final Object $addedTag = this.getAddedTag();
        result = result * PRIME + ($addedTag == null ? 43 : $addedTag.hashCode());
        return result;
    }

    public AccountRemoveTagEvent(final CraftmendTag addedTag) {
        this.addedTag = addedTag;
    }
}
