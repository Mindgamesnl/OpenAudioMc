package com.craftmend.openaudiomc.generic.utils.attempts;

import lombok.Getter;
import lombok.Setter;

public abstract class Attempt<T> {

    @Getter @Setter private boolean handled = false;

    public abstract void onSuccess(T result);
    public abstract void onFail();

}
