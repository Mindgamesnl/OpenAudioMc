package com.craftmend.openaudiomc.spigot.modules.shortner.data;

import com.craftmend.openaudiomc.generic.database.internal.DataStore;
import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class Alias extends DataStore {

    private String name;
    private String target;

}
