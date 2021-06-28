package com.craftmend.tests;

import com.craftmend.openaudiomc.generic.utils.data.GsonFactory;
import com.craftmend.utils.ClassScanner;
import com.google.gson.Gson;
import lombok.SneakyThrows;
import org.junit.Assert;
import org.junit.Test;

import java.lang.reflect.Field;

public class SerializerTest {

    @SneakyThrows
    @Test
    public void testEvents() {
        Thread.setDefaultUncaughtExceptionHandler(null);
        Class[] oaClasses = ClassScanner.getClasses("com.craftmend.openaudiomc.generic", new String[]{"Packet", "Payload"});

        Gson gson = GsonFactory.create();

        for (Class oaClass : oaClasses) {
            if (oaClass.getName().contains("enum") || oaClass.getName().contains("abstracts")) continue;
            System.out.println("Testing serializable component " + oaClass.getName());

            Object result = gson.fromJson("{}", oaClass);
            Assert.assertNotNull("The packet can't be null", result);

            for (Field field : oaClass.getFields()) {
                field.setAccessible(true);
                Assert.assertNull("The field should be empty", field.get(result));
            }
        }
    }


}
