package com.craftmend.openaudiomc.api.interfaces;

import com.craftmend.openaudiomc.api.impl.event.enums.EventSupport;

import java.lang.annotation.ElementType;
import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;
import java.lang.annotation.Target;

@Target({ElementType.TYPE})
@Retention(RetentionPolicy.RUNTIME)
@Deprecated
public @interface EventSupportFlag {
    EventSupport support() default EventSupport.EVERYWHERE;
}

