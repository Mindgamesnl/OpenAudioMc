package com.craftmend.openaudiomc.generic.text;

import net.kyori.adventure.text.serializer.legacy.LegacyComponentSerializer;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.junit.runners.Parameterized;

import java.util.Arrays;
import java.util.Collection;

import static org.junit.Assert.assertEquals;

@RunWith(Parameterized.class)
public class RichTextRenderingTest {

    @Parameterized.Parameters(name = "{0}")
    public static Collection<Object[]> cases() {
        return Arrays.asList(new Object[][]{
                {"<red>Hello", "§cHello"},
                {"<green>Hi <bold>there", "§aHi §lthere"},
                {"&amixed <bold>markup", "§amixed §lmarkup"},
                // hex has to survive as the nearest legacy color for pre 1.16 clients
                {"<#ff5555>hex", "§chex"},
                // unknown tags stay literal instead of blowing up the message
                {"<of> players", "<of> players"},
        });
    }

    @Parameterized.Parameter
    public String input;

    @Parameterized.Parameter(1)
    public String expected;

    @Test
    public void rendersToLegacyText() {
        assertEquals(expected, LegacyComponentSerializer.legacySection().serialize(RichText.parse(input)));
    }

}
