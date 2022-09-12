package com.craftmend.openaudiomc.modules.require;

import com.craftmend.openaudiomc.api.enums.ModuleEvent;
import com.craftmend.openaudiomc.api.interfaces.ExternalModule;
import org.bukkit.event.Listener;

public final class RequireModule extends ExternalModule implements Listener {

    private boolean isVoicechatActive = false;

    @Override
    public String getName() {
        return "RequireModule";
    }

    @Override
    public String getDescription() {
        return "Require end-users to use OpenAudioMc";
    }

    @Override
    public void onInitialize() {

    }

    @Override
    public void on(ModuleEvent event) {

    }
}
