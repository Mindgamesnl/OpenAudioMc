package com.craftmend.openaudiomc.generic.plus.object;

import com.craftmend.openaudiomc.generic.plus.enums.PlusAccessLevel;
import lombok.NoArgsConstructor;

import java.util.ArrayList;
import java.util.List;

@NoArgsConstructor
public class FlagSet {

    private List<PlusAccessLevel.Flag> flags = new ArrayList<>();

    public void addFlag(String tag) {
        PlusAccessLevel.Flag flag = PlusAccessLevel.Flag.getByBackendTag(tag);
        if (flag == null) throw new IllegalArgumentException("Unknown tag: " + tag + ". Update the plugin.");
        flags.add(flag);
    }

    public boolean hasFlag(PlusAccessLevel.Flag flag) {
        return flags.contains(flag);
    }

}
