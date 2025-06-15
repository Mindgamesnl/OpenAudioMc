package com.craftmend.openaudiomc.api.interfaces;

import com.craftmend.openaudiomc.api.enums.ModuleEvent;
import com.craftmend.openaudiomc.generic.logging.OpenAudioLogger;

@Deprecated
public abstract class ExternalModule {
    private ClassLoader loader;

    public abstract String getName();

    public abstract String getDescription();

    public abstract void onInitialize();

    public abstract void on(ModuleEvent event);

    protected void log(String message) {
        OpenAudioLogger.info("[module-" + getName() + "] " + message);
    }

    public ClassLoader getLoader() {
        return this.loader;
    }

    public void setLoader(final ClassLoader loader) {
        this.loader = loader;
    }
}
