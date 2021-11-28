package com.craftmend.openaudiomc.spigot.modules.shortner.data;

import com.craftmend.openaudiomc.generic.database.internal.StoredData;
import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class Alias extends StoredData {

    private String name;
    private String target;

}
