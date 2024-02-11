package com.craftmend.openaudiomc.api.speakers;

import lombok.Getter;

import java.util.Arrays;
import java.util.function.Predicate;

/**
 * Represents extra options for a speaker
 */
public enum ExtraSpeakerOptions {

    /**
     * This option will ignore audio synchronization for this speaker specifically
     */
    IGNORE_SYNCHRONIZATION(
            true,
            "Ignore Synchronization",
            "Disables audio syncronization for this speaker specifically",
            speaker -> true
    ),


    @Deprecated
    /**
     * This setting is no longer exposed or shown, but still exists for backwards compatibility
     */
    PROCESS_OBSTRUCTIONS(
            false,
            "Process Obstructions",
            "Muffles sound based on how many walls / obstructions it has",
            speaker -> speaker.getSpeakerType() == SpeakerType.SPEAKER_3D
    ),

    /**
     * This setting will make the speaker play once, and then never again until the player leaves the area and re-enters
     */
    PLAY_ONCE(
            true,
            "Play Once",
            "Only place once and from the start when the player enters the area",
            speaker -> true
    ),

    /**
     * This setting will only make the speaker active/discoverable when its directly powered by redstone
     */
    REQUIRES_REDSTONE(
            true,
            "Requires Redstone",
            "Only plays when powered by redstone",
            speaker -> true
    ),

    /**
     * This setting will make the media timestamp reset once it loses redstone power
     */
    RESET_PLAYTHROUGH_ON_REDSTONE_LOSS(
            true,
            "Reset Playthrough on Redstone Loss",
            "When the speaker loses redstone power, it will reset the playthrough",
            speaker -> true
    ),

    /**
     * This setting will mute all the regions for the player as long as they are in range of this speaker
     */
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
