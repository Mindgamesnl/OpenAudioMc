package com.craftmend.openaudiomc.spigot.modules.speakers.enums;

import com.craftmend.openaudiomc.spigot.modules.speakers.objects.Speaker;
import lombok.Getter;

import java.util.Arrays;
import java.util.function.Predicate;

public enum ExtraSpeakerOptions {

    IGNORE_SYNCHRONIZATION(
            "Ignore Synchronization",
            "Disables audio syncronization for this speaker specifically",
            speaker -> true
    ),


    PROCESS_OBSTRUCTIONS(
            "Process Obstructions",
            "Muffles sound based on how many walls / obstructions it has (only for 3D speakers)",
            speaker -> speaker.getSpeakerType() == SpeakerType.SPEAKER_3D
    ),
    ;

    @Getter private String title;
    @Getter private String description;
    private Predicate<Speaker>[] predicates;

    ExtraSpeakerOptions(String title, String description, Predicate<Speaker>... requirementChecks) {
        this.title = title;
        this.description = description;
        this.predicates = requirementChecks;
    }

    public boolean isAllowedFor(Speaker speaker) {
        return Arrays.stream(this.predicates).allMatch(predicate -> predicate.test(speaker));
    }

    public boolean isEnabledFor(Speaker speaker) {
        return speaker.getExtraOptions().contains(this) && isAllowedFor(speaker);
    }

}
