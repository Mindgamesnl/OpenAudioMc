package com.craftmend.openaudiomc.api.interfaces;

import com.craftmend.openaudiomc.api.enums.ModuleEvent;
import com.craftmend.openaudiomc.generic.logging.OpenAudioLogger;
import lombok.Getter;
import lombok.Setter;

@Deprecated
public abstract class ExternalModule {

    @Getter @Setter private ClassLoader loader;

    public abstract String getName();
    public abstract String getDescription();
    public abstract void onInitialize();
    public abstract void on(ModuleEvent event);

    protected void log(String message) {
        OpenAudioLogger.info("[module-" + getName() + "] " + message);
    }

}
