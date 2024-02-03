package com.craftmend.openaudiomc.api.spakers;

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

    PLAY_ONCE(
            true,
            "Play Once",
            "Only place once and from the start when the player enters the area",
            speaker -> true
    ),

    REQUIRES_REDSTONE(
            true,
            "Requires Redstone",
            "Only plays when powered by redstone",
            speaker -> true
    ),

    RESET_PLAYTHROUGH_ON_REDSTONE_LOSS(
            true,
            "Reset Playthrough on Redstone Loss",
            "When the speaker loses redstone power, it will reset the playthrough",
            speaker -> true
    ),

    OVERWRITE_REGIONS(
            true,
            "Overwrite Regions",
            "Temporarily mute regions that are playing audio",
            speaker -> true
    )
    ;

    @Getter private boolean display;
    @Getter private String title;
    @Getter private String description;
    private Predicate<BasicSpeaker>[] predicates;

    ExtraSpeakerOptions(boolean display, String title, String description, Predicate<BasicSpeaker>... requirementChecks) {
        this.display = display;
        this.title = title;
        this.description = description;
        this.predicates = requirementChecks;
    }

    public boolean isCompatibleWith(BasicSpeaker speaker) {
        return Arrays.stream(this.predicates).allMatch(predicate -> predicate.test(speaker));
    }

    public boolean isEnabledFor(BasicSpeaker speaker) {
        return speaker.getExtraOptions().contains(this) && isCompatibleWith(speaker);
    }

}