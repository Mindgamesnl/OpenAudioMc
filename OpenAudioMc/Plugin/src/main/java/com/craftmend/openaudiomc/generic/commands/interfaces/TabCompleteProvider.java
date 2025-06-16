package com.craftmend.openaudiomc.generic.commands.interfaces;

import com.craftmend.openaudiomc.api.user.User;

@FunctionalInterface
public interface TabCompleteProvider {

    String[] getOptions(User sender);

}
