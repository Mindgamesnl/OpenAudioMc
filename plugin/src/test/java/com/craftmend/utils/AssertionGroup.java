package com.craftmend.utils;

import org.junit.Assert;

import java.util.ArrayList;
import java.util.List;

public class AssertionGroup {

    private List<FutureAssertion> tests = new ArrayList<>();

    public void run(FutureAssertion test) {
        tests.add(test);
    }

    public void runAll() {
        for (FutureAssertion test : tests) {
            Assert.assertTrue(test.getAbout(), test.getTest().test(null));
        }
        tests.clear();
    }

}
