package com.craftmend.openaudiomc.generic.migrations.interfaces;

public interface SimpleMigration {

    boolean shouldBeRun();
    void execute();

}
