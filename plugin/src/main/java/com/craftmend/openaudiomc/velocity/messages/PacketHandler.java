package com.craftmend.openaudiomc.velocity.messages;

import java.lang.annotation.ElementType;
import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;
import java.lang.annotation.Target;

/**
 * Created by iKeirNez on 14/12/13, ported to velocity and modified by fluse1367 on 11/2020.
 */
@Retention(RetentionPolicy.RUNTIME)
@Target(value = ElementType.METHOD)
public @interface PacketHandler {
}
