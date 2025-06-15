/**
 * This package contains our internal event system, which is used to listen to events that are fired by the OpenAudioMc
 * Events provided by OA should be listened to through this system, not bukkit/spigot's event system because OA's events
 * are cross-platform and can be fired from the web interface as well.
 */
package com.craftmend.openaudiomc.api.events;