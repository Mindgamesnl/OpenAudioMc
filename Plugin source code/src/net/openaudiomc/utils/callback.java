package net.openaudiomc.utils;

import net.openaudiomc.objects.syncedSound;

public interface callback {
	public interface Callback<T>
	{
	    public syncedSound execute(String string);
	}
}
