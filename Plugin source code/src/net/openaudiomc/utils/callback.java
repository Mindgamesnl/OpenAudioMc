package net.openaudiomc.utils;

import net.openaudiomc.syncedSound.objects.syncedSound;

public interface callback {
	public interface Callback<T>
	{
	    public syncedSound execute(String string);
	}
	public interface Callbackmultiple<T>
	{
	    public void execute(String string);
	}
}
