package com.craftmend.service;

public interface TestInterface {

    public default void ba() {
        System.out.println("Running interface thing");
    }

}
