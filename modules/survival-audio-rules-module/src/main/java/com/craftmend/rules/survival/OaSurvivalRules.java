package com.craftmend.rules.survival;

import com.craftmend.openaudiomc.OpenAudioMc;
import com.craftmend.openaudiomc.api.enums.ModuleEvent;
import com.craftmend.openaudiomc.api.interfaces.ExternalModule;
import com.craftmend.openaudiomc.spigot.modules.rules.MediaRuleService;

public class OaSurvivalRules extends ExternalModule {

    @Override
    public String getName() {
        return "Survival Rules";
    }

    @Override
    public String getDescription() {
        return "Survival friendly audio rules";
    }

    @Override
    public void onInitialize() {

    }

    @Override
    public void on(ModuleEvent event) {
        if (event != ModuleEvent.PLATFORM_LOADED) return;
    }
}
