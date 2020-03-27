package com.craftmend.openaudiomc.generic.flags;

import com.craftmend.openaudiomc.generic.flags.enums.Flag;
import lombok.NoArgsConstructor;

import java.util.ArrayList;
import java.util.List;

@NoArgsConstructor
public class FlagSet {

    private List<Flag> flags = new ArrayList<>();

    public void addFlag(String tag) {
        Flag flag = Flag.getByBackendTag(tag);
        if (flag == null) throw new IllegalArgumentException("Unknown tag: " + tag + ". Update the plugin.");
        flags.add(flag);
    }

    public boolean hasFlag(Flag flag) {
        return flags.contains(flag);
    }

}
