package com.craftmend.openaudiomc.api.speakers;

import com.craftmend.openaudiomc.api.media.Media;
import org.jetbrains.annotations.NotNull;

import java.util.Set;
import java.util.UUID;

/**
 * Represents a basic speaker placed in the world
 * Obtainable through {@link com.craftmend.openaudiomc.api.WorldApi the world api}
 */
public interface BasicSpeaker {

    /**
     * Get the location of the speaker
     * @return location
     */
    @NotNull
    Loc getLocation();

    /**
     * Get the media that's being played by this speaker
     * @return media
     */
    @NotNull
    Media getMedia();

    /**
     * Get the speaker id
     * @return id
     */
    @NotNull
    UUID getSpeakerId();

    /**
     * Get the type of speaker (spatial audio, or static)
     * @return speaker type
     */
    SpeakerType getSpeakerType();

    /**
     * Get extra options for the speaker
     * @return options
     */
    @NotNull
    Set<ExtraSpeakerOptions> getExtraOptions();

    /**
     * Get the radius of the speaker
     * @return radius
     */
    @NotNull
    Integer getRadius();

    /**
     * If this speaker is currently directly powered by redstone
     * @return is powered
     */
    boolean isRedstonePowered();

}
