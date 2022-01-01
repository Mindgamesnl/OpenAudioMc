package com.craftmend.tests;

import com.craftmend.openaudiomc.generic.environment.MagicValue;
import lombok.SneakyThrows;
import org.junit.Assert;
import org.junit.Test;

public class TestMagicValue {

    @SneakyThrows
    @Test
    public void testStuff() {
        Assert.assertTrue(MagicValue.LOCATION_TRACK_INTERVAL.get(Integer.class) == 2);
    }
}
