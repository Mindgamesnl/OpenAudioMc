package com.craftmend.openaudiomc.api.impl.event.events.enums;

/**
 * This enum represents the cause of a specific event, used to provide more context
 * or filter based on functionality.
 *
 * Example: the {@link com.craftmend.openaudiomc.api.impl.event.events.PlayerEnterVoiceProximityEvent} can be called for a few reasons,
 * like walking up to some one or shouting from a distance; and you may not want to execute the same behaviour
 * for both scenarios
 */
public enum VoiceEventCause {

    // voice state changed under normal circumstances
    NORMAL,
    // voice change was due to shouting
    SHOUT

}
