package com.craftmend.openaudiomc.spigot.modules.show.interfaces;

public abstract class ShowRunnable implements Runnable {

    public ShowRunnable() {}

    abstract public void prepare(String serialize);
    abstract public String serialize();

}
