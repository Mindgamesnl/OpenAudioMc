package com.craftmend.openaudiomc.spigot.modules.show.interfaces;

import lombok.Getter;
import lombok.Setter;
import org.bukkit.World;

public abstract class ShowRunnable implements Runnable {

    public ShowRunnable() {}

    abstract public void prepare(String serialize, World world);
    abstract public String serialize();
    @Setter @Getter private boolean executedFromRedis = false;

}
