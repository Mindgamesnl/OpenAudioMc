package com.craftmend.tests;

import com.craftmend.openaudiomc.api.impl.event.ApiEventDriver;
import com.craftmend.openaudiomc.api.impl.event.enums.EventSupport;
import com.craftmend.openaudiomc.generic.platform.Platform;
import com.craftmend.utils.ClassScanner;
import lombok.SneakyThrows;

import org.junit.Assert;
import org.junit.Test;

public class EventHandlerTest {

    // test if all events within the events package have public constructors
    // and valid values for supported platforms
    @SneakyThrows
    @Test
    public void testEvents() {
        Class[] events = ClassScanner.getClasses("com.craftmend.openaudiomc.api.impl.event.events", null);

        Assert.assertTrue("There must be one or more events, but I found", events.length != 0);

        ApiEventDriver eventDriver = new ApiEventDriver();

        for (Class event : events) {
            System.out.println("Parsing " + event.getSimpleName());
            EventSupport support = eventDriver.getEventSupportFor(event);
            Assert.assertNotEquals(EventSupport.UNKNOWN.toString(), support.toString());
        }
    }

    @SneakyThrows
    @Test
    public void testEventTypes() {
        ApiEventDriver eventDriver = new ApiEventDriver();

        // spigot only test
        Assert.assertTrue(eventDriver.isSupported(EventSupport.SPIGOT_ONLY, Platform.SPIGOT, false));
        Assert.assertFalse(eventDriver.isSupported(EventSupport.SPIGOT_ONLY, Platform.BUNGEE, false));

        // only prox if avi
        Assert.assertFalse(eventDriver.isSupported(EventSupport.ONLY_PROXY_IF_AVAILABLE, Platform.SPIGOT, true));
        Assert.assertTrue(eventDriver.isSupported(EventSupport.ONLY_PROXY_IF_AVAILABLE, Platform.SPIGOT, false));

        // only prox
        Assert.assertTrue(eventDriver.isSupported(EventSupport.PROXY_ONLY, Platform.BUNGEE, false));
        Assert.assertFalse(eventDriver.isSupported(EventSupport.PROXY_ONLY, Platform.SPIGOT, false));
    }

}
