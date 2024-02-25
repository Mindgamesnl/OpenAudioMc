package com.craftmend.openaudiomc.api.events;

import java.lang.annotation.ElementType;
import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;
import java.lang.annotation.Target;

@Retention(RetentionPolicy.RUNTIME)
@Target(ElementType.METHOD)
/**
 * This is a marker annotation for event handlers, for bukkit-style listeners
 * See {@link com.craftmend.openaudiomc.api.EventApi} for more information
 */
public @interface Handler {

}
