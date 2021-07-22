package com.craftmend.service;

import com.craftmend.openaudiomc.generic.service.Inject;
import com.craftmend.openaudiomc.generic.service.Service;

public class FirstTestService extends Service {

    @Inject
    public SecondTestService secondTestService;

    @Override
    public void onEnable() {
        System.out.println("Enabling the first service");
    }
}
