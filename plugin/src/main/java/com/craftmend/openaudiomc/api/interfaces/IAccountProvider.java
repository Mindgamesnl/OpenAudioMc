package com.craftmend.openaudiomc.api.interfaces;

import com.craftmend.openaudiomc.generic.authentication.AuthenticationService;
import com.craftmend.openaudiomc.generic.platform.interfaces.TaskService;

public interface IAccountProvider {

    void inject(TaskService ts, AuthenticationService as);

}
