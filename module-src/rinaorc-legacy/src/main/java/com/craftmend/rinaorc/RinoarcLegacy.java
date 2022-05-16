package com.craftmend.rinaorc;

import com.craftmend.openaudiomc.api.enums.ModuleEvent;
import com.craftmend.openaudiomc.api.interfaces.ExternalModule;
import org.bukkit.event.Listener;

public final class RinoarcLegacy extends ExternalModule implements Listener {

    public RinoarcLegacy() {

    }

    @Override
    public String getName() {
        return "Rinaorc legacy injector";
    }

    @Override
    public String getDescription() {
        return "This module implements legacy 1.8 api's, adding support for older parent servers.";
    }

    @Override
    public void onInitialize() {

    }

    @Override
    public void on(ModuleEvent event) {

    }

}
