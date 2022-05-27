package com.craftmend.rinaorc;

import com.craftmend.openaudiomc.OpenAudioMc;
import com.craftmend.openaudiomc.api.enums.ModuleEvent;
import com.craftmend.openaudiomc.api.interfaces.ExternalModule;
import com.craftmend.openaudiomc.generic.proxy.interfaces.UserHooks;
import com.craftmend.rinaorc.implementation.LegacySpigotUserHooks;
import org.bukkit.event.Listener;

public final class RinoarcLegacy extends ExternalModule implements Listener {

    public RinoarcLegacy() {
        OpenAudioMc.getInstance().getServiceManager().registerDependency(UserHooks.class, new LegacySpigotUserHooks());
    }

    @Override
    public String getName() {
        return "Rinaorc-legacy";
    }

    @Override
    public String getDescription() {
        return "This module implements legacy 1.8 api's, adding support for older parent servers.";
    }

    @Override
    public void onInitialize() {
        log("Injecting legacy spigot modules");
    }

    @Override
    public void on(ModuleEvent event) {
    }

}
