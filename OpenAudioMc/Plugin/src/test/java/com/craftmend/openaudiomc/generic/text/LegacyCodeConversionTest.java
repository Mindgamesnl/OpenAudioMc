package com.craftmend.openaudiomc.generic.text;

import org.junit.Test;
import org.junit.runner.RunWith;
import org.junit.runners.Parameterized;

import java.util.Arrays;
import java.util.Collection;

import static org.junit.Assert.assertEquals;

@RunWith(Parameterized.class)
public class LegacyCodeConversionTest {

    @Parameterized.Parameters(name = "{0}")
    public static Collection<Object[]> cases() {
        return Arrays.asList(new Object[][]{
                {"&aHello", "<green>Hello"},
                {"§cRed", "<red>Red"},
                {"&lBold &oitalic", "<bold>Bold <italic>italic"},
                {"&rReset", "<reset>Reset"},
                {"&Auppercase", "<green>uppercase"},
                {"&amixed with <bold>tags", "<green>mixed with <bold>tags"},
                {"no codes at all", "no codes at all"},
                {"&", "&"},
                {"&z is not a code", "&z is not a code"},
                {"100% &6safe", "100% <gold>safe"},
        });
    }

    @Parameterized.Parameter
    public String input;

    @Parameterized.Parameter(1)
    public String expected;

    @Test
    public void convertsLegacyCodesToTags() {
        assertEquals(expected, RichText.legacyCodesToTags(input));
    }

}
