package com.craftmend.openaudiomc.spigot.modules.speakers.enums;

import com.craftmend.openaudiomc.spigot.modules.speakers.objects.Speaker;
import lombok.Getter;

import java.util.Arrays;
import java.util.function.Predicate;

public enum ExtraSpeakerOptions {

    IGNORE_SYNCHRONIZATION(
            true,
            "Ignore Synchronization",
            "Disables audio syncronization for this speaker specifically",
            speaker -> true
    ),


    PROCESS_OBSTRUCTIONS(
            false,
            "Process Obstructions",
            "Muffles sound based on how many walls / obstructions it has",
            speaker -> speaker.getSpeakerType() == SpeakerType.SPEAKER_3D
    ),
    ;

    @Getter private final boolean display;
    @Getter private final String title;
    @Getter private final String description;
    private final Predicate<Speaker>[] predicates;

    ExtraSpeakerOptions(boolean display, String title, String description, Predicate<Speaker>... requirementChecks) {
        this.display = display;
        this.title = title;
        this.description = description;
        this.predicates = requirementChecks;
    }

    public boolean isCompatibleWith(Speaker speaker) {
        return Arrays.stream(this.predicates).allMatch(predicate -> predicate.test(speaker));
    }

    public boolean isEnabledFor(Speaker speaker) {
        return speaker.getExtraOptions().contains(this) && isCompatibleWith(speaker);
    }

}
