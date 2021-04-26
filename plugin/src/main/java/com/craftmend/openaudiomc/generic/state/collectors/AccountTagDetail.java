package com.craftmend.openaudiomc.generic.state.collectors;

import com.craftmend.openaudiomc.OpenAudioMc;
import com.craftmend.openaudiomc.generic.craftmend.enums.CraftmendTag;
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
        for (CraftmendTag tag : OpenAudioMc.getInstance().getCraftmendService().getTags()) {
            tags += " " + tag.name() + ",";
        }

        return Platform.makeColor("AQUA") + "" + tags;
    }
}
