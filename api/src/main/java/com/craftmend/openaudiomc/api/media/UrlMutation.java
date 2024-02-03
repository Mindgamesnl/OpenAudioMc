package com.craftmend.openaudiomc.api.media;

import org.jetbrains.annotations.NotNull;

public interface UrlMutation {

    /*
     * URL mutations can be used to register custom server-side media hooks or source translators.
     * An example use case would be a custom media server aliased by hypixel:, which can be resolved
     * to https://hypixel.com/media/* by a mutation.
     */

    /**
     * Translate a custom source to a full media URL.
     *
     * @param original The original source as given in the createMedia method or any command
     * @return the URL that should be used for playback
     */
    @NotNull
    String onRequest(@NotNull String original);

}
