package com.craftmend.tests;

import com.craftmend.openaudiomc.OpenAudioMcBuild;
import com.craftmend.openaudiomc.api.impl.event.ApiEventDriver;
import com.craftmend.openaudiomc.api.impl.event.AudioEvent;
import com.craftmend.openaudiomc.api.impl.event.enums.EventSupport;
import com.craftmend.openaudiomc.api.impl.event.events.ClientConnectEvent;
import com.craftmend.openaudiomc.api.interfaces.EventSupportFlag;
import lombok.SneakyThrows;
import org.junit.Assert;
import org.junit.Test;

import java.util.concurrent.atomic.AtomicBoolean;

public class EventListenerTest {

    @SneakyThrows
    @Test
    public void testEvents() {
        OpenAudioMcBuild.IS_TESTING = true;
        AtomicBoolean goodTriggered = new AtomicBoolean(false);
        AtomicBoolean badTriggered = new AtomicBoolean(false);

        ApiEventDriver eventDriver = new ApiEventDriver();

        eventDriver.on(TestEvent.class)
                .setHandler((e) -> {
                    goodTriggered.set(true);
                });

        eventDriver.on(ClientConnectEvent.class)
                .setHandler(b -> {
                    badTriggered.set(true);
                });

        eventDriver.fire(new TestEvent());

        Assert.assertTrue(goodTriggered.get());
        Assert.assertFalse(badTriggered.get());
    }

    @EventSupportFlag(support = EventSupport.EVERYWHERE)
    public static class TestEvent extends AudioEvent {
        // no data
    }

}
