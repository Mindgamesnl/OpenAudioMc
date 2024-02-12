package com.craftmend.openaudiomc.generic.commands.interfaces;

import com.craftmend.openaudiomc.generic.user.User;

public interface TabCompleteProvider {

    String[] getOptions(User sender);

}
