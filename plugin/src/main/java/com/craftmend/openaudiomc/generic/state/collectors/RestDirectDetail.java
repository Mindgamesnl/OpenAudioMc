package com.craftmend.openaudiomc.generic.state.collectors;

import com.craftmend.openaudiomc.OpenAudioMc;
import com.craftmend.openaudiomc.generic.platform.OaColor;
import com.craftmend.openaudiomc.generic.rd.RestDirect;
import com.craftmend.openaudiomc.generic.state.interfaces.StateDetail;

public class RestDirectDetail implements StateDetail {
    @Override
    public String title() {
        return "RestDirect";
    }

    @Override
    public String value() {
        if (OpenAudioMc.getService(RestDirect.class).isRunning()) {
            return OaColor.GREEN + "ONLINE!";
        } else {
            return OaColor.RED + "NOT COMPATIBLE!";
        }
    }
}
