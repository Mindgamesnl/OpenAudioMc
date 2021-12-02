package com.craftmend.service;

public interface TestInterface {

    default void ba() {
        System.out.println("Running interface thing");
    }

}
