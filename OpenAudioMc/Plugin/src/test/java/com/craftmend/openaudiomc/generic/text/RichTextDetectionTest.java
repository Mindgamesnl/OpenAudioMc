package com.craftmend.openaudiomc.generic.text;

import org.junit.Test;
import org.junit.runner.RunWith;
import org.junit.runners.Parameterized;

import java.util.Arrays;
import java.util.Collection;

import static org.junit.Assert.assertEquals;

@RunWith(Parameterized.class)
public class RichTextDetectionTest {

    @Parameterized.Parameters(name = "{1} <- {0}")
    public static Collection<Object[]> cases() {
        return Arrays.asList(new Object[][]{
                {"&6Minecraft will prompt you when you click this message", false},
                {"&3[&bVoice Channel&3] &7You joined", false},
                {"plain text without any markup", false},
                {"", false},
                {"i <3 openaudiomc", false},
                {"a < b > c", false},
                {"5 <= 10 and 10 >= 5", false},
                {"<red>Hello", true},
                {"<gradient:#ff0000:#00ff00>Hello</gradient>", true},
                {"mixed &acodes and <bold>tags", true},
                {"<click:open_url:'https://openaudiomc.net'>click me</click>", true},
                {"</red>", true},
        });
    }

    @Parameterized.Parameter
    public String input;

    @Parameterized.Parameter(1)
    public boolean expected;

    @Test
    public void detectsRichText() {
        assertEquals(expected, RichText.isRich(input));
    }

}
