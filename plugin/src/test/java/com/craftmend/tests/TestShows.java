package com.craftmend.tests;

import com.craftmend.openaudiomc.OpenAudioMc;
import com.craftmend.openaudiomc.generic.client.ClientDataService;
import com.craftmend.openaudiomc.generic.client.enums.DataStoreVersion;
import com.craftmend.openaudiomc.generic.client.store.ClientDataStore;
import com.craftmend.openaudiomc.spigot.modules.show.interfaces.ShowRunnable;
import com.craftmend.openaudiomc.spigot.modules.show.objects.Show;
import com.craftmend.openaudiomc.spigot.modules.show.util.TimeParser;
import com.craftmend.tests.helpers.TestHelper;
import com.craftmend.utils.Waiter;
import lombok.SneakyThrows;
import org.bukkit.World;
import org.junit.Assert;
import org.junit.BeforeClass;
import org.junit.Test;

import java.time.Duration;
import java.time.Instant;
import java.util.UUID;

public class TestShows extends TestHelper {

    @SneakyThrows
    @BeforeClass
    public static void doYourOneTimeSetup() {
        prepTests(true);
    }

    @Test
    public void testShows() {
        Show show = new Show("test-show-" + UUID.randomUUID().toString());

        CallbackRunnable a = new CallbackRunnable();
        CallbackRunnable b = new CallbackRunnable();
        CallbackRunnable c = new CallbackRunnable();
        CallbackRunnable d = new CallbackRunnable();

        show.addCue(a, TimeParser.toMilis("1s"));
        show.addCue(b, TimeParser.toMilis("2s"));
        show.addCue(c, TimeParser.toMilis("3s"));
        show.addCue(d, TimeParser.toMilis("4s"));

        show.start();

        // wait 5 sec
        Waiter.waitSeconds(4);

        Assert.assertTrue(secondsSince(a) < 4.1);
        Assert.assertTrue(secondsSince(b) < 3.1);
        Assert.assertTrue(secondsSince(c) < 2.1);
        Assert.assertTrue(secondsSince(d) < 1.1);
    }

    public double secondsSince(CallbackRunnable s) {
        return (double) (Duration.between(s.lastRun, Instant.now()).toMillis() / 1000);
    }

    class CallbackRunnable extends ShowRunnable {

        public CallbackRunnable() {
            super();
        }

        public Instant lastRun = null;

        @Override
        public void prepare(String serialize, World world) {

        }

        @Override
        public String serialize() {
            return "{}";
        }

        @Override
        public void run() {
            lastRun = Instant.now();
        }
    }

}
