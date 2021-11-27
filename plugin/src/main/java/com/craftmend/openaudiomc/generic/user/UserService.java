package com.craftmend.openaudiomc.generic.user;

import com.craftmend.openaudiomc.generic.service.Servicable;

import java.util.UUID;

public interface UserService extends Servicable {

    User byUuid(UUID uuid);

}
