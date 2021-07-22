package com.craftmend.service;

import com.craftmend.openaudiomc.generic.service.Inject;
import com.craftmend.openaudiomc.generic.service.Service;

public class SecondTestService extends Service {

    @Inject
    public TestInterface testInterface;

    @Override
    public void onEnable() {
        System.out.println("Enabling the second service");
    }

}
