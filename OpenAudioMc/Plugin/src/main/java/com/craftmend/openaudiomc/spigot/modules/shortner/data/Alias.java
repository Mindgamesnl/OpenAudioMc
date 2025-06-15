package com.craftmend.openaudiomc.spigot.modules.shortner.data;

import com.craftmend.openaudiomc.generic.database.internal.DataStore;
import com.craftmend.storm.api.markers.Column;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
@AllArgsConstructor
public class Alias extends DataStore {

    @Column
    private String name;
    @Column private String target;

}
