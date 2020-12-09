package com.craftmend.openaudiomc.spigot.modules.speakers.enums;

import com.craftmend.openaudiomc.spigot.modules.speakers.objects.Speaker;

public enum  ExtraSpeakerOptions {

    PROCESS_OBSTRUCTIONS;

    public boolean matches(Speaker speaker) {
        // no extra logic other than checking if the option is enabled
        // TODO: add logic that only 3d speakers can have obstruction processing
        return speaker.getExtraOptions().contains(this);
    }

}
