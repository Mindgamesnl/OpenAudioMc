package com.craftmend.openaudiomc.api.voice;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.jetbrains.annotations.Nullable;

@Data
@NoArgsConstructor
@AllArgsConstructor

/**
 * Voice chat options are special flags set for each peer, giving the client extra information on how the connection
 * should be treated and rendered. The initial state is defined by the default values in this class, and get passed during
 * the connection request packet sent towards the client. These settings can also be changed on the fly, by pushing them
 * in a separate client options update packet without needing the session to reload.
 */
public class VoicePeerOptions implements Cloneable {

    /**
     * Singleton default. Means we don't have to create a new object every time we want to use the default.
     */
    public static final VoicePeerOptions DEFAULT = new VoicePeerOptions();

    /**
     * Weather or not the peer should be visible in the web UI.
     * The client will still setup a voice stream to the peer if set to false, but completely
     * hide the person's name/uuid from the web UI.
     * This can be used for example to hide an opponent in a game, while still letting them hear each other.
     */
    private boolean visible = true;

    /**
     * This flag decides if the stream should be rendered as a spatial stream. This also requires the client to receive
     * location updates every few ticks. Setting it to false just renders it as a normal mono stream (think discord/teamspeak).
     * The icon next to someone's name also gets controlled by this flag.
     */
    private boolean spatialAudio = true;

    /**
     * An optional display override, which can be used to change the display name and skin of a player in the voice chat system.
     * This can be left null if no override is needed.
     * @since 6.10.2
     */
    @Nullable
    private DisplayOverride displayOverride;

    /**
     * Clone the object
     * @return a clone of the object
     */
    @Override
    public VoicePeerOptions clone() {
        return new VoicePeerOptions(visible, spatialAudio, null);
    }

}
