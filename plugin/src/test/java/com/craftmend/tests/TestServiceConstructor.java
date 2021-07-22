package com.craftmend.tests;

import com.craftmend.openaudiomc.api.impl.event.ApiEventDriver;
import com.craftmend.openaudiomc.api.impl.event.enums.EventSupport;
import com.craftmend.openaudiomc.generic.platform.Platform;
import com.craftmend.openaudiomc.generic.service.Service;
import com.craftmend.utils.ClassScanner;
import lombok.SneakyThrows;
import org.junit.Assert;
import org.junit.Test;

import java.lang.reflect.Constructor;

public class TestServiceConstructor {

    // test if all events within the events package have public constructors
    // and valid values for supported platforms
    @SneakyThrows
    @Test
    public void testStuff() {
        Class[] events = ClassScanner.getClasses("com.craftmend.openaudiomc", null  );

        Assert.assertTrue("There must be one or more classes, but I found none", events.length != 0);

        for (Class potentialService : events) {
            if (Service.class.isAssignableFrom(potentialService)) {
                Assert.assertTrue("The class " + potentialService.getName() + " needs to have a no-args constructor.", hasParameterlessPublicConstructor(potentialService));
                System.out.println("Validated " + potentialService.getSimpleName());
            }
        }
    }

    private boolean hasParameterlessPublicConstructor(Class<?> clazz) {
        for (Constructor<?> constructor : clazz.getConstructors()) {
            if (constructor.getParameterCount() == 0) {
                return true;
            }
        }
        return false;
    }
}
