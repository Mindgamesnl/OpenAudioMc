package net.openaudiomc.utils;

import net.openaudiomc.syncedsound.objects.SyncedSound;

public interface Callback<T> {

    SyncedSound execute(String string);
}
