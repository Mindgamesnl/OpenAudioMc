package com.craftmend.openaudiomc.generic.state.collectors;

import com.craftmend.openaudiomc.OpenAudioMc;
import com.craftmend.openaudiomc.generic.oac.OpenaudioAccountService;
import com.craftmend.openaudiomc.generic.oac.enums.CraftmendTag;
import com.craftmend.openaudiomc.generic.platform.Platform;
import com.craftmend.openaudiomc.generic.state.interfaces.StateDetail;

public class AccountTagDetail implements StateDetail {
    @Override
    public String title() {
        return "Account Tags";
    }

    @Override
    public String value() {
        String tags = "";
        for (CraftmendTag tag : OpenAudioMc.getService(OpenaudioAccountService.class).getTags()) {
            tags += " " + tag.name() + ",";
        }

        return Platform.makeColor("AQUA") + "" + tags;
    }
}
