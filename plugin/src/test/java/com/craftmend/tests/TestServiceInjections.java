package com.craftmend.tests;

import com.craftmend.openaudiomc.generic.service.Service;
import com.craftmend.openaudiomc.generic.service.ServiceManager;
import com.craftmend.service.FirstTestService;
import com.craftmend.service.TestIntImpl;
import com.craftmend.service.TestInterface;
import com.craftmend.utils.ClassScanner;
import lombok.SneakyThrows;
import org.junit.Assert;
import org.junit.Test;

import java.lang.reflect.Constructor;

public class TestServiceInjections {

    @SneakyThrows
    @Test
    public void testStuff() {
        ServiceManager serviceManager = new ServiceManager();
        serviceManager.registerDependency(TestInterface.class, new TestIntImpl());
        serviceManager.loadService(FirstTestService.class);
        Assert.assertNotNull(serviceManager.getService(FirstTestService.class));
        Assert.assertNotNull(serviceManager.getService(FirstTestService.class).secondTestService);
        Assert.assertNotNull(serviceManager.getService(FirstTestService.class).secondTestService.testInterface);
        serviceManager.getService(FirstTestService.class).secondTestService.testInterface.ba();
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
