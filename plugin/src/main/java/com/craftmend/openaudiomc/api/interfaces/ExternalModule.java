package com.craftmend.openaudiomc.api.interfaces;

import com.craftmend.openaudiomc.api.enums.ModuleEvent;

public abstract class ExternalModule {

    public abstract String getName();
    public abstract String getDescription();
    public abstract void onInitialize();
    public abstract void on(ModuleEvent event);

}
