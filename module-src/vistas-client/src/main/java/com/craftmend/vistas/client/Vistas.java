package com.craftmend.vistas.client;

import com.craftmend.openaudiomc.api.enums.ModuleEvent;
import com.craftmend.openaudiomc.api.interfaces.ExternalModule;
import org.bukkit.event.Listener;

public final class Vistas extends ExternalModule implements Listener {

    public Vistas() {

    }

    @Override
    public String getName() {
        return "Vistas-Client";
    }

    @Override
    public String getDescription() {
        return "A vista client implementation.";
    }

    @Override
    public void onInitialize() {
        log("Injecting Vista networking modules");
    }

    @Override
    public void on(ModuleEvent event) {

    }

}
