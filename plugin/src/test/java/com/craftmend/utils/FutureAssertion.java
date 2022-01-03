package com.craftmend.utils;

import lombok.AllArgsConstructor;
import lombok.Getter;

import java.util.function.Predicate;

@Getter
@AllArgsConstructor
public class FutureAssertion {

    private String about;
    private Predicate<Void> test;

}
