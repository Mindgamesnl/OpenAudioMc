package com.craftmend.service;

import com.craftmend.openaudiomc.generic.service.Inject;
import com.craftmend.openaudiomc.generic.service.Service;

public class ConstructorInjectionTest extends Service {

    public FirstTestService firstTestService;
    public SecondTestService secondTestService;
    public TestInterface testInterface;

    @Inject
    public ConstructorInjectionTest(
            FirstTestService firstTestService,
            SecondTestService secondTestService,
            TestInterface testInterface) {

        this.firstTestService = firstTestService;
        this.secondTestService = secondTestService;
        this.testInterface = testInterface;
    }

}
