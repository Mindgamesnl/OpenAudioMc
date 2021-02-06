package com.craftmend.openaudiomc.generic.craftmend.interfaces;

import com.craftmend.openaudiomc.generic.craftmend.enums.CraftmendTag;

public interface TagUpdateListener {

    void onAdd(CraftmendTag tag);
    void onRemove(CraftmendTag tag);

}
